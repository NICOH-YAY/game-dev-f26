> Latest balance run: [report](../results/balance-2026-10-24T22-02-58-509Z/balance.md). Criterion (a): FAIL; criterion (b): PASS. Historical runs below are preserved.

## Current balance decision ? Nicoh, Creative Director, 2026-10-24

This decision replaces all earlier balance acceptance criteria and proposals below. Historical tables and observations remain evidence, not current requirements.

(a) In each DECLARED cell (S1/Aggressor, S2/Sentinel, S3/Opportunist, X1/Adapter), primary baseline wins must be >= every single-action bot's wins and > random wins.
(b) Against reactive Adapter, no single-action bot may win >50% in any situation.
Wins mean winner 0; draws are non-wins. Five single-action bots include STRIKE, BASH, GUARD, RECOVER and SIDESTEP, with their existing legal fallback.

Nicoh's rationale: the old universal "no single-action bot >50% vs any persona" criterion was too strict. Aggressor, Opportunist and Sentinel intentionally have exploitable, learnable habits; exploiting those habits is what the memory experiment measures. Ties against single-action bots are now allowed; strict superiority remains required against random. The comparison applies to the four declared cells, while Adapter's ceiling applies to all four situations. See [BALANCE-FINAL.md](BALANCE-FINAL.md) for current evidence. No combat numbers or persona policies changed in this pass.

## Online baseline revision ? 2026-10-24

The primary `baseline` is depth-3 expectimax with independent Dirichlet(1,1,1,1,1) action counts per small public context: player 0's previous resolved action (or start), player 1's public stamina band (spent/low/ready), and player 1's corner flag. Save the context before choosing, then increment that context's count for the opponent action revealed on the next exchange, once per exchange. An unseen context remains uniform. Fresh controller instances reset learning each episode. The global observed histogram remains diagnostic and supplies the agnostic ablation.

At the root, multiply context counts by the committed-action tell likelihood and normalize over legal actions for each possible opponent stamina (0, 1, or equally weighted 2/3). Future search layers use the same frozen learned context counts, selecting context from simulated stamina/position and the preceding simulated player-0 action. Cache keys include that action. No hypothetical observations train counts; future tells are not assumed known. Transition rules, leaf utility, tie ordering and persona policies are unchanged. This sparse model can underlearn within short matches; success is measured, not assumed.

`baseline-depth1` keeps contextual learning but searches one exchange. `baseline-agnostic` keeps depth 3 and the prior implementation's globally pooled Laplace action counts, ignoring context (it still learns marginal frequencies and uses tells). Both are persona-agnostic in the information-boundary sense: neither sees persona identifiers. `baseline-weighted` changes only judgment utility. These ablations are included in the full matrix.

Tests cover saved-context attribution, once-per-exchange updates, fresh-instance initialization, Bayes likelihoods and action non-interference under hidden-state changes/poison getters. They do not establish balance. Fixed-seed balance tests encode the acceptance criteria directly and remain failing when evidence fails.

## Final offline evaluation

Command: `npm.cmd run eval -- --trials 20 --out results/final-20261024` (Windows uses npm.cmd because npm.ps1 is disabled). Completed 3,520 episodes = 11 controllers ? 4 personas ? 4 situations ? 20 trials. No model calls, commits or pushes. Seeds/testimony ranges remain those frozen in experiments/suite.json. Fresh controller per match. Wins below are out of 20; draws count as non-wins. No significance or human-play claims.

Raw per-episode outcomes and model-call counts: [summary.jsonl](../results/final-20261024/summary.jsonl); W/D/L and other metrics: [comparison.md](../results/final-20261024/comparison.md); JSONL decision traces in the adjacent traces directory. Historical footing/reactive runs are preserved in BALANCE.md and BALANCE-REACTIVE.md.

## Full matrix (wins/20)

| Cell | baseline | baseline-depth1 | baseline-agnostic | baseline-weighted | random | always-strike | always-bash | always-guard | always-recover | always-sidestep | strike-bash |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| S1/Aggressor | 17 | 19 | 19 | 17 | 4 | 19 | 0 | 0 | 0 | 0 | 5 |
| S1/Sentinel | 13 | 12 | 15 | 13 | 12 | 10 | 20 | 0 | 0 | 0 | 18 |
| S1/Opportunist | 18 | 19 | 17 | 18 | 4 | 20 | 13 | 0 | 0 | 0 | 19 |
| S1/Adapter | 20 | 18 | 18 | 20 | 4 | 14 | 4 | 0 | 0 | 0 | 14 |
| S2/Aggressor | 14 | 13 | 9 | 14 | 3 | 10 | 0 | 0 | 0 | 0 | 4 |
| S2/Sentinel | 5 | 11 | 12 | 5 | 7 | 9 | 20 | 0 | 0 | 0 | 10 |
| S2/Opportunist | 16 | 10 | 15 | 16 | 3 | 18 | 7 | 0 | 0 | 0 | 16 |
| S2/Adapter | 12 | 12 | 10 | 12 | 5 | 8 | 1 | 0 | 0 | 0 | 9 |
| S3/Aggressor | 18 | 19 | 17 | 18 | 5 | 18 | 1 | 0 | 0 | 0 | 9 |
| S3/Sentinel | 16 | 14 | 15 | 16 | 14 | 6 | 19 | 0 | 0 | 0 | 19 |
| S3/Opportunist | 18 | 19 | 17 | 18 | 4 | 20 | 11 | 0 | 0 | 0 | 19 |
| S3/Adapter | 18 | 17 | 16 | 18 | 5 | 13 | 3 | 0 | 0 | 0 | 15 |
| X1/Aggressor | 18 | 19 | 17 | 18 | 5 | 18 | 2 | 0 | 0 | 0 | 11 |
| X1/Sentinel | 16 | 10 | 18 | 16 | 10 | 9 | 20 | 0 | 0 | 0 | 19 |
| X1/Opportunist | 19 | 20 | 19 | 19 | 4 | 20 | 16 | 0 | 0 | 0 | 20 |
| X1/Adapter | 18 | 19 | 20 | 18 | 6 | 15 | 4 | 0 | 0 | 0 | 18 |

## Declared suite ? criterion (a)

| Cell | baseline | always-strike | always-bash | always-guard | always-recover | always-sidestep | random | Result |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| S1/Aggressor | 17 | 19 | 0 | 0 | 0 | 0 | 4 | FAIL |
| S2/Sentinel | 5 | 9 | 20 | 0 | 0 | 0 | 7 | FAIL |
| S3/Opportunist | 18 | 20 | 11 | 0 | 0 | 0 | 4 | FAIL |
| X1/Adapter | 18 | 15 | 4 | 0 | 0 | 0 | 6 | PASS |

## Adapter ceiling ? criterion (b)

| Cell | baseline | always-strike | always-bash | always-guard | always-recover | always-sidestep | random | Result |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| S1/Adapter | 20 | 14 | 4 | 0 | 0 | 0 | 4 | FAIL |
| S2/Adapter | 12 | 8 | 1 | 0 | 0 | 0 | 5 | PASS |
| S3/Adapter | 18 | 13 | 3 | 0 | 0 | 0 | 5 | FAIL |
| X1/Adapter | 18 | 15 | 4 | 0 | 0 | 0 | 6 | FAIL |

## Verdict and smallest open proposals

Criterion (a): FAIL. S1/Aggressor: baseline 17/20 vs always-strike 19/20; S2/Sentinel: baseline 5/20 vs always-strike 9/20; S2/Sentinel: baseline 5/20 vs always-bash 20/20; S3/Opportunist: baseline 18/20 vs always-strike 20/20. X1/Adapter passes. S2/Sentinel also fails the random comparison: baseline 5/20 vs random 7/20; the other three declared cells exceed random. The context upgrade is implemented but does not meet the performance target.

The sparse context model also regresses S2/Sentinel from the historical global baseline's 12/20 to 5/20. This outcome is retained without tuning.

Smallest next baseline proposal: separately test hierarchical smoothing that backs sparse context counts off to the observed global action frequencies, rather than an independent uniform prior for each unseen context. Keep depth, utility, combat and persona policies fixed; rerun the identical matrix and preserve this run. This is a hypothesis, not an applied or verified fix.

Criterion (b): FAIL. Always-STRIKE wins 14/20 in S1, 13/20 in S3 and 15/20 in X1 against Adapter; S2 passes at 8/20. These results cannot be changed by upgrading the player baseline because these matches use a separate always-STRIKE controller. Smallest separate proposal for Nicoh's decision: test one Adapter policy parameter, increasing its existing modal-counter preference above .80 while retaining its window, counter map and all combat numbers. This is unapproved and may not fix the target (resource fallback and early exchanges also matter). No policy tuning was applied.

## Validation

`npm.cmd test`: 77 passed, 6 failed (83 total; 8 passing files, 1 failing balance file). All six failures are current fixed-seed acceptance failures: criterion (a) S1/S2/S3 and criterion (b) S1/S3/X1. Soft assertions report all failing bot comparisons; consult test output for exact assertions. Learning/non-interference, existing combat/persona tests and CLI regressions pass. `npm.cmd run typecheck`: PASS. `npm.cmd run eval`: PASS as execution, balance FAIL as above. Acceptance/gate decisions remain Nicoh's.

## Riposte + pooled learning matrix (2026-10-24T22-02-58-509Z)

Current evidence supersedes historical verdicts above. 3,520 episodes: 11 controllers x 4 personas x 4 situations x 20 paired trials, frozen suite seeds; fresh controllers. Draws are non-wins. Zero model calls. Execution PASS; design target (a) FAIL, (b) PASS. Unmet targets remain visible and are not CI correctness gates.

Raw evidence: [summary](../results/balance-2026-10-24T22-02-58-509Z/summary.jsonl), [comparison](../results/balance-2026-10-24T22-02-58-509Z/comparison.md), adjacent traces.

### Full matrix (wins/20)

| Cell | baseline | baseline-depth1 | baseline-agnostic | baseline-weighted | random | always-strike | always-bash | always-guard | always-recover | always-sidestep | strike-bash |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| S1/Aggressor | 17 | 16 | 18 | 17 | 6 | 17 | 1 | 0 | 0 | 0 | 6 |
| S1/Sentinel | 12 | 16 | 14 | 12 | 11 | 6 | 20 | 4 | 0 | 5 | 17 |
| S1/Opportunist | 18 | 19 | 18 | 18 | 5 | 20 | 16 | 0 | 0 | 16 | 19 |
| S1/Adapter | 16 | 19 | 17 | 16 | 4 | 2 | 5 | 0 | 0 | 1 | 5 |
| S2/Aggressor | 11 | 14 | 11 | 11 | 3 | 10 | 0 | 0 | 0 | 0 | 4 |
| S2/Sentinel | 11 | 12 | 16 | 11 | 8 | 4 | 20 | 0 | 0 | 0 | 7 |
| S2/Opportunist | 17 | 19 | 15 | 17 | 5 | 18 | 11 | 0 | 0 | 6 | 15 |
| S2/Adapter | 12 | 17 | 12 | 12 | 5 | 0 | 1 | 0 | 0 | 0 | 6 |
| S3/Aggressor | 15 | 16 | 15 | 15 | 5 | 17 | 1 | 0 | 0 | 0 | 9 |
| S3/Sentinel | 14 | 17 | 15 | 14 | 14 | 4 | 19 | 7 | 0 | 7 | 16 |
| S3/Opportunist | 19 | 19 | 19 | 19 | 6 | 19 | 12 | 0 | 0 | 17 | 19 |
| S3/Adapter | 17 | 18 | 18 | 17 | 4 | 1 | 5 | 0 | 0 | 0 | 6 |
| X1/Aggressor | 16 | 17 | 17 | 16 | 6 | 18 | 2 | 0 | 0 | 0 | 10 |
| X1/Sentinel | 17 | 17 | 16 | 17 | 9 | 3 | 20 | 4 | 0 | 7 | 18 |
| X1/Opportunist | 18 | 19 | 19 | 18 | 7 | 20 | 18 | 0 | 0 | 18 | 20 |
| X1/Adapter | 16 | 18 | 17 | 16 | 5 | 4 | 7 | 0 | 0 | 0 | 6 |

### Criterion (a): declared cells

| Cell | baseline | always-strike | always-bash | always-guard | always-recover | always-sidestep | random | Result |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| S1/Aggressor | 17 | 17 | 1 | 0 | 0 | 0 | 6 | PASS |
| S2/Sentinel | 11 | 4 | 20 | 0 | 0 | 0 | 8 | FAIL |
| S3/Opportunist | 19 | 19 | 12 | 0 | 0 | 17 | 6 | PASS |
| X1/Adapter | 16 | 4 | 7 | 0 | 0 | 0 | 5 | PASS |

### Criterion (b): Adapter single-action ceiling <=10/20

| Cell | baseline | always-strike | always-bash | always-guard | always-recover | always-sidestep | random | Result |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| S1/Adapter | 16 | 2 | 5 | 0 | 0 | 1 | 4 | PASS |
| S2/Adapter | 12 | 0 | 1 | 0 | 0 | 0 | 5 | PASS |
| S3/Adapter | 17 | 1 | 5 | 0 | 0 | 0 | 4 | PASS |
| X1/Adapter | 16 | 4 | 7 | 0 | 0 | 0 | 5 | PASS |

Open proposals (unapplied): investigate a less fragmented public response model for Sentinel and compare depth-1 versus depth-3 horizon effects on the same seeds. Baseline still trails always-BASH in S2; do not tune combat numbers or persona policy without a new Creative Director decision. Prior Adapter-strength proposal is unnecessary for the current fixed-seed ceiling, which now passes. No significance or human-play claims.
