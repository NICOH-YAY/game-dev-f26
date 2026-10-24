// Rebuild the evidence document from an already completed offline matrix. Never runs episodes.
import {readFileSync,writeFileSync,copyFileSync} from 'node:fs';
import {resolve,relative,isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
process.chdir(root);
const dir=process.argv[2];
if(!dir) throw new Error('Usage: node experiments/evaluation.mjs results/<matrix>');
const rel=relative(resolve('results'),resolve(dir));
if(rel.startsWith('..')||isAbsolute(rel)) throw new Error('Matrix must be inside results');
const read=n=>readFileSync(`${dir}/${n}`,'utf8');
const rows=read('summary.jsonl').trim().split('\n').map(JSON.parse);
if(rows.length!==3520 || rows.some(r=>r.stats.calls || r.situation.startsWith('X2/'))) throw new Error('Expected complete offline non-X2 matrix');
const meta=JSON.parse(read('provenance.json'));
const suite=JSON.parse(readFileSync('experiments/suite.json','utf8'));
const declared=suite.situations.filter(s=>!s.final_only).map(s=>`${s.id}/${s.persona}`);
const players=[...new Set(rows.map(r=>r.player))];
const wins=(p,c)=>rows.filter(r=>r.player===p && r.situation===c && r.outcome.winner===0).length;
const singles=['always-strike','always-bash','always-guard','always-recover','always-sidestep'];
const a=c=>singles.every(p=>wins('baseline',c)>=wins(p,c)) && wins('baseline',c)>wins('random',c);
const adapters=declared.map(c=>`${c.split('/')[0]}/Adapter`);
const b=c=>singles.every(p=>wins(p,c)<=10);
const comparison=read('comparison.md');
const table=comparison.split('\n').filter(l=>l.startsWith('|') && (!l.includes(' | S') && !l.includes(' | X') || declared.some(c=>l.includes(` | ${c} |`)))).join('\n');
const text=`# Evaluation: Trial by Combat: The Broken Oath

Evidence date: ${meta.date}. Game version ${meta.game_version}; base Git HEAD ${meta.git_sha}; working tree **${meta.working_tree}**. These results were generated from the uncommitted implementation, not pristine HEAD. Source manifest SHA-256 ${meta.source_sha256}; suite SHA-256 ${meta.suite_sha256}; config SHA-256 ${meta.config_sha256}. Full per-file manifest and patch fingerprint: [provenance](${dir}/provenance.json). No commit or push was made.

## Declared suite and integrity

[S1/S2/S3/X1 suite] (experiments/suite.json) originally freeze-dated 2026-10-24; X2 amendment frozen 2026-10-24 at the base commit above plus the recorded working-tree suite hash. Historical freeze labels do not erase subsequent tuning exposure. Seeds reserve 1,000 per case; trial i uses base+i, paired across arms/personas within a case, disjoint across cases. Development matrix uses i=0..19. Live slots i=0..2 are declared but PENDING. Testimony uses its independent named stream and base 1026102401+i for development cases.

| Case | Evidence / HP | Declared persona | Duel seed range (reserved) | Integrity |
|---|---|---|---|---|
| S1 | .55/.55 accusing; HP12 | Aggressor | 2026102401..2026103400 | Development |
| S2 | .80/.80 clearing; HP9 | Sentinel | 2026103401..2026104400 | Development |
| S3 | .80/.80 accusing; HP12 | Opportunist | 2026104401..2026105400 | Development |
| X1 | .90 clearance + .90 accusation; HP12 | Adapter | 2026105401..2026106400 | held-out from prompt tuning but observed during balance tuning |
| X2 | .90 accusing + .55 exculpatory; HP12 | Mimic | Reserved in suite.json | Fresh final-only; NEVER RUN |

X2 Mimic repeats the champion's previous resolved action with probability .70; otherwise follows Sentinel policy. No previous action uses Sentinel. Unaffordable copied action becomes GUARD. Its new testimony range is reserved separately in suite.json; ".55 unreliable" means less reliable than .90, not below chance. Exact conditioned guilt posterior is 81/92. X2 is excluded from the CLI and balance scripts, including baselines, and is reserved for one final evaluation after Nicoh's explicit instruction and independent review. Unit tests exercise synthetic policy inputs with non-suite seeds; they are not X2 episodes. The integrity test scans existing result files for either reserved range. Do not change the freeze after observing final results.

## Players / arms

Primary baseline: depth-3 expectimax, pooled global plus local public-context online action learning, current-tell Bayes update, exact min-harm judgment. Fresh controller each episode. Depth1 retains learning at depth 1; baseline-agnostic learns pooled action counts without contexts; baseline-weighted changes judgment to costs harm=5, imprisonment=1, promise=1. Floors: random legal, always STRIKE/BASH/GUARD/RECOVER/SIDESTEP (unaffordable action becomes GUARD), plus alternating strike-bash. All offline arms use observation-only interfaces; all floors use the declared posterior judgment policy.

Model arms: M-obs current observation; M-hist current observation plus last 8 observations/own actions. Vertex is the configured live provider. Requested setup model is gemini-3.5-flash-lite; no runtime model IDs exist for this offline matrix. Availability/prices are unverified. No model calls were made and no fixture stands in for live evaluation. Four legacy personas are crossed with every development case; X2's Mimic is absent from this matrix.

## Metric definitions

W/D/L counts winner 0 / null / 1; draws are non-wins for criteria. HP difference is final champion minus opponent HP; exchange count counts resolved exchanges. Both are arithmetic means. Terminal reasons are raw counts. RELEASE/DETAIN/abstain count choices; binding/counsel are distinct authority contexts. Ledger columns count safe-passage breach, protection breach, innocent imprisonment and enabled harm from the binding verdict, not advisory choices. Posterior is the arithmetic mean over episodes with ledger values, followed by exact episode fractions in summary order and a missing count; it is foreseeable guilt risk, not observed guilt frequency.

Illegal counts rejected proposals; fallbacks count runner substitutions and never model moves. Calls include rejected replies and reasks. Token input/output sums count reported usage for all calls. Latency p50/p95 uses nearest rank over model-call latencies only, including rejected calls; empty offline distributions display 0. Cost is zero for offline runs; live cost remains unknown until dated input/output prices are supplied. Raw paired counts are descriptive, with no significance or ethical-understanding claim. Correctness tests and human experience are different evidence.

## Fresh offline comparison

3,520 episodes, 11 controllers x 4 personas x 4 cases x 20 seeds. Zero calls, fallbacks, illegal proposals, tokens and cloud cost. The table below selects the four declared cells; the [full 176-group comparison](${dir}/comparison.md), [raw summary](${dir}/summary.jsonl), and adjacent traces contain the full cross-product. This table is generated by experiments/evaluation.mjs from the current completed matrix.

${table}

## Balance criteria

(a) Baseline wins >= every single-action bot and > random in each declared cell: **${declared.every(a)?'PASS':'FAIL'}**. S2/Sentinel remains baseline ${wins('baseline','S2/Sentinel')}/20 versus always-BASH ${wins('always-bash','S2/Sentinel')}/20 and random ${wins('random','S2/Sentinel')}/20. (b) Each single-action bot <=10/20 wins against Adapter in each development situation: **${adapters.every(b)?'PASS':'FAIL'}**. No combat/persona tuning was applied in this pass. [Per-cell balance report](${dir}/balance.md). Execution succeeded; balance exit 1 records unmet criterion (a), not a correctness-test failure. No gate is approved here.

## CI evidence

PENDING ? add hosted CI run URL after Nicoh pushes. Local evidence: npm test and npm run typecheck; see [test record](docs/TEST-RESULTS.md). Hosted CI was not run during this implementation.

## Live trials

PENDING; no live trial has run. Declared-persona slice is 2 arms x 4 development cases x 3 trials = 24 episodes. The documented current CLI command crosses all four personas, so executing it would produce 96 live episodes; it still excludes X2. X2 final evaluation protocol/execution is pending, and must be frozen and reviewed before use.

| Arm | Case/persona | Trial/seed | Runtime model/config ID | Outcome | Calls/tokens/latency/cost | Artifact |
|---|---|---|---|---|---|---|
| M-obs | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING |
| M-hist | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING |
| Final X2 | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING |

## Cost

2026-10-24 dated-price placeholder: input USD/million tokens **PENDING**, output USD/million tokens **PENDING**, official price URL and retrieval date **PENDING**. No quoted price was fetched. For live trials, estimated USD = input_tokens/1e6 * input_price + output_tokens/1e6 * output_price, with caching/other charges documented if applicable. Current offline cost is USD 0. Caps: 30 calls/episode, 20s/call, one unparseable reask counted toward cap, three consecutive fallbacks forfeit. No cloud credits were spent by these runs.

## LIMITATIONS

TODO ? Nicoh writes this section in his own voice.

### facts for Nicoh, not his text

- Criterion (a) fails in S2/Sentinel; depth 3 does not dominate all floors or ablations.
- X1 was observed during balance tuning; it is not clean final generalization evidence.
- X2 has never run; the final-only exclusion needs a reviewed final-evaluation path before its one use.
- No live results, provider availability verification, dated price quote, hosted CI run, peer play or recording exists for this pass.
- Fixed paired seeds and small samples do not establish significance; scripted personas and conditioned testimony are synthetic.
- .55 reliability is comparatively unreliable; the independent-witness and 1/2-prior assumptions are designed, not calibrated to people.
- Headless terminal play and included key art do not constitute a complete renderer.
- Independent review of this pass, authorial AGENT-TEAM narrative and interpretation remain pending.
`;
writeFileSync('EVALUATION.md',text.replace('[S1/S2/S3/X1 suite] (','[S1/S2/S3/X1 suite]('));
for(const name of ['comparison.md','summary.jsonl','provenance.json']) copyFileSync(`${dir}/${name}`,`results/${name}`);
console.log(`EVALUATION.md and canonical summaries refreshed from ${dir}`);
