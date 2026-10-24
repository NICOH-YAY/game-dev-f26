import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlwaysStrike,
  SimpleBot,
  Expectimax,
  RandomLegal,
  PersonaController,
  type Controller,
} from "../agents/index.js";
import type { Scenario } from "../game.js";
import { streams } from "../sim/random.js";
import { VertexGemini, type ModelController } from "./model.js";
import { runEpisode } from "./episode.js";
import { comparison, provenance, type Result } from "./report.js";
const args = process.argv.slice(2);
const value = (key: string, defaultValue: string) => {
  const i = args.indexOf(key);
  return i < 0 ? defaultValue : (args[i + 1] ?? defaultValue);
};
const root = fileURLToPath(new URL("../../", import.meta.url));
function inside(path: string) {
  const absolute = resolve(root, path),
    rel = relative(root, absolute);
  if (rel.startsWith("..") || isAbsolute(rel))
    throw new Error("Output must remain under trial-by-combat package");
  return absolute;
}
async function main() {
  const suiteText = await readFile(resolve(value("--suite", "experiments/suite.json")), "utf8");
  const meta = provenance(suiteText);
  const suite = JSON.parse(suiteText) as {
    testimony_seed_base: number;
    situations: (Scenario & { id: string; held_out: boolean; final_only?: boolean; duel_seed_base: number })[];
  };
  const players = value("--players", "baseline,baseline-depth1,baseline-agnostic,baseline-weighted,random,always-strike,always-bash,always-guard,always-recover,always-sidestep,strike-bash").split(
    ",",
  );
  const trials = Number(value("--trials", "20"));
  if (!Number.isInteger(trials) || trials < 1 || trials > 1000)
    throw new Error("--trials must be integer 1..1000");
  if (
    players.some(
      (p) =>
        ![
          "baseline",
          "baseline-depth1",
          "baseline-agnostic",
          "baseline-weighted",
          "random",
          "always-strike",
          "always-bash", "always-guard", "always-recover", "always-sidestep", "strike-bash",
          "M-obs",
          "M-hist",
        ].includes(p),
    )
  )
    throw new Error("Unknown player");
  if (players.some((p) => p.startsWith("M-")) && !args.includes("--live"))
    throw new Error("Model arms require --live; no fixture substitution");
  const out = inside(value("--out", "results"));
  await mkdir(out, { recursive: true });
  await mkdir(resolve(out, "traces"), { recursive: true });
  const results: Result[] = [];
  for (const player of players)
    for (const baseScenario of suite.situations.filter(s => !s.final_only && s.id !== "X2"))
     for (const persona of ["Aggressor","Sentinel","Opportunist","Adapter"] as const) {
      const scenario = {...baseScenario, persona};
      for (let i = 0; i < trials; i++) {
        const seed = baseScenario.duel_seed_base + i;
        scenario.testimonySeed = suite.testimony_seed_base + i;
        let controller: Controller | ModelController;
        if (player.startsWith("M-"))
          controller = new VertexGemini(args.includes("--live"));
        else if (player === "random")
          controller = new RandomLegal(seed ^ 0x12345678);
        else if (player === "always-strike") controller = new AlwaysStrike();
        else if (["always-bash","always-guard","always-recover","always-sidestep","strike-bash"].includes(player)) controller = new SimpleBot(player as "always-bash"|"always-guard"|"always-recover"|"always-sidestep"|"strike-bash");
        else
          controller = new Expectimax(
            player === "baseline-depth1" ? 1 : 3,
            player === "baseline-weighted" ? "weighted" : "min-harm",
            player !== "baseline-agnostic",
          );
        const opponent = new PersonaController(
          scenario.persona ?? "Aggressor",
          streams(seed).persona,
        );
        const episodeId = `trial-by-combat-${player}-${scenario.id}-${persona}-${seed}`;
        const { trace, ...episode } = await runEpisode({
          seed,
          scenario,
          controller,
          opponent,
          episodeId,
          arm: player === "M-hist" ? "M-hist" : "M-obs",
        });
        await writeFile(
          inside(`${value("--out", "results")}/traces/${episodeId}.jsonl`),
          trace.map((t) => JSON.stringify(t)).join("\n") + "\n",
        );
        results.push({
          ...episode,
          player,
          situation: `${scenario.id}/${persona}`,
          est_cost: {
            price_per_million_input: null,
            price_per_million_output: null,
            currency: "USD",
            date: new Date().toISOString().slice(0, 10),
            value: player.startsWith("M-") ? null : 0,
          },
        });
      }
      console.log(`${player} ${scenario.id}: ${trials} episodes`);
    }
  await writeFile(
    inside(`${value("--out", "results")}/summary.jsonl`),
    results.map((r) => JSON.stringify(r)).join("\n") + "\n",
  );
  await writeFile(inside(`${value("--out", "results")}/provenance.json`), JSON.stringify({...meta,model_ids:[...new Set(results.flatMap(r=>r.model_ids))],config_id:"agent-config.json"},null,2)+"\n");
  const table = comparison(results, meta);
  await writeFile(inside(`${value("--out", "results")}/comparison.md`), table);
  console.log(table);
}
main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
