## Current balance decision ? Nicoh, Creative Director, 2026-10-24

This decision replaces all earlier balance acceptance criteria and proposals below. Historical tables and observations remain evidence, not current requirements.

(a) In each DECLARED cell (S1/Aggressor, S2/Sentinel, S3/Opportunist, X1/Adapter), primary baseline wins must be >= every single-action bot's wins and > random wins.
(b) Against reactive Adapter, no single-action bot may win >50% in any situation.
Wins mean winner 0; draws are non-wins. Five single-action bots include STRIKE, BASH, GUARD, RECOVER and SIDESTEP, with their existing legal fallback.

Nicoh's rationale: the old universal "no single-action bot >50% vs any persona" criterion was too strict. Aggressor, Opportunist and Sentinel intentionally have exploitable, learnable habits; exploiting those habits is what the memory experiment measures. Ties against single-action bots are now allowed; strict superiority remains required against random. The comparison applies to the four declared cells, while Adapter's ceiling applies to all four situations. See [BALANCE-FINAL.md](BALANCE-FINAL.md) for current evidence. No combat numbers or persona policies changed in this pass.

## Historical run (preserved)

# Reactive persona balance, 2026-10-24

3200 offline episodes: 10 controllers x 4 personas x 4 situations x 20. Cells are wins/20; draws count as non-wins. No model calls. Raw W/D/L and other metrics: [comparison](../results/reactive-20261024/comparison.md).

| Situation/persona | baseline | baseline-depth1 | baseline-weighted | random | always-strike | always-bash | always-guard | always-recover | always-sidestep | strike-bash |
|---|---|---|---|---|---|---|---|---|---|---|
| S1/Aggressor | 19 | 18 | 19 | 4 | 19 | 0 | 0 | 0 | 0 | 5 |
| S1/Sentinel | 15 | 14 | 15 | 12 | 10 | 20 | 0 | 0 | 0 | 18 |
| S1/Opportunist | 17 | 18 | 17 | 4 | 20 | 13 | 0 | 0 | 0 | 19 |
| S1/Adapter | 18 | 18 | 18 | 4 | 14 | 4 | 0 | 0 | 0 | 14 |
| S2/Aggressor | 9 | 12 | 9 | 3 | 10 | 0 | 0 | 0 | 0 | 4 |
| S2/Sentinel | 12 | 11 | 12 | 7 | 9 | 20 | 0 | 0 | 0 | 10 |
| S2/Opportunist | 15 | 11 | 15 | 3 | 18 | 7 | 0 | 0 | 0 | 16 |
| S2/Adapter | 10 | 14 | 10 | 5 | 8 | 1 | 0 | 0 | 0 | 9 |
| S3/Aggressor | 17 | 19 | 17 | 5 | 18 | 1 | 0 | 0 | 0 | 9 |
| S3/Sentinel | 15 | 15 | 15 | 14 | 6 | 19 | 0 | 0 | 0 | 19 |
| S3/Opportunist | 17 | 18 | 17 | 4 | 20 | 11 | 0 | 0 | 0 | 19 |
| S3/Adapter | 16 | 18 | 16 | 5 | 13 | 3 | 0 | 0 | 0 | 15 |
| X1/Aggressor | 17 | 18 | 17 | 5 | 18 | 2 | 0 | 0 | 0 | 11 |
| X1/Sentinel | 18 | 15 | 18 | 10 | 9 | 20 | 0 | 0 | 0 | 19 |
| X1/Opportunist | 19 | 20 | 19 | 4 | 20 | 16 | 0 | 0 | 0 | 20 |
| X1/Adapter | 20 | 17 | 20 | 6 | 15 | 4 | 0 | 0 | 0 | 18 |

## Historical failures under superseded criteria

Depth-3 must strictly exceed random and each single-action floor in every cell. Failures:

- S1/Aggressor: baseline 19/20 vs always-strike 19/20
- S1/Sentinel: baseline 15/20 vs always-bash 20/20
- S1/Opportunist: baseline 17/20 vs always-strike 20/20
- S2/Aggressor: baseline 9/20 vs always-strike 10/20
- S2/Sentinel: baseline 12/20 vs always-bash 20/20
- S2/Opportunist: baseline 15/20 vs always-strike 18/20
- S3/Aggressor: baseline 17/20 vs always-strike 18/20
- S3/Sentinel: baseline 15/20 vs always-bash 19/20
- S3/Opportunist: baseline 17/20 vs always-strike 20/20
- X1/Aggressor: baseline 17/20 vs always-strike 18/20
- X1/Sentinel: baseline 18/20 vs always-bash 20/20
- X1/Opportunist: baseline 19/20 vs always-strike 20/20

Single-action wins >50%:

- S1/Aggressor: always-strike 19/20
- S1/Sentinel: always-bash 20/20
- S1/Opportunist: always-strike 20/20
- S1/Opportunist: always-bash 13/20
- S1/Adapter: always-strike 14/20
- S2/Sentinel: always-bash 20/20
- S2/Opportunist: always-strike 18/20
- S3/Aggressor: always-strike 18/20
- S3/Sentinel: always-bash 19/20
- S3/Opportunist: always-strike 20/20
- S3/Opportunist: always-bash 11/20
- S3/Adapter: always-strike 13/20
- X1/Aggressor: always-strike 18/20
- X1/Sentinel: always-bash 20/20
- X1/Opportunist: always-strike 20/20
- X1/Opportunist: always-bash 16/20
- X1/Adapter: always-strike 15/20

## Historical proposal (superseded; not authorized)

The unchanged canonical always-strike regression fails at 19/20 (target <=10). Do not claim completion of the balance target. Smallest next proposal: authorize a separate Aggressor-only policy experiment that prefers GUARD after two of the last three champion STRIKEs, temporarily overriding its alternating/BASH habit. This directly addresses the canonical failure without changing combat numbers. Re-run the entire matrix before accepting it; it is not proven to fix other cells. No additional policy or numeric tuning was applied after seeing this evaluation.

Independent review handoff: rules are design evidence from Nicoh approval; tests/personas.test.ts failed before implementation for Sentinel reactivity, Adapter modal response and missing seed ranges. Persona-side poison-field test passed before and after, preserving the boundary. Existing illegal-action and early-commit tests remain unchanged. Assumptions: window sizes 3/6, probabilities/priority/tie order above, and 1000-trial range cap. Review/gate approval remains external.
