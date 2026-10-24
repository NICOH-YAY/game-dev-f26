// Balance targets are evaluated separately from deterministic correctness tests.
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const out = `results/balance-${stamp}`;
const run = spawnSync(process.execPath, ['dist/runner/cli.js', '--trials', '20', '--out', out], { encoding: 'utf8' });
if (run.status !== 0) {
  console.error(run.stderr || run.error || 'Matrix execution failed');
  process.exit(2);
}
const rows = readFileSync(`${out}/summary.jsonl`, 'utf8').trim().split('\n').map(JSON.parse);
const players = ['baseline','baseline-depth1','baseline-agnostic','baseline-weighted','random','always-strike','always-bash','always-guard','always-recover','always-sidestep','strike-bash'];
const suite = JSON.parse(readFileSync('experiments/suite.json','utf8'));
const cells = suite.situations.flatMap(s => ['Aggressor','Sentinel','Opportunist','Adapter'].map(p => `${s.id}/${p}`));
// Fail execution rather than publish an incomplete matrix as a balance result.
if (rows.length !== 3520 || rows.some(r => r.stats.calls !== 0)) throw new Error('Expected 3,520 offline episodes');
const wins = {};
for (const cell of cells) {
  wins[cell] = {};
  for (const p of players) {
    const matches = rows.filter(r => r.player === p && r.situation === cell);
    if (matches.length !== 20 || new Set(matches.map(r => r.seed)).size !== 20) throw new Error(`Incomplete/duplicate cell ${cell}/${p}`);
    wins[cell][p] = matches.filter(r => r.outcome.winner === 0).length;
  }
}
const singles = players.slice(5,10);
const table = (names, selected, verdict) => [
  `| Cell | ${names.join(' | ')} |${verdict ? ' Result |' : ''}`,
  `|---|${names.map(()=>'---:|').join('')}${verdict ? '---|' : ''}`,
  ...selected.map(c => `| ${c} | ${names.map(n=>wins[c][n]).join(' | ')} |${verdict ? ` ${verdict(c) ? 'PASS' : 'FAIL'} |` : ''}`)
].join('\n');
const declared = suite.situations.map(s=>`${s.id}/${s.persona}`);
const adapters = suite.situations.map(s=>`${s.id}/Adapter`);
const a = c => wins[c].baseline > wins[c].random && singles.every(n => wins[c].baseline >= wins[c][n]);
const b = c => singles.every(n => wins[c][n] <= 10);
const passA = declared.every(a), passB = adapters.every(b);
const report = `## Riposte + pooled learning matrix (${stamp})\n\nCurrent evidence supersedes historical verdicts above. 3,520 episodes: 11 controllers x 4 personas x 4 situations x 20 paired trials, frozen suite seeds; fresh controllers. Draws are non-wins. Zero model calls. Execution PASS; design target (a) ${passA?'PASS':'FAIL'}, (b) ${passB?'PASS':'FAIL'}. Unmet targets remain visible and are not CI correctness gates.\n\nRaw evidence: [summary](../${out}/summary.jsonl), [comparison](../${out}/comparison.md), adjacent traces.\n\n### Full matrix (wins/20)\n\n${table(players,cells)}\n\n### Criterion (a): declared cells\n\n${table(['baseline',...singles,'random'],declared,a)}\n\n### Criterion (b): Adapter single-action ceiling <=10/20\n\n${table(['baseline',...singles,'random'],adapters,b)}\n\nOpen proposals (unapplied): investigate a less fragmented public response model for Sentinel and compare depth-1 versus depth-3 horizon effects on the same seeds. Baseline still trails always-BASH in S2; do not tune combat numbers or persona policy without a new Creative Director decision. Prior Adapter-strength proposal is unnecessary for the current fixed-seed ceiling, which now passes. No significance or human-play claims.\n`;
writeFileSync(`${out}/balance.md`, report.replaceAll(`../${out}/`, "./"));
const doc = 'docs/BALANCE-FINAL.md';
const history = readFileSync(doc,'utf8').replace(/^> Latest balance run:.*\n\n/, '');
writeFileSync(doc, `> Latest balance run: [report](../${out}/balance.md). Criterion (a): ${passA?'PASS':'FAIL'}; criterion (b): ${passB?'PASS':'FAIL'}. Historical runs below are preserved.\n\n${history}\n${report}`);
console.log(report);
process.exitCode = passA && passB ? 0 : 1;
