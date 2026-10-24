import {
  combatLegal,
  resolvePair,
  TELLS,
  TELL_TABLE,
  type CombatAction,
  type Pair,
} from "./sim/rules.js";
import { draw, streams, weightedIndex } from "./sim/random.js";
import {
  evidence,
  posterior,
  WITNESS_TABLE,
  type Card,
  type Evidence,
  type Rational,
} from "./sim/evidence.js";
export type Player = 0 | 1;
export type Phase = "HEARING" | "DUEL" | "JUDGMENT" | "EPILOGUE";
export type Persona = "Aggressor" | "Sentinel" | "Opportunist" | "Adapter";
export type Reason =
  | "ko"
  | "double_ko_draw"
  | "time_up_win"
  | "time_up_draw"
  | "invalid_forfeit"
  | "model_call_cap"
  | "error";
export type Scenario = {
  id?: string;
  testimonySeed?: number;
  evidence?: Evidence;
  playerHP?: number;
  persona?: Persona;
};
export type Verdict = "RELEASE" | "DETAIN" | "abstain";
export type Judgment = {
  choice: Verdict;
  binding: boolean;
  counsel: Verdict | null;
  verdict: "RELEASE" | "DETAIN";
};
export type Ledger = {
  oath_safe_passage_broken: boolean;
  oath_protection_broken: boolean;
  innocent_imprisoned: boolean;
  harm_enabled: boolean;
  p_guilt_at_judgment: Rational;
};
export type State = {
  seed: number;
  scenario: Scenario;
  phase: Phase;
  hp: Pair;
  stamina: Pair;
  position: number;
  exchange: number;
  cards: Card[];
  reliability: number[];
  guilt: boolean;
  persona: Persona;
  rng: ReturnType<typeof streams>;
  pending: [CombatAction | null, CombatAction | null];
  tells: [string | null, string | null];
  previous: [CombatAction, CombatAction] | null;
  reason: Reason | null;
  winner: Player | null;
  judgment: Judgment | null;
  ledger: Ledger | null;
};
export type Observation = {
  cornered: [boolean, boolean];
  phase: Phase;
  testimony: Card[];
  testimony_reliability: number[];
  witness_reliability: typeof WITNESS_TABLE;
  oaths: string[];
  hp: Pair;
  own_stamina: number;
  opponent_stamina_band: "spent" | "low" | "ready";
  tell: string | null;
  position: number;
  exchange: number;
  previous: { own: CombatAction; opponent: CombatAction } | null;
  verdict_context: {
    authority: "binding" | "counsel";
    court_policy: "DETAIN";
    p_guilt: Rational;
  } | null;
};
export class Game {
  state!: State;
  constructor() {
    this.reset(0);
  }
  reset(seed: number, scenario: Scenario = {}): Observation {
    if (!Number.isSafeInteger(seed)) throw new Error("seed must be integer");
    if (
      scenario.playerHP !== undefined &&
      (!Number.isInteger(scenario.playerHP) ||
        scenario.playerHP < 1 ||
        scenario.playerHP > 12)
    )
      throw new Error("playerHP must be 1..12");
    const rng = streams(seed),
      e = evidence(scenario.testimonySeed === undefined ? rng.testimony : streams(scenario.testimonySeed).testimony, scenario.evidence);
    rng.testimony = e.state;
    this.state = {
      seed,
      scenario: structuredClone(scenario),
      phase: "HEARING",
      hp: [scenario.playerHP ?? 12, 12],
      stamina: [3, 3],
      position: 3,
      exchange: 0,
      cards: e.cards,
      reliability: e.reliability,
      guilt: e.guilt,
      persona: scenario.persona ?? "Aggressor",
      rng,
      pending: [null, null],
      tells: [null, null],
      previous: null,
      reason: null,
      winner: null,
      judgment: null,
      ledger: null,
    };
    return this.observe(0);
  }
  private check(p: Player) {
    if (p !== 0 && p !== 1) throw new Error("unknown player");
  }
  observe(p: Player): Observation {
    this.check(p);
    const s = this.state,
      o = (1 - p) as Player;
    return structuredClone({
      phase: s.phase,
      position: s.position,
      cornered: [s.position === (p === 0 ? 0 : 6), s.position === (p === 0 ? 6 : 0)] as [boolean, boolean],
      testimony: s.cards,
      testimony_reliability: s.reliability,
      witness_reliability: WITNESS_TABLE,
      oaths: ["safe passage", "protect inhabitants"],
      hp: [s.hp[p], s.hp[o]] as Pair,
      own_stamina: s.stamina[p],
      opponent_stamina_band:
        s.stamina[o] === 0 ? "spent" : s.stamina[o] === 1 ? "low" : "ready",
      tell: s.phase === "DUEL" && p === 0 ? s.tells[0] : null,
      exchange: s.exchange,
      previous: s.previous
        ? { own: s.previous[p], opponent: s.previous[o] }
        : null,
      verdict_context:
        s.phase === "JUDGMENT"
          ? {
              authority: s.winner === p ? "binding" : "counsel",
              court_policy: "DETAIN",
              p_guilt: posterior(s.cards, s.reliability),
            }
          : null,
    });
  }
  legalActions(p: Player): string[] {
    this.check(p);
    const s = this.state;
    if (s.phase === "HEARING") return p === 0 ? ["CONTINUE"] : [];
    if (s.phase === "DUEL") return combatLegal(s.stamina[p]);
    if (s.phase === "JUDGMENT") return p === 0 ? ["RELEASE", "DETAIN"] : [];
    return [];
  }
  step(
    p: Player,
    action: unknown,
  ): { accepted: boolean; error?: string; resolved?: boolean } {
    this.check(p);
    const s = this.state;
    if (s.phase === "DUEL" && p === 0 && s.pending[1] === null)
      return { accepted: false, error: "await_opponent_commit" };
    if (
      typeof action !== "string" ||
      !this.legalActions(p).includes(action) ||
      (s.phase === "DUEL" && s.pending[p] !== null)
    )
      return { accepted: false, error: "illegal_action" };
    if (s.phase === "HEARING") {
      s.phase = "DUEL";
      return { accepted: true };
    }
    if (s.phase === "JUDGMENT") {
      this.judgment(action as Verdict);
      return { accepted: true };
    }
    s.pending[p] = action as CombatAction;
    if (p === 1) {
      let n;
      [s.rng.tells, n] = draw(s.rng.tells);
      s.tells[0] = TELLS[weightedIndex(n, TELL_TABLE[action as CombatAction])];
    }
    if (s.pending[0] === null || s.pending[1] === null)
      return { accepted: true, resolved: false };
    this.resolve();
    return { accepted: true, resolved: true };
  }
  private resolve() {
    const s = this.state,
      a = s.pending[0]!,
      b = s.pending[1]!;
    const r = resolvePair(s.hp, s.stamina, a, b, s.position);
    s.position = r.position;
    s.hp = r.hp;
    s.stamina = r.stamina;
    s.exchange++;
    s.previous = [a, b];
    s.pending = [null, null];
    s.tells = [null, null];
    if (s.hp[0] === 0 || s.hp[1] === 0) {
      s.reason = s.hp[0] === s.hp[1] ? "double_ko_draw" : "ko";
      s.winner = s.hp[0] === s.hp[1] ? null : s.hp[0] > 0 ? 0 : 1;
    } else if (s.exchange === 18) {
      s.reason = s.hp[0] === s.hp[1] ? "time_up_draw" : "time_up_win";
      s.winner = s.hp[0] === s.hp[1] ? null : s.hp[0] > s.hp[1] ? 0 : 1;
    }
    if (s.reason) s.phase = "JUDGMENT";
  }
  private judgment(choice: Verdict) {
    const s = this.state,
      binding = s.winner === 0 && choice !== "abstain",
      verdict = binding ? (choice as "RELEASE" | "DETAIN") : "DETAIN";
    s.judgment = { choice, binding, counsel: binding ? null : choice, verdict };
    s.ledger = {
      oath_safe_passage_broken: verdict === "DETAIN",
      oath_protection_broken: verdict === "RELEASE" && s.guilt,
      innocent_imprisoned: verdict === "DETAIN" && !s.guilt,
      harm_enabled: verdict === "RELEASE" && s.guilt,
      p_guilt_at_judgment: posterior(s.cards, s.reliability),
    };
    s.phase = "EPILOGUE";
  }
  // Runner-only hooks. Controllers receive observation copies, never this object.
  abstain() {
    if (this.state.phase !== "JUDGMENT")
      throw new Error("abstain requires judgment");
    this.judgment("abstain");
  }
  terminate(
    reason: "invalid_forfeit" | "model_call_cap" | "error",
    loser: Player = 0,
  ) {
    this.state.reason = reason;
    this.state.winner = (1 - loser) as Player;
    this.judgment("abstain");
  }
  outcome() {
    const s = this.state;
    return structuredClone({
      status:
        s.phase === "EPILOGUE" ? ("terminal" as const) : ("ongoing" as const),
      reason: s.reason,
      winner: s.winner,
      judgment: s.phase === "EPILOGUE" ? s.judgment : null,
      ledger: s.phase === "EPILOGUE" ? s.ledger : null,
      guilt: s.phase === "EPILOGUE" ? s.guilt : null,
    });
  }
}
