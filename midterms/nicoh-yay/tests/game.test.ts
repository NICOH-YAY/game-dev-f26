import { describe, it, expect } from "vitest";
import { Game } from "../src/game.js";
import { ACTIONS, resolvePair, TELL_TABLE } from "../src/sim/rules.js";
import { stableHash, draw } from "../src/sim/random.js";
import { posterior } from "../src/sim/evidence.js";
const duel = () => {
  const g = new Game();
  g.reset(17);
  g.step(0, "CONTINUE");
  return g;
};
const pair = (g: Game, a: string, b: string) => {
  g.step(1, b);
  g.step(0, a);
};
describe("combat design", () => {
  it("all 16 payoffs, symmetry and integer resource bounds", () => {
    const expected = [
      [
        [3, 3],
        [1, 0],
        [0, 3],
        [0, 3],
      ],
      [
        [0, 1],
        [0, 0],
        [2, 0],
        [0, 0],
      ],
      [
        [3, 0],
        [0, 2],
        [2, 2],
        [0, 2],
      ],
      [
        [3, 0],
        [0, 0],
        [2, 0],
        [0, 0],
      ],
    ];
    ACTIONS.slice(0,4).forEach((a, i) =>
      ACTIONS.slice(0,4).forEach((b, j) => {
        const r = resolvePair([12, 12], [3, 3], a, b);
        expect(r.hp).toEqual(expected[i][j].map((x) => 12 - x));
        const rev = resolvePair([12, 12], [3, 3], b, a);
        expect(r.hp).toEqual([...rev.hp].reverse());
        expect(r.stamina).toEqual([...rev.stamina].reverse());
      }),
    );
    for (let seed = 0; seed < 200; seed++) {
      const g = duel();
      for (let i = 0; i < 18 && g.state.phase === "DUEL"; i++) {
        const l = g.legalActions(0),
          m = g.legalActions(1);
        pair(g, l[(seed + i) % l.length], m[(seed * 3 + i) % m.length]);
        for (const hp of g.state.hp) expect(hp).toBeGreaterThanOrEqual(0);
        for (const st of g.state.stamina) {
          expect(st).toBeGreaterThanOrEqual(0);
          expect(st).toBeLessThanOrEqual(3);
        }
      }
    }
  });
  it("phase legality, pending submissions and rejected requests are immutable", () => {
    const g = new Game();
    g.reset(1);
    for (const a of ["STRIKE", "RELEASE", null]) {
      const h = stableHash(g.state);
      expect(g.step(0, a).accepted).toBe(false);
      expect(stableHash(g.state)).toBe(h);
    }
    g.step(0, "CONTINUE");
    g.state.stamina[0] = 0;
    expect(g.legalActions(0)).toEqual(["GUARD", "RECOVER"]);
    const h = stableHash(g.state);
    expect(g.step(0, "STRIKE").accepted).toBe(false);
    expect(stableHash(g.state)).toBe(h);
    g.step(1, "GUARD");
    const pending = stableHash(g.state);
    expect(g.step(1, "GUARD").accepted).toBe(false);
    expect(stableHash(g.state)).toBe(pending);
  });
  it.each(["ko", "double_ko_draw", "time_up_win", "time_up_draw"])(
    "scripted %s",
    (reason) => {
      const g = duel();
      if (reason === "ko") {
        g.state.hp = [3, 12];
        pair(g, "RECOVER", "STRIKE");
      }
      if (reason === "double_ko_draw") {
        g.state.hp = [3, 3];
        pair(g, "STRIKE", "STRIKE");
      }
      if (reason.startsWith("time")) {
        if (reason === "time_up_win") g.state.hp = [12, 9];
        for (let i = 0; i < 18; i++) pair(g, "GUARD", "GUARD");
      }
      expect(g.state.phase).toBe("JUDGMENT");
      g.step(0, "RELEASE");
      expect(g.outcome().reason).toBe(reason);
      expect(g.outcome().status).toBe("terminal");
    },
  );
  it("binding vs counsel and all realized ledger fields", () => {
    for (const win of [true, false])
      for (const guilty of [true, false])
        for (const verdict of ["RELEASE", "DETAIN"]) {
          const g = duel();
          g.state.guilt = guilty;
          g.state.hp = win ? [12, 3] : [3, 12];
          pair(g, win ? "STRIKE" : "RECOVER", win ? "RECOVER" : "STRIKE");
          expect(g.observe(0)).not.toHaveProperty("ledger");
          g.step(0, verdict);
          const o = g.outcome();
          expect(o.judgment?.binding).toBe(win);
          expect(o.judgment?.counsel).toBe(win ? null : verdict);
          const detain = !win || verdict === "DETAIN";
          expect(o.ledger?.oath_safe_passage_broken).toBe(detain);
          expect(o.ledger?.innocent_imprisoned).toBe(detain && !guilty);
          expect(o.ledger?.harm_enabled).toBe(!detain && guilty);
          expect(o.ledger?.oath_protection_broken).toBe(!detain && guilty);
        }
  });
  it("hidden-field non-interference across 1000 generated states", () => {
    let r = 42;
    for (let i = 0; i < 1000; i++) {
      const g = duel();
      [r] = draw(r);
      g.state.stamina = [i % 4, 2 + (r % 2)];
      g.state.guilt = !!(r % 2);
      const before = JSON.stringify(g.observe(0)),
        legal = JSON.stringify(g.legalActions(0));
      g.state.guilt = !g.state.guilt;
      g.state.stamina[1] = 5 - g.state.stamina[1];
      g.state.pending[1] = ACTIONS[i % 4];
      g.state.persona = "Adapter";
      g.state.rng.testimony = r;
      g.state.rng.persona = r;
      expect(JSON.stringify(g.observe(0))).toBe(before);
      expect(JSON.stringify(g.legalActions(0))).toBe(legal);
      const h = new Game();
      h.state = structuredClone(g.state);
      h.state.stamina[0] = 0;
      const own = h.observe(1);
      h.state.guilt = !h.state.guilt;
      h.state.pending[0] = "BASH";
      h.state.rng.testimony ^= 123;
      expect(h.observe(1)).toEqual(own);
    }
  });
  it("coarse band changes are intentionally visible", () => {
    const g = duel();
    g.state.stamina[1] = 0;
    expect(g.observe(0).opponent_stamina_band).toBe("spent");
    g.state.stamina[1] = 1;
    expect(g.observe(0).opponent_stamina_band).toBe("low");
  });
  it("posterior uses exact independent likelihood products", () => {
    expect(posterior(["accuse", "clear"])).toEqual({
      numerator: 1,
      denominator: 2,
    });
    expect(posterior(["accuse", "accuse"])).toEqual({
      numerator: 16,
      denominator: 17,
    });
    expect(posterior(["clear", "clear"])).toEqual({
      numerator: 1,
      denominator: 17,
    });
    expect(
      Object.values(TELL_TABLE).every(
        (row) => row.reduce((a, b) => a + b, 0) === 100,
      ),
    ).toBe(true);
  });
  it("same seed and actions reproduce entire state and golden trace", () => {
    const run = () => {
      const g = new Game();
      g.reset(123);
      const hashes = [stableHash(g.state)];
      g.step(0, "CONTINUE");
      for (let i = 0; i < 18; i++) {
        pair(g, "GUARD", "GUARD");
        hashes.push(stableHash(g.state));
      }
      g.step(0, "DETAIN");
      return { hashes, final: stableHash(g.state) };
    };
    expect(run()).toEqual(run());
    expect(run()).toMatchSnapshot();
  });
});

it("property: hidden fields cannot affect either player at fixed public stamina band", () => {
  let rng = 7001;
  for (let i = 0; i < 1500; i++) {
    const g = new Game();
    g.reset(i);
    g.step(0, "CONTINUE");
    let n;
    [rng, n] = draw(rng);
    g.state.hp = [1 + (n % 12), 1 + ((n >>> 8) % 12)];
    g.state.stamina = [n % 4, (n >>> 5) % 4];
    g.state.exchange = n % 18;
    g.state.tells = ["raised_blade", "shifting_feet"];
    for (const p of [0, 1] as const) {
      const other = p === 0 ? 1 : 0,
        before = JSON.stringify(g.observe(p)),
        legal = JSON.stringify(g.legalActions(p)),
        copy = structuredClone(g.state);
      g.state.guilt = !g.state.guilt;
      g.state.stamina[other] =
        g.state.stamina[other] >= 2
          ? 5 - g.state.stamina[other]
          : g.state.stamina[other];
      g.state.pending[other] = ACTIONS[(n >>> 10) % 4];
      g.state.persona = g.state.persona === "Adapter" ? "Sentinel" : "Adapter";
      g.state.rng.persona ^= n;
      g.state.rng.testimony ^= n;
      expect(JSON.stringify(g.observe(p))).toBe(before);
      expect(JSON.stringify(g.legalActions(p))).toBe(legal);
      g.state = copy;
    }
  }
});
it("observation copies cannot mutate authoritative state; terminal actions rejected", () => {
  const g = new Game();
  const h = stableHash(g.state),
    o = g.observe(0);
  o.hp[0] = 0;
  o.testimony[0] = "clear";
  o.oaths.push("tamper");
  expect(stableHash(g.state)).toBe(h);
  g.terminate("error");
  const t = stableHash(g.state);
  expect(g.step(0, "DETAIN").accepted).toBe(false);
  expect(stableHash(g.state)).toBe(t);
  expect(g.outcome().reason).toBe("error");
});
