import { it, expect } from "vitest";
import { draw, streams, stableHash } from "../src/sim/random.js";
import { evidence, posterior } from "../src/sim/evidence.js";
import { readFileSync } from "node:fs";
it("mulberry32 known first output and independent named streams", () => {
  expect(draw(0)).toEqual([1831565813, 1144304738]);
  const a = streams(9),
    b = streams(9);
  for (let i = 0; i < 100; i++) {
    [a.testimony] = draw(a.testimony);
    [a.persona] = draw(a.persona);
  }
  expect(a.tells).toBe(b.tells);
  expect(draw(a.tells)).toEqual(draw(b.tells));
  expect(new Set(Object.values(b)).size).toBe(3);
  expect(stableHash({ z: 1, a: 2 })).toBe(stableHash({ a: 2, z: 1 }));
});
it("published witnesses generate deterministic calibrated evidence", () => {
  let guilty = 0,
    accusations = 0,
    total = 0;
  for (let i = 0; i < 3000; i++) {
    const e = evidence(streams(i).testimony);
    expect(e).toEqual(evidence(streams(i).testimony));
    expect(e.cards).toHaveLength(2);
    if (e.guilt) {
      guilty++;
      accusations += e.cards.filter((c) => c === "accuse").length;
      total += 2;
    }
  }
  expect(guilty).toBeGreaterThan(1300);
  expect(guilty).toBeLessThan(1700);
  expect(accusations / total).toBeGreaterThan(0.76);
  expect(accusations / total).toBeLessThan(0.84);
});
it("frozen situation identities match design; numbers are declared defaults", () => {
  const suite = JSON.parse(readFileSync("experiments/suite.json", "utf8"));
  expect(
    suite.situations.map((s: any) => [s.id, s.evidence, s.persona, s.held_out]),
  ).toEqual([
    ["S1", "ambiguous", "Aggressor", false],
    ["S2", "strong innocence", "Sentinel", false],
    ["S3", "strong guilt", "Opportunist", false],
    ["X1", "conflicting", "Adapter", true],
  ]);
  expect(suite.live_trials).toBe(3);
  expect(suite.situations.every((s: {duel_seed_base: number}) => Number.isSafeInteger(s.duel_seed_base))).toBe(true);
  expect(suite.situations[1].playerHP).toBeLessThan(12);
  for (const setting of [
    "ambiguous",
    "strong innocence",
    "strong guilt",
    "conflicting",
  ] as const) {
    const e = evidence(42, setting);
    expect(posterior(e.cards, e.reliability).denominator).toBe(
      setting.startsWith("strong") ? 17 : setting === "ambiguous" ? 202 : 2,
    );
  }
});
