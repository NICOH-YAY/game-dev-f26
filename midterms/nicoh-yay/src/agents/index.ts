import type { Observation, Persona } from "../game.js";
import {
  ACTIONS,
  TELLS, TELL_TABLE,
  combatLegal,
  resolvePair,
  type CombatAction,
} from "../sim/rules.js";
import { draw, weightedIndex } from "../sim/random.js";
import { posterior, type Rational } from "../sim/evidence.js";
export interface Controller {
  choose(observation: Observation, legal: readonly string[]): string;
}
export type Weights = { harm: number; imprisonment: number; promise: number };
export function judgmentPolicy(
  p: Rational,
  policy: "min-harm" | "weighted" = "min-harm",
  w: Weights = { harm: 5, imprisonment: 1, promise: 1 },
): "RELEASE" | "DETAIN" {
  // min expected harm counts a guilty release and an innocent imprisonment equally.
  const release = p.numerator * (policy === "min-harm" ? 1 : w.harm),
    detain =
      (p.denominator - p.numerator) *
        (policy === "min-harm" ? 1 : w.imprisonment) +
      (policy === "min-harm" ? 0 : p.denominator * w.promise);
  return release <= detain ? "RELEASE" : "DETAIN";
}
function judgment(o: Observation) {
  return judgmentPolicy(posterior(o.testimony, o.testimony_reliability));
}
export class RandomLegal implements Controller {
  constructor(private rng = 0) {}
  choose(o: Observation, l: readonly string[]) {
    if (o.phase === "JUDGMENT") return judgment(o);
    let n;
    [this.rng, n] = draw(this.rng);
    return l[
      weightedIndex(
        n,
        l.map(() => 1),
      )
    ];
  }
}
export class AlwaysStrike implements Controller {
  choose(o: Observation, l: readonly string[]) {
    return o.phase === "JUDGMENT"
      ? judgment(o)
      : l.includes("STRIKE")
        ? "STRIKE"
        : l.includes("GUARD")
          ? "GUARD"
          : l[0];
  }
}
export class PersonaController implements Controller {
  private last = -1;
  private history: CombatAction[] = [];
  private parried = 0;
  constructor(readonly persona: Persona, private rng = 0) {}
  choose(o: Observation, l: readonly string[]) {
    // Deliberately read only resolved actions, public footing, own resources.
    if (o.phase !== "DUEL") return l[0];
    if (o.exchange !== this.last) {
      if (o.previous) {
        this.history.push(o.previous.opponent);
        this.history = this.history.slice(-6);
        if (o.previous.own === "STRIKE" && o.previous.opponent === "GUARD") this.parried++;
      }
      this.last = o.exchange;
    }
    let preferred: CombatAction = o.exchange % 2 === 0 ? "STRIKE" : "BASH";
    let probability = 7 / 11;
    if (this.persona === "Aggressor" && this.parried >= 2) preferred = "BASH";
    if (this.persona === "Sentinel") {
      preferred = "GUARD";
      probability = .55;
      if (this.history.slice(-3).filter(a => a === "STRIKE").length >= 2) probability = .75;
      // A resolved GUARD against STRIKE is a successful parry.
      if (o.previous?.own === "GUARD" && o.previous.opponent === "STRIKE") {
        preferred = o.exchange % 2 ? "STRIKE" : "BASH";
        probability = .70;
      }
      if (o.cornered[0]) { preferred = "SIDESTEP"; probability = .75; }
    }
    if (this.persona === "Opportunist") {
      preferred = o.own_stamina <= 1 ? "RECOVER" :
        o.previous?.opponent === "GUARD" || o.cornered[1] ? "BASH" : "STRIKE";
      if (o.own_stamina > 1 && !o.cornered[1] && o.previous?.opponent === "RECOVER") probability = .75;
    }
    if (this.persona === "Adapter" && this.history.length) {
      const counts = Object.fromEntries(ACTIONS.map(a => [a, this.history.filter(x => x === a).length])) as Record<CombatAction, number>;
      const mode = ACTIONS.reduce((best,a) => counts[a] > counts[best] ? a : best);
      const counters: Record<CombatAction, CombatAction> = {
        STRIKE: "GUARD", BASH: "STRIKE", GUARD: "BASH", RECOVER: "STRIKE", SIDESTEP: "GUARD",
      };
      preferred = counters[mode]; probability = .80;
    }
    if (!l.includes(preferred)) preferred = "GUARD";
    let n;
    [this.rng, n] = draw(this.rng);
    return l[weightedIndex(n, l.map(a => a === preferred ? Math.round(probability * 10000) * Math.max(1,l.length-1) : Math.round((1-probability)*10000)))];
  }
}
// Normalize the learned habit prior times the pending tell likelihood.
export function actionPosterior(habits: Record<CombatAction, number>, tell: string | null, legal: readonly CombatAction[]): Record<CombatAction, number> {
 const index = TELLS.indexOf(tell as typeof TELLS[number]);
 const weights = Object.fromEntries(ACTIONS.map(a => [a, legal.includes(a) ? habits[a] * (index < 0 ? 1 : TELL_TABLE[a][index]) : 0])) as Record<CombatAction, number>;
 const total = Object.values(weights).reduce((a,b)=>a+b,0);
 for (const a of ACTIONS) weights[a] /= total;
 return weights;
}
export class Expectimax implements Controller {
  belief: { stamina: number[]; habits: Record<CombatAction, number> } = {
    stamina: [3],
    habits: { STRIKE: 1, GUARD: 1, BASH: 1, RECOVER: 1, SIDESTEP: 1 },
  };
  private last = -1;
  // The saved pre-decision context labels the next revealed opponent action.
  private pendingContext: string | null = null;
  private contexts = new Map<string, Record<CombatAction, number>>();
  private context(previous: CombatAction | null, stamina: number, position: number) {
    return `${previous ?? "start"}/${stamina === 0 ? "spent" : stamina === 1 ? "low" : "ready"}/${position === 6}`;
  }
  private prior(key: string): Record<CombatAction, number> {
    if (!this.contextual) return this.belief.habits;
    // Pool global evidence into sparse contexts; add only local observations,
    // not their Laplace pseudocounts. Search reads this without training it.
    const local = this.contexts.get(key);
    return Object.fromEntries(ACTIONS.map(a => [a, this.belief.habits[a] + (local ? local[a] - 1 : 0)])) as Record<CombatAction, number>;
  }
  constructor(
    readonly depth = 3,
    readonly policy: "min-harm" | "weighted" = "min-harm",
    readonly contextual = true,
  ) {
    if (!Number.isInteger(depth) || depth < 1 || depth > 5)
      throw new Error("depth must be 1..5");
  }
  choose(o: Observation, l: readonly string[]): string {
    if (o.phase === "JUDGMENT")
      return judgmentPolicy(posterior(o.testimony, o.testimony_reliability), this.policy);
    if (o.phase !== "DUEL") return l[0];
    if (this.last !== o.exchange) {
      if (o.previous) {
        this.belief.habits[o.previous.opponent]++;
        if (this.pendingContext !== null && this.contextual) {
          const counts = this.contexts.get(this.pendingContext) ?? { STRIKE: 1, GUARD: 1, BASH: 1, RECOVER: 1, SIDESTEP: 1 };
          counts[o.previous.opponent]++;
          this.contexts.set(this.pendingContext, counts);
        }
      }
      const permitted =
        o.opponent_stamina_band === "spent"
          ? [0]
          : o.opponent_stamina_band === "low"
            ? [1]
            : [2, 3];
      this.belief.stamina = permitted;
      this.last = o.exchange;
      this.pendingContext = this.context(o.previous?.own ?? null, permitted[0], o.position);
    }
    // Fixed habit posterior during a search; update only on observed resolved actions.
    const cache = new Map<string, number>();
    const leaf = (h: number, k: number, s: number, t: number, remaining: number, position: number) =>
      h === 0 && k === 0
        ? 0
        : h === 0
          ? -100000
          : k === 0
            ? 100000
            : remaining === 0
              ? 100000 * Math.sign(h - k)
              : 100 * (h - k) + Math.min(remaining, 3) * 12 * (s - t) + 25 * (Number(position === 6) - Number(position === 0));
    const search = (
      h: number,
      k: number,
      s: number,
      t: number,
      position: number,
      d: number,
      remaining: number,
      previous: CombatAction,
    ): number => {
      if (!d || !remaining || !h || !k) return leaf(h, k, s, t, remaining, position);
      const key = [h, k, s, t, position, d, remaining, previous].join(",");
      const old = cache.get(key);
      if (old !== undefined) return old;
      let best = -Infinity;
      for (const a of combatLegal(s)) {
        let sum = 0,
          total = 0;
        for (const b of combatLegal(t)) {
          const w = this.prior(this.context(previous, t, position))[b],
            r = resolvePair([h, k], [s, t], a, b, position);
          sum += w * search(...r.hp, ...r.stamina, r.position, d - 1, remaining - 1, a);
          total += w;
        }
        best = Math.max(best, sum / total);
      }
      cache.set(key, best);
      return best;
    };
    let best = -Infinity,
      chosen = l[0];
    for (const action of l) {
      let score = 0;
      for (const st of this.belief.stamina) {
        let subtotal = 0,
          total = 0;
        const current = actionPosterior(this.prior(this.context(o.previous?.own ?? null, st, o.position)), o.tell, combatLegal(st));
        for (const b of combatLegal(st)) {
          const w = current[b],
            r = resolvePair(
              o.hp,
              [o.own_stamina, st],
              action as CombatAction,
              b,
              o.position,
            );
          subtotal +=
            w * search(...r.hp, ...r.stamina, r.position, this.depth - 1, 17 - o.exchange, action as CombatAction);
          total += w;
        }
        score += subtotal / total;
      }
      score /= this.belief.stamina.length;
      if (score > best) {
        best = score;
        chosen = action;
      }
    }
    return chosen;
  }
}

export class SimpleBot implements Controller {
 constructor(readonly mode:"always-bash"|"always-guard"|"always-recover"|"always-sidestep"|"strike-bash") {}
 choose(o:Observation,l:readonly string[]) {
  if(o.phase!=="DUEL") return o.phase==="JUDGMENT"?judgment(o):l[0];
  const a=this.mode==="always-recover"?"RECOVER":this.mode==="always-sidestep"?"SIDESTEP":this.mode==="always-guard"?"GUARD":this.mode==="always-bash"?"BASH":o.exchange%2?"BASH":"STRIKE";
  return l.includes(a)?a:"GUARD";
 }
}
