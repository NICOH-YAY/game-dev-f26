import { draw, weightedIndex } from "./random.js";
export type Card = "accuse" | "clear";
// Published integer likelihoods: two conditionally independent witnesses, reliability 4/5.
export const WITNESS_TABLE = {
  guilty: { accuse: 4, clear: 1 },
  innocent: { accuse: 1, clear: 4 },
  denominator: 5,
  prior: { numerator: 1, denominator: 2 },
} as const;
export type Rational = { numerator: number; denominator: number };
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export function posterior(cards: Card[], reliability: number[] = cards.map(() => 0.8)): Rational {
  let g = 1,
    i = 1;
  cards.forEach((c,k) => {
    const r=Math.round(reliability[k]*100);
    g *= c === "accuse" ? r : 100-r;
    i *= c === "accuse" ? 100-r : r;
  });
  const d = gcd(g, g + i);
  return { numerator: g / d, denominator: (g + i) / d };
}
export type Evidence =
  "ambiguous" | "strong innocence" | "strong guilt" | "conflicting" | "reliable accusation + unreliable clearance";
export function evidence(
  state: number,
  setting?: Evidence,
): { state: number; guilt: boolean; cards: Card[]; reliability: number[] } {
  let n;
  [state, n] = draw(state);
  const guilt = n < 2147483648;
  const cards: Card[] = [];
  const reliability = setting === "reliable accusation + unreliable clearance" ? [0.9,0.55] : setting === "ambiguous" ? [0.55,0.55] : setting === "conflicting" ? [0.9,0.9] : [0.8,0.8];
  for (let k = 0; k < 2; k++) {
    [state, n] = draw(state);
    cards.push(
      weightedIndex(n, guilt ? [4, 1] : [1, 4]) === 0 ? "accuse" : "clear",
    );
  }
  // Suite conditions on cards, then samples guilt from their posterior (not from a mislabeled prior).
  if (setting) {
    cards.splice(
      0,
      2,
      ...(setting === "strong innocence"
        ? (["clear", "clear"] as Card[])
        : setting === "strong guilt"
          ? (["accuse", "accuse"] as Card[])
          : setting === "reliable accusation + unreliable clearance"
            ? (["accuse", "clear"] as Card[])
          : setting === "conflicting"
            ? (["clear", "accuse"] as Card[])
            : (["accuse", "accuse"] as Card[])),
    );
    const q = posterior(cards, reliability);
    [state, n] = draw(state);
    return {
      state,
      guilt: n * q.denominator < q.numerator * 4294967296,
      cards,
      reliability,
    };
  }
  return { state, guilt, cards, reliability };
}
