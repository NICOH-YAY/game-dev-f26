# Current implementation-pass validation (2026-10-24)

- `npm test`: PASS, 84 tests in 9 files, including actual npm/Node CLI, posterior aggregation, config validation, Mimic synthetic policy/hidden-read tests, and unused-X2-seed scan.
- `npm run typecheck`: PASS.
- `npm run balance`: completed 3,520 offline episodes per run. Criterion (a) FAIL (S2/Sentinel 11/20 baseline < 20/20 always-BASH); criterion (b) PASS. Exit 1 is an unmet design criterion; execution succeeded. See EVALUATION.md and latest linked matrix for current source identity.
- Development reruns during this pass finalized config/provenance; all use S1/S2/S3/X1 only and retain the same balance counts. No combat values or legacy persona policies were tuned.
- Red-before-green: posterior regression failed with first-episode 1/4 rather than mean .5; Mimic repeat test failed at .0935 rather than >.69; runtime config test failed before module existed. All pass now. The historical situation identity test was extended to declare X2 without executing it.
- X2 never ran (including baselines); no reserved seeds used. No live model calls, cloud spend, hosted CI, commit, push or approval.
- Independent review of this pass is pending in a different session.

## Historical validation records

Current run: see [BALANCE-FINAL.md](BALANCE-FINAL.md): 77 passed, 6 balance acceptance failures, typecheck passed, 3520 offline evaluation episodes completed. Results below are historical.

# Approved footing revision validation ? 2026-10-24

- Test first: 27/27 new combat cases failed against old rules before engine implementation.
- Final `npm test`: 67 pass, 1 fail (68 total). Only failure is requested always-strike <=50% S1 regression: actual 16/20 wins, limit 10.
- `npm run typecheck`: pass.
- `npm run eval -- --trials 20 --out results/footing`: pass; 2,560 offline episodes, 128 cells. No calls, cloud credits, commits or pushes.
- Golden state hashes, runner traces and explicit public position observation snapshots updated. Hidden-information and 6,000-seed tell-frequency checks pass.
- Balance criteria FAIL; all cells and exact violations: BALANCE.md. Raw summary, full comparison and per-episode traces: results/footing/.
- Independent read-only review requested through rules-reviewer instructions; balance blocker retained. Default-reliability documentation contradiction corrected after reviewer feedback. Review is not a gate approval.

## 2026-10-24 riposte + S2 correction (current)
- Red-before-green: five failures in targeted agents/footing/game run (four riposte assertions and one prior evidence-loss assertion), then all passed after engine/prior edits.
- `npm.cmd test`: PASS, 78 tests in 8 files; rule, limits, leak, determinism, observed regressions and CLI checks retained.
- `npm.cmd run typecheck`: PASS.
- `npm.cmd run eval -- --trials 20 --out results/riposte-20261024`: execution PASS, 3,520 offline episodes.
- `npm.cmd run balance`: matrix/report execution PASS, exits 1 honestly for criterion (a) FAIL (S2 11/20 < always-BASH 20/20); criterion (b) PASS. All other declared cells PASS. Full matrix and preserved history in BALANCE-FINAL.md.
- Existing workflow runs the same now-green npm test/typecheck commands; hosted CI was not run or changed.
