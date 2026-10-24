// mulberry32: integer output; streams are named and serialized, never Math.random.
export function draw(state: number): [number, number] {
  const next = (state + 0x6d2b79f5) >>> 0;
  let t = next;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return [next, (t ^ (t >>> 14)) >>> 0];
}
export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value))
    return "[" + value.map(stableStringify).join(",") + "]";
  return (
    "{" +
    Object.keys(value)
      .sort()
      .map(
        (k) =>
          JSON.stringify(k) +
          ":" +
          stableStringify((value as Record<string, unknown>)[k]),
      )
      .join(",") +
    "}"
  );
}
// FNV-1a is a stable trace checksum, not a cryptographic commitment.
export function stableHash(value: unknown): string {
  let h = 2166136261;
  for (const c of stableStringify(value)) {
    h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}
export function streams(seed: number) {
  return {
    testimony: (seed ^ 0xa341316c) >>> 0,
    tells: (seed ^ 0xc8013ea4) >>> 0,
    persona: (seed ^ 0xad90777d) >>> 0,
  };
}
export function weightedIndex(n: number, weights: readonly number[]): number {
  const total = weights.reduce((a, b) => a + b, 0);
  const point = Math.floor((n * total) / 4294967296);
  let s = 0;
  return weights.findIndex((w) => (s += w) > point);
}
