import { HIDDEN_FIELDS } from "./hidden-fields.js";
import { it, expect } from "vitest";
import { Game } from "../src/game.js";
import {
  Expectimax,
  RandomLegal,
  AlwaysStrike,
  PersonaController,
  judgmentPolicy,
} from "../src/agents/index.js";
it("all controllers return legal proposals from observations only", () => {
  for (const controller of [
    new Expectimax(),
    new Expectimax(1),
    new RandomLegal(4),
    new AlwaysStrike(),
    ...(["Aggressor", "Sentinel", "Opportunist", "Adapter"] as const).map(
      (p) => new PersonaController(p, 4),
    ),
  ]) {
    const g = new Game();
    g.step(0, "CONTINUE");
    for (let i = 0; i < 18 && g.state.phase === "DUEL"; i++) {
      const o = g.observe(0),
        l = g.legalActions(0),
        a = controller.choose(o, l);
      expect(l).toContain(a);
      g.step(1, g.legalActions(1)[i % g.legalActions(1).length]);
      g.step(0, a);
    }
  }
});
it("normative weights and exact posterior threshold", () => {
  expect(judgmentPolicy({ numerator: 1, denominator: 17 })).toBe("RELEASE");
  expect(judgmentPolicy({ numerator: 16, denominator: 17 })).toBe("DETAIN");
  expect(
    judgmentPolicy({ numerator: 16, denominator: 17 }, "weighted", {
      harm: 1,
      imprisonment: 1,
      promise: 2,
    }),
  ).toBe("RELEASE");
});
it("expectimax learns habits only from observations, resets per episode", () => {
  const a = new Expectimax(),
    b = new Expectimax();
  const g = new Game();
  g.step(0, "CONTINUE");
  for (let i = 0; i < 3; i++) {
    expect(a.choose(g.observe(0), g.legalActions(0))).toBe(
      b.choose(g.observe(0), g.legalActions(0)),
    );
    g.step(1, "STRIKE");
    g.step(0, "GUARD");
  }
  expect(a.belief.habits.STRIKE).toBeGreaterThan(a.belief.habits.BASH);
  expect(new Expectimax().belief.habits.STRIKE).toBe(1);
});

it("observed regression, superseded trigger: Adapter counters repeated resolved STRIKE while Aggressor persists", () => {
  let differences = 0;
  for (let seed = 0; seed < 100; seed++) {
    const a = new PersonaController("Adapter", seed),
      b = new PersonaController("Aggressor", seed),
      g = new Game();
    g.step(0, "CONTINUE");
    for (let exchange = 0; exchange < 3; exchange++) {
      g.state.exchange = exchange;
      g.state.hp = [12 - 3 * exchange, 12 - 3 * exchange];
      g.state.previous = exchange ? ["STRIKE", "STRIKE"] : null;
      const x = a.choose(g.observe(0), g.legalActions(0)),
        y = b.choose(g.observe(0), g.legalActions(0));
      if (exchange === 2 && x !== y) differences++;
    }
  }
  expect(differences).toBeGreaterThan(50);
});

it("Bayes weights observed habits by the current tell likelihood", async () => {
 const { actionPosterior } = await import("../src/agents/index.js");
 const p = actionPosterior({STRIKE:4,GUARD:1,BASH:1,RECOVER:1,SIDESTEP:1}, "raised_blade", ["STRIKE","GUARD","BASH","RECOVER"]);
 expect(p.STRIKE).toBeCloseTo(24/33);
 expect(p.GUARD).toBeCloseTo(2/33);
});
it("S1 and X1 preserve distinct ordered testimony with distinct public reliability", () => {
 const a=new Game(), b=new Game();
 a.reset(1,{evidence:"ambiguous"}); b.reset(1,{evidence:"conflicting"});
 expect(a.observe(0).testimony).toEqual(["accuse","accuse"]);
 expect(b.observe(0).testimony).toEqual(["clear","accuse"]);
});

it("baseline non-interference across hidden states and poison fields for the same observation history", () => {
 const a = new Expectimax(), b = new Expectimax();
 const g = new Game(); g.step(0, "CONTINUE");
 for (let i = 0; i < 5 && g.state.phase === "DUEL"; i++) {
  g.step(1, "GUARD");
  const clean = g.observe(0), legal = g.legalActions(0);
  g.state.persona = "Adapter";
  g.state.guilt = !g.state.guilt;
  g.state.rng.persona ^= 123;
  // Alter exact stamina within its public band and the unrevealed commitment.
  if (g.state.stamina[1] >= 2) g.state.stamina[1] = g.state.stamina[1] === 2 ? 3 : 2;
  g.state.pending[1] = "RECOVER";
  const poisoned = g.observe(0);
  expect(poisoned).toEqual(clean);
  for (const key of HIDDEN_FIELDS)
   Object.defineProperty(poisoned, key, { get() { throw new Error(`hidden read: ${key}`); } });
  const action = a.choose(clean, legal);
  expect(b.choose(poisoned, legal)).toBe(action);
  expect(b.belief).toEqual(a.belief);
  g.step(0, action);
 }
});
it("context counts label the resolved action with its saved pre-decision context, once per exchange", () => {
 const a = new Expectimax(); const g = new Game(); g.step(0, "CONTINUE");
 const inspect = a as unknown as { contexts: Map<string, Record<string, number>> };
 a.choose(g.observe(0), g.legalActions(0));
 g.step(1, "STRIKE"); g.step(0, "GUARD");
 a.choose(g.observe(0), g.legalActions(0));
 expect(inspect.contexts.get("start/ready/false")?.STRIKE).toBe(2);
 a.choose(g.observe(0), g.legalActions(0));
 expect(inspect.contexts.get("start/ready/false")?.STRIKE).toBe(2);
 expect(new Expectimax(3, "min-harm", false).contextual).toBe(false);
});

it("S2 regression: unseen contexts retain globally observed guard evidence without hypothetical learning",()=>{
 const a=new Expectimax(1);const g=new Game();g.reset(200);g.step(0,"CONTINUE");
 for(let i=0;i<4;i++){a.choose(g.observe(0),g.legalActions(0));g.step(1,"GUARD");g.step(0,"GUARD");}
 a.choose(g.observe(0),g.legalActions(0));
 const inspect=a as unknown as {prior(key:string):Record<string,number>};
 const unseen=inspect.prior("STRIKE/low/true");
 expect(unseen.GUARD/unseen.STRIKE).toBe(5);
 expect(a.belief.habits).toEqual({STRIKE:1,GUARD:5,BASH:1,RECOVER:1,SIDESTEP:1});
});
