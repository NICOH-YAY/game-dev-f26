// Offline renderer fixtures only. No model calls, X2 or evaluation reports.
import { writeFileSync, copyFileSync, readFileSync } from 'node:fs';
import { runEpisode } from '../../dist/runner/episode.js';
import { PersonaController, AlwaysStrike, Expectimax } from '../../dist/agents/index.js';
import { streams } from '../../dist/sim/random.js';
function save(file, trace) { writeFileSync(file,trace.map(r=>JSON.stringify(r)).join('\n')+'\n'); }
const demo=await runEpisode({seed:42,scenario:{persona:'Sentinel'},controller:new AlwaysStrike(),opponent:new PersonaController('Sentinel',42)});
save('results/samples/renderer-demo.jsonl',demo.trace);
copyFileSync('results/samples/renderer-demo.jsonl','web/public/traces/sample.jsonl');
const suite=JSON.parse(readFileSync('experiments/suite.json','utf8'));
for(const [id,persona] of [['S1','Aggressor'],['S2','Sentinel'],['S3','Opportunist'],['X1','Adapter']]) {
 const base=suite.situations.find(s=>s.id===id),seed=base.duel_seed_base;
 const episodeId=`trial-by-combat-baseline-${id}-${persona}-${seed}`;
 const result=await runEpisode({seed,scenario:{...base,persona,testimonySeed:suite.testimony_seed_base},episodeId,controller:new Expectimax(3),opponent:new PersonaController(persona,streams(seed).persona)});
 save(`results/samples/${episodeId}.jsonl`,result.trace);
}
console.log('Regenerated five offline presentation fixtures and browser sample; no X2 or model calls.');
