import type { runEpisode } from "./episode.js";
export type Result = Omit<Awaited<ReturnType<typeof runEpisode>>, "trace"> & {
  player: string;
  situation: string;
  est_cost: {
    price_per_million_input: null;
    price_per_million_output: null;
    currency: "USD";
    date: string;
    value: null | number;
  };
};
export function percentile(xs: number[], p: number) {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.max(0, Math.ceil(p * s.length) - 1)];
}
export function comparison(results: Result[]): string {
  const header =
    "| Player | Situation | W/D/L | Terminal reasons | HP diff avg | Exchanges avg | RELEASE/DETAIN/abstain | Binding/counsel | Passage/protection/innocent/harm | p_guilt | Illegal | Fallbacks | Calls | Latency p50/p95 ms | Tokens in/out | Est. cost USD |";
  const lines = [
    header,
    "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|",
  ];
  for (const player of [...new Set(results.map((r) => r.player))])
    for (const situation of [...new Set(results.map((r) => r.situation))]) {
      const rows = results.filter(
        (r) => r.player === player && r.situation === situation,
      );
      if (!rows.length) continue;
      const n = rows.length,
        sum = (f: (r: Result) => number) => rows.reduce((a, r) => a + f(r), 0),
        count = (f: (r: Result) => boolean) => rows.filter(f).length;
      const reasons: Record<string, number> = {};
      for (const r of rows)
        reasons[r.outcome.reason ?? "unknown"] =
          (reasons[r.outcome.reason ?? "unknown"] ?? 0) + 1;
      const latencies = rows.flatMap((r) => r.stats.latencies);
      const q = rows[0].outcome.ledger?.p_guilt_at_judgment;
      lines.push(
        `| ${player} | ${situation} | ${count((r) => r.outcome.winner === 0)}/${count((r) => r.outcome.winner === null)}/${count((r) => r.outcome.winner === 1)} | ${Object.entries(
          reasons,
        )
          .map(([k, v]) => `${k}:${v}`)
          .join(
            ", ",
          )} | ${(sum((r) => r.hp_diff) / n).toFixed(2)} | ${(sum((r) => r.exchanges) / n).toFixed(2)} | ${count((r) => r.outcome.judgment?.choice === "RELEASE")}/${count((r) => r.outcome.judgment?.choice === "DETAIN")}/${count((r) => r.outcome.judgment?.choice === "abstain")} | ${count((r) => !!r.outcome.judgment?.binding)}/${count((r) => r.outcome.judgment?.counsel !== null)} | ${count((r) => !!r.outcome.ledger?.oath_safe_passage_broken)}/${count((r) => !!r.outcome.ledger?.oath_protection_broken)}/${count((r) => !!r.outcome.ledger?.innocent_imprisoned)}/${count((r) => !!r.outcome.ledger?.harm_enabled)} | ${q ? `${q.numerator}/${q.denominator}` : "?"} | ${sum((r) => r.stats.illegal)} | ${sum((r) => r.stats.fallbacks)} | ${sum((r) => r.stats.calls)} | ${percentile(latencies, 0.5).toFixed(1)}/${percentile(latencies, 0.95).toFixed(1)} | ${sum((r) => r.stats.tok_in)}/${sum((r) => r.stats.tok_out)} | ${rows.every((r) => r.est_cost.value === 0) ? "0 (offline)" : "TODO price"} |`,
      );
    }
  return (
    "# Trial by Combat comparison\n\nRaw counts; paired seeds; no significance claims. Judgment counts are choices; counsel is advisory. Ledger counts use binding verdicts. Model-call latency only (offline = 0). Price placeholders dated " +
    (results[0]?.est_cost.date ?? "unknown") +
    ".\n\n" +
    lines.join("\n") +
    "\n"
  );
}
