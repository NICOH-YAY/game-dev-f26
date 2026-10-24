import { readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
export const sha256 = (data: string) => createHash("sha256").update(data).digest("hex");
export function provenance(suiteText: string) {
 const cwd = new URL("../../", import.meta.url);
 const git = (...args: string[]) => execFileSync("git",args,{cwd,encoding:"utf8",stdio:["ignore","pipe","pipe"]});
 const root = fileURLToPath(cwd);
 const walk = (dir: string): string[] => readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(resolve(dir,e.name)):[resolve(dir,e.name)]);
 const files = [...walk(resolve(root,"src")),...walk(resolve(root,"experiments")),...walk(resolve(root,"tests")),...["agent-config.json","package.json","package-lock.json","tsconfig.json","tsconfig.build.json"].map(n=>resolve(root,n))].sort();
 const source_manifest = Object.fromEntries(files.map(f=>[relative(root,f).replaceAll("\\","/"),sha256(readFileSync(f,"utf8"))]));
 const config = readFileSync(new URL("../../agent-config.json",import.meta.url),"utf8");
 return {git_sha:git("rev-parse","HEAD").trim(),working_tree:git("status","--porcelain","--",".").trim() ? "dirty" : "clean",source_sha256:sha256(JSON.stringify(source_manifest)),source_manifest,patch_scope:"src, experiments, tests, agent-config and package/TypeScript manifests (tracked diff); source_manifest also includes untracked files",patch_sha256:sha256(git("diff","HEAD","--","src","experiments","tests","agent-config.json","package.json","package-lock.json","tsconfig.json","tsconfig.build.json") ),
 game_version:JSON.parse(readFileSync(new URL("../../package.json",import.meta.url),"utf8")).version,
 suite_sha256:sha256(suiteText),config_sha256:sha256(config),date:new Date().toISOString(),price_date:"PENDING (2026-10-24 placeholder; no quote fetched)"};
}
export type Provenance = ReturnType<typeof provenance>;
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
export function comparison(results: Result[], meta?: Provenance): string {
  const { source_manifest: _manifest, ...headerMeta } = meta ?? {source_manifest: {}};
  const header =
    "| Player | Situation | W/D/L | Terminal reasons | HP diff avg | Exchanges avg | RELEASE/DETAIN/abstain | Binding/counsel | Passage/protection/innocent/harm | p_guilt mean [per episode] | Illegal | Fallbacks | Calls | Latency p50/p95 ms | Tokens in/out | Est. cost USD |";
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
      const qs = rows.map(r => r.outcome.ledger?.p_guilt_at_judgment);
      const available = qs.filter((q): q is NonNullable<typeof q> => !!q);
      const posterior = available.length ? `${(available.reduce((a,q)=>a+q.numerator/q.denominator,0)/available.length).toFixed(6)} [${qs.map(q=>q ? `${q.numerator}/${q.denominator}` : "missing").join(", ")}] missing:${n-available.length}` : "missing";
      lines.push(
        `| ${player} | ${situation} | ${count((r) => r.outcome.winner === 0)}/${count((r) => r.outcome.winner === null)}/${count((r) => r.outcome.winner === 1)} | ${Object.entries(
          reasons,
        )
          .map(([k, v]) => `${k}:${v}`)
          .join(
            ", ",
          )} | ${(sum((r) => r.hp_diff) / n).toFixed(2)} | ${(sum((r) => r.exchanges) / n).toFixed(2)} | ${count((r) => r.outcome.judgment?.choice === "RELEASE")}/${count((r) => r.outcome.judgment?.choice === "DETAIN")}/${count((r) => r.outcome.judgment?.choice === "abstain")} | ${count((r) => !!r.outcome.judgment?.binding)}/${count((r) => r.outcome.judgment?.counsel !== null)} | ${count((r) => !!r.outcome.ledger?.oath_safe_passage_broken)}/${count((r) => !!r.outcome.ledger?.oath_protection_broken)}/${count((r) => !!r.outcome.ledger?.innocent_imprisoned)}/${count((r) => !!r.outcome.ledger?.harm_enabled)} | ${posterior} | ${sum((r) => r.stats.illegal)} | ${sum((r) => r.stats.fallbacks)} | ${sum((r) => r.stats.calls)} | ${percentile(latencies, 0.5).toFixed(1)}/${percentile(latencies, 0.95).toFixed(1)} | ${sum((r) => r.stats.tok_in)}/${sum((r) => r.stats.tok_out)} | ${rows.every((r) => r.est_cost.value === 0) ? "0 (offline)" : "TODO price"} |`,
      );
    }
  return (
    "# Trial by Combat comparison\n\n" + (meta ? `Provenance: ${JSON.stringify({...headerMeta,model_ids:[...new Set(results.flatMap(r=>r.model_ids))],config_id:"agent-config.json"})}\n\n` : "Provenance: unavailable (test/in-memory report).\n\n") + "Raw counts; paired seeds; no significance claims. Judgment counts are choices; counsel is advisory. Ledger counts use binding verdicts. Model-call latency only (offline = 0). Price placeholders dated " +
    (results[0]?.est_cost.date ?? "unknown") +
    ".\n\n" +
    lines.join("\n") +
    "\n"
  );
}
