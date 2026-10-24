## Current balance decision ? Nicoh, Creative Director, 2026-10-24

This decision replaces all earlier balance acceptance criteria and proposals below. Historical tables and observations remain evidence, not current requirements.

(a) In each DECLARED cell (S1/Aggressor, S2/Sentinel, S3/Opportunist, X1/Adapter), primary baseline wins must be >= every single-action bot's wins and > random wins.
(b) Against reactive Adapter, no single-action bot may win >50% in any situation.
Wins mean winner 0; draws are non-wins. Five single-action bots include STRIKE, BASH, GUARD, RECOVER and SIDESTEP, with their existing legal fallback.

Nicoh's rationale: the old universal "no single-action bot >50% vs any persona" criterion was too strict. Aggressor, Opportunist and Sentinel intentionally have exploitable, learnable habits; exploiting those habits is what the memory experiment measures. Ties against single-action bots are now allowed; strict superiority remains required against random. The comparison applies to the four declared cells, while Adapter's ceiling applies to all four situations. See [BALANCE-FINAL.md](BALANCE-FINAL.md) for current evidence. No combat numbers or persona policies changed in this pass.

## Historical run (preserved)

# Footing balance evidence ? 2026-10-24

Command: `npm run eval -- --trials 20 --out results/footing`. 2,560 episodes; 20 per cell. Entries are wins/draws/losses, paired seeds 2026102401..2026102420. D3=baseline; weighted differs only at judgment. All calls/costs zero.

| Situation/persona | baseline | baseline-depth1 | baseline-weighted | random | always-strike | always-bash | always-guard | strike-bash |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| S1/Aggressor | 19/0/1 | 16/2/2 | 19/0/1 | 4/0/16 | 16/2/2 | 1/1/18 | 0/0/20 | 7/7/6 |
| S1/Sentinel | 20/0/0 | 20/0/0 | 20/0/0 | 13/3/4 | 16/1/3 | 20/0/0 | 0/2/18 | 19/1/0 |
| S1/Opportunist | 18/1/1 | 20/0/0 | 18/1/1 | 6/1/13 | 20/0/0 | 14/1/5 | 0/0/20 | 19/1/0 |
| S1/Adapter | 20/0/0 | 18/2/0 | 20/0/0 | 3/0/17 | 19/1/0 | 8/0/12 | 0/0/20 | 19/0/1 |
| S2/Aggressor | 10/4/6 | 9/5/6 | 10/4/6 | 2/1/17 | 7/7/6 | 0/0/20 | 0/0/20 | 4/1/15 |
| S2/Sentinel | 18/2/0 | 18/2/0 | 18/2/0 | 8/3/9 | 11/2/7 | 18/0/2 | 0/0/20 | 13/4/3 |
| S2/Opportunist | 15/3/2 | 11/5/4 | 15/3/2 | 1/0/19 | 17/2/1 | 9/0/11 | 0/0/20 | 16/1/3 |
| S2/Adapter | 10/4/6 | 17/1/2 | 10/4/6 | 1/2/17 | 19/0/1 | 4/1/15 | 0/0/20 | 16/0/4 |
| S3/Aggressor | 19/0/1 | 16/2/2 | 19/0/1 | 4/0/16 | 16/2/2 | 1/1/18 | 0/0/20 | 7/7/6 |
| S3/Sentinel | 20/0/0 | 20/0/0 | 20/0/0 | 13/3/4 | 16/1/3 | 20/0/0 | 0/2/18 | 19/1/0 |
| S3/Opportunist | 18/1/1 | 20/0/0 | 18/1/1 | 6/1/13 | 20/0/0 | 14/1/5 | 0/0/20 | 19/1/0 |
| S3/Adapter | 20/0/0 | 18/2/0 | 20/0/0 | 3/0/17 | 19/1/0 | 8/0/12 | 0/0/20 | 19/0/1 |
| X1/Aggressor | 19/0/1 | 16/2/2 | 19/0/1 | 4/0/16 | 16/2/2 | 1/1/18 | 0/0/20 | 7/7/6 |
| X1/Sentinel | 20/0/0 | 20/0/0 | 20/0/0 | 13/3/4 | 16/1/3 | 20/0/0 | 0/2/18 | 19/1/0 |
| X1/Opportunist | 18/1/1 | 20/0/0 | 18/1/1 | 6/1/13 | 20/0/0 | 14/1/5 | 0/0/20 | 19/1/0 |
| X1/Adapter | 20/0/0 | 18/2/0 | 20/0/0 | 3/0/17 | 19/1/0 | 8/0/12 | 0/0/20 | 19/0/1 |

## Historical failures under superseded criteria

- S1/Aggressor: always-strike 16/20 exceeds 50%
- S1/Sentinel: baseline 20/20 does not exceed always-bash 20/20
- S1/Sentinel: always-strike 16/20 exceeds 50%
- S1/Sentinel: always-bash 20/20 exceeds 50%
- S1/Opportunist: baseline 18/20 does not exceed always-strike 20/20
- S1/Opportunist: always-strike 20/20 exceeds 50%
- S1/Opportunist: always-bash 14/20 exceeds 50%
- S1/Adapter: always-strike 19/20 exceeds 50%
- S2/Sentinel: baseline 18/20 does not exceed always-bash 18/20
- S2/Sentinel: always-strike 11/20 exceeds 50%
- S2/Sentinel: always-bash 18/20 exceeds 50%
- S2/Opportunist: baseline 15/20 does not exceed always-strike 17/20
- S2/Opportunist: always-strike 17/20 exceeds 50%
- S2/Adapter: baseline 10/20 does not exceed always-strike 19/20
- S2/Adapter: always-strike 19/20 exceeds 50%
- S3/Aggressor: always-strike 16/20 exceeds 50%
- S3/Sentinel: baseline 20/20 does not exceed always-bash 20/20
- S3/Sentinel: always-strike 16/20 exceeds 50%
- S3/Sentinel: always-bash 20/20 exceeds 50%
- S3/Opportunist: baseline 18/20 does not exceed always-strike 20/20
- S3/Opportunist: always-strike 20/20 exceeds 50%
- S3/Opportunist: always-bash 14/20 exceeds 50%
- S3/Adapter: always-strike 19/20 exceeds 50%
- X1/Aggressor: always-strike 16/20 exceeds 50%
- X1/Sentinel: baseline 20/20 does not exceed always-bash 20/20
- X1/Sentinel: always-strike 16/20 exceeds 50%
- X1/Sentinel: always-bash 20/20 exceeds 50%
- X1/Opportunist: baseline 18/20 does not exceed always-strike 20/20
- X1/Opportunist: always-strike 20/20 exceeds 50%
- X1/Opportunist: always-bash 14/20 exceeds 50%
- X1/Adapter: always-strike 19/20 exceeds 50%

## Historical proposed decision (superseded; not applied)
Smallest discrete damage change to test next: STRIKE damage 3 -> 2 (one point, retain all approved mechanics). Evidence: always-strike wins 16/20 in canonical S1, 20/20 against Opportunist, and still beats D3's 18/20 there. Reducing STRIKE directly reduces the observed raw damage advantage over BASH and increases relative wall-slam value. This is a hypothesis, not a verified fix; rerun the identical full suite after approval. No claim this single tweak will satisfy all strict comparisons, including ceiling ties. Alternative stamina/persona tuning requires a separate explicit design decision.
