# Implementation handoff ? independent review pending

2026-10-24, Codex implementation session. This document hands work to an independent reviewer in a **different session**. It is not a review or approval. Nicoh owns gates and merge decisions. Follow the root `.claude/agents/rules-reviewer.md` read-only review protocol, adapting Python starter symbols to this TypeScript game.

Rules and reports now mapped as `design`: R19 final-only X2, R20 posterior/provenance reporting, R21 validated runtime config; the rest of the normalized map identifies spec headings, rejected alternatives, symbols and exact tests. See docs/DESIGN.md and docs/DECISIONS.md. Legacy combat and persona policies are unchanged.

Test-first evidence:

- tests/audit.test.ts, posterior group regression: 1/4 and 3/4 previously printed 1/4; expected `0.500000 [1/4, 3/4]` failed before implementation. Now reports mean, fractions and missing count.
- tests/personas.test.ts, Mimic repeat mixture: before implementation RECOVER fraction .0935, expected >.69; now passes the synthetic .70 mixture range test. Existing poison-field/determinism tests extended to Mimic; unaffordable copies remain legal.
- tests/audit.test.ts, runtime validation: failed on missing config module; now loads JSON and rejects invalid history/timeout values. Runner/prompt/Vertex adapter consume those values; explicit episode cap/timeout options remain test overrides.
- The mixed-reliability evidence assertion was added after the small evidence selector extension; do not claim that assertion was red first. It checks synthetic seed 42, not an X2 episode. The old suite identity assertion failed after preregistration and was extended to the new entry.

Boundary: no observe/legalActions/private-state exposure changes. Mimic reads previous resolved actions and the same public Sentinel inputs; no hidden actions, guilt or persona-oracle access. No X2 episodes or reserved seeds executed. CLI has hard exclusion of X2/final_only; matrix completeness remains 3,520. Review final-only integrity scan, suite seeds, policy first-exchange/fallback semantics, .55 meaning of unreliable, and the absence of any development bypass. Final evaluation requires a separately reviewed runner change under Nicoh's instruction.

Report provenance records base HEAD, dirty status, suite/config hashes, tracked source patch hash, and per-file manifest including untracked source/test/experiment files. Inspect the latest EVALUATION.md links and results/provenance.json. Historical directories explicitly say when SHA is unrecorded; no exact provenance was invented. Root stale summary/comparison/traces were preserved under results/historical-root-20261024 before current canonical summaries were refreshed.

Validation: npm test 84 PASS; typecheck PASS; matrix execution PASS; criterion (a) FAIL in S2/Sentinel, criterion (b) PASS. No tuning or gate approval. See docs/TEST-RESULTS.md, docs/BUGLOG.md and latest balance report. All changes remain inside midterms/nicoh-yay; no commits, pushes or model calls.

Pending: independent review; hosted CI after push; Nicoh's AGENT-TEAM narrative and LIMITATIONS; live trials/prices, recording and peer play. The revised course brief URL and exact quote were not supplied or found in the checkout; README attributes the original-games correction to Nicoh and explicitly leaves source quote/link TODO rather than invent them.
