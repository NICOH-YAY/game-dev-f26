import { runtime } from "./config.js";
import type { Observation } from "../game.js";
import { TELL_TABLE } from "../sim/rules.js";
export type Arm = "M-obs" | "M-hist";
export type HistoryItem = { observation: Observation; action: string };
export function buildPrompt(
  arm: Arm,
  observation: Observation,
  legal: readonly string[],
  history: HistoryItem[],
): string {
  return JSON.stringify({
    game: "Trial by Combat: The Broken Oath",
    contract:
      'Return only {"action":"<ACTION>","intent":"<=12 words"}. Choose exactly one legal action.',
    rules: {
      hp: 12,
      stamina_max: 3,
      exchange_limit: 18,
      STRIKE: "cost 1; 3 damage except GUARD/SIDESTEP; beats BASH; damaging hit pushes toward victim wall; parry/evasion drains 1 extra",
      BASH: "cost 1; 2 damage and push except STRIKE/SIDESTEP; +1 damage if target starts cornered",
      GUARD: "blocks STRIKE, deals 1 riposte damage to striker without push and drains striker 1 extra stamina; +1 stamina",
      RECOVER: "+2 stamina, or +1 if initially cornered; vulnerable to attacks",
      SIDESTEP: "cost 1; evades STRIKE/BASH damage and push, then moves toward center; evaded STRIKE drains 1 extra; otherwise only spends stamina",
      footing: "absolute lane 0..6 starts 3; player 0 wall 0, player 1 wall 6; opposing pushes cancel; clamp position; corner evaluated before exchange",
      matching_attacks: "trade damage",
      tell_table: TELL_TABLE,
      tell_timing:
        "pending tell signals opponent committed action before player choice; noisy table weights total 100",
      judgment:
        "RELEASE risks guilty harm; DETAIN breaks passage oath and imprisons innocent; loss/draw court DETAIN",
    },
    observation,
    legal,
    ...(arm === "M-hist" ? { history: history.slice(-runtime.history_length) } : {}),
  });
}
