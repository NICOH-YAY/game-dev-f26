## Riposte + pooled learning matrix (2026-10-24T22-02-58-509Z)

Current evidence supersedes historical verdicts above. 3,520 episodes: 11 controllers x 4 personas x 4 situations x 20 paired trials, frozen suite seeds; fresh controllers. Draws are non-wins. Zero model calls. Execution PASS; design target (a) FAIL, (b) PASS. Unmet targets remain visible and are not CI correctness gates.

Raw evidence: [summary](./summary.jsonl), [comparison](./comparison.md), adjacent traces.

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
