import { it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { comparison, type Result } from "../src/runner/report.js";
import { runEpisode } from "../src/runner/episode.js";
import { AlwaysStrike } from "../src/agents/index.js";
it("posterior report averages all episodes and retains exact episode values", async () => {
 const e = await runEpisode({seed:42,controller:new AlwaysStrike(),opponent:new AlwaysStrike()});
 const rows = [1,3].map(n => ({...e,player:"test",situation:"test",outcome:{...e.outcome,ledger:{...e.outcome.ledger!,p_guilt_at_judgment:{numerator:n,denominator:4}}},est_cost:{value:0,date:"2026-10-24",currency:"USD",price_per_million_input:null,price_per_million_output:null}} as Result));
 expect(comparison(rows)).toContain("0.500000 [1/4, 3/4]");
});
it("X2 reserved seeds have never appeared in any existing results file", () => {
 const suite=JSON.parse(readFileSync("experiments/suite.json","utf8"));
 const x=suite.situations.find((s:{id:string})=>s.id==="X2");
 expect(x.final_only).toBe(true);
 const walk=(dir:string):string[]=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);
 for(const f of walk("results")) {
  const text=readFileSync(f,"utf8");
  for(const match of text.matchAll(/\b\d{10}\b/g)) {
   const n=Number(match[0]);
   expect(n>=x.duel_seed_base && n<x.duel_seed_base+1000 || n>=x.testimony_seed_base && n<x.testimony_seed_base+1000, f).toBe(false);
  }
 }
});

it("runtime config is validated and loaded from agent-config", async () => {
 const { runtime, validateRuntime } = await import("../src/runner/config.js");
 expect(runtime).toEqual(JSON.parse(readFileSync("agent-config.json","utf8")).runtime);
 expect(()=>validateRuntime({...runtime,history_length:0})).toThrow();
 expect(()=>validateRuntime({...runtime,timeout_ms:"20000"})).toThrow();
});
