# Trial by Combat rule/source map

All rows carry `design`; this is an original game, not evidence from a classic.
Locators name headings and exported symbols so line shifts do not invalidate them.

| Rule | Evidence and design locator | Implementation | Tests |
|---|---|---|---|
| HEARING ? DUEL ? JUDGMENT ? EPILOGUE; acknowledgment advances hearing | design: DESIGN.md, Loop | src/game.ts: step | tests/game.test.ts |
| HP 12, stamina 3, cap 3, 18 exchanges; S2 handicap default 9 HP | design: DESIGN.md, Combat / Declared suite; numeric handicap unspecified, proposed default | src/sim/rules.ts; src/game.ts: reset | tests/game.test.ts |
| All 25 simultaneous payoffs, resource bounds, zero stamina restriction | design: DESIGN.md, Combat | src/sim/rules.ts: resolvePair | tests/game.test.ts |
| KO, double KO, time up, draw | design: DESIGN.md, Combat | src/game.ts: resolve | tests/game.test.ts |
| Only own resources determine legal actions; illegal requests leave state unchanged | design: DESIGN.md, Information boundary | src/game.ts: observe, legalActions, step | tests/game.test.ts |
| Five-action noisy tells (approved 2026-10-24) | design: DESIGN.md, Combat; opponent commits first; pending tell before player choice (design decision, review finding 1) | src/sim/rules.ts: TELL_TABLE; src/game.ts: step, observe | tests/tells.test.ts |
| Two testimony cards, published reliability, exact posterior | design: DESIGN.md, Loop / Players; proposed table in IMPLEMENTATION.md | src/sim/evidence.ts | tests/game.test.ts |
| Release/detain; winner binding; loss/draw counsel and court DETAIN; ledger only outcome | design: DESIGN.md, Judgment stakes | src/game.ts: judgment | tests/game.test.ts |
| Separate testimony, tells, persona streams; deterministic serializable state | design: DESIGN.md, Combat / Players | src/sim/random.ts | tests/game.test.ts |
| Timeout 20s, reask once, cap 30, GUARD/abstain fallbacks, third fallback forfeits | design: DESIGN.md, Runner limits | src/runner/episode.ts | tests/runner.test.ts |
| Floors, expectimax depth 3 with pooled global-plus-local habit prior, pending-tell Bayes and time-up leaves, posterior and weighted judgments, four personas | design: DESIGN.md, Players | src/agents/index.ts | tests/agents.test.ts |
| S1/S2/S3/X1 situations and held-out Adapter | design: DESIGN.md, Declared suite; seeds proposed in IMPLEMENTATION.md | experiments/suite.json | tests/runner.test.ts |

| Parry drains extra stamina; SIDESTEP costs 1, evades attacks and overextends STRIKE | design: Nicoh approval 2026-10-24; discourage always-strike | src/sim/rules.ts: resolvePair, combatLegal | tests/footing.test.ts |
| Clash point 0..6 starts 3; damaging strikes and unbeaten bashes push; trades cancel; corner bash +1 and recover +1 only | design: Nicoh approval 2026-10-24; spatial choreography and corner escape | src/sim/rules.ts: resolvePair; src/game.ts: observe | tests/footing.test.ts |
| Public footing, corner flags, witness reliabilities; S1 mild accusations versus X1 high reliability conflict | design: Nicoh approval 2026-10-24; distinct evidence and public spatial decisions | src/game.ts; src/sim/evidence.ts | tests/footing.test.ts |

| Player prompt describes approved combat and pending tells | design: DESIGN.md Combat; avoid stale instructions to player controllers | src/runner/prompt.ts | tests/footing.test.ts |

| Reactive personas remember only resolved champion actions (windows 3/6), public HP/footing and own resources | design: Nicoh approval 2026-10-24; learnable habits counter repetition without hidden information | src/agents/index.ts: PersonaController | tests/personas.test.ts |
| Distinct situation duel ranges; separate testimony seed stream | design: Nicoh approval 2026-10-24; avoid duplicate duels across situations while pairing arms | experiments/suite.json; src/runner/cli.ts; src/game.ts: reset | tests/personas.test.ts |

| GUARD blocking STRIKE deals 1 riposte damage to striker in addition to existing parry stamina loss; no riposte push | design: Nicoh, Creative Director, 2026-10-24; make successful defense punish repeated strikes without changing other numbers | src/sim/rules.ts: resolvePair | tests/footing.test.ts; tests/game.test.ts |
