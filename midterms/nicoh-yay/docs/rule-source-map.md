# Small Change: rule and source map

| Rule | Evidence | Implementation | Verification |
|---|---|---|---|
| Melanie’s coffee work and Laura/custody pressure inform the premise | **code**: Hofmeier, `cartlife/GlobalScript.asc` 599–644, 1655, 2552–2582, 2728–2737, 2945–2949; see SOURCE-EVIDENCE.txt | src/dilemmas.ts:104 and docs/DESIGN.md | Provenance inspection; no original rule parity claimed |
| Endless morning, three cart interruptions over 105 seconds, evening, journal; chapter every fifth day | **design**: Nicoh brief | src/sim.ts:195, src/sim.ts:207 | tests/integration.test.ts; tests/web.test.ts |
| Hidden money/Laura/fatigue/normalization/trust/rival state, bounded relationships, choice ledger, no terminal score | **design**: Nicoh brief | src/sim.ts:38, src/sim.ts:207, src/sim.ts:285 | tests/small-change.test.ts; tests/integration.test.ts |
| Recurring compromises unlock later normalized wording, no same-chain repetition within a day; callbacks after two days | **design**: Nicoh brief | src/dilemmas.ts:104; src/sim.ts:75 | tests/small-change.test.ts escalation and callbacks; tests/integration.test.ts day cycle |
| State-dependent Laura line, drawing, palette and chapter | **design**: Nicoh brief | src/sim.ts:113, src/sim.ts:120 | tests/small-change.test.ts chapter; tests/integration.test.ts observation |
| Seeded recipes, waiting customers, trust/patience tips, occasional fatigue key swap, mistakes consume time | **design**: Nicoh brief; coffee activity inspired by code above, exact mechanics new | src/coffee.ts:1, src/coffee.ts:83, src/coffee.ts:130, src/coffee.ts:150 | tests/small-change.test.ts seeded service; tests/integration.test.ts trust/fatigue; tests/web.test.ts controls |
| Only observable facts and legal option ids go to a player; refused action leaves all state unchanged | **design**: repository boundary and Nicoh brief | src/sim.ts:120, src/sim.ts:195, src/player_interface.ts:1 | tests/small-change.test.ts observation copy and illegal actions; tests/integration.test.ts no hidden numbers |
| Browser saves are guarded, validated on load; New life replaces only this local save | **design**: Nicoh brief | src/sim.ts:289; web/src/main.ts | tests/integration.test.ts malformed save; tests/web.test.ts reset/save |
| Dilemmas can be extended through validated data | **design**: Nicoh brief | src/dilemmas.ts:2274; docs/DILEMMAS.md | tests/small-change.test.ts; tests/integration.test.ts rejects invalid references |

| Stock/till acceptance-only steps; chain-local ordering and euphemisms; paired delivery fatigue framing; visible pickup helping time; hidden-state Laura growth; all cards carry foundations and callbacks | **assumed**: second-pass authored brief; research citations unverified, fatigue flavor only | src/dilemmas.ts:104; src/sim.ts:77, 115, 121, 124 | tests/research.test.ts |

No **observed** claim is made for human play. All automated test traces are implementation evidence, not peer experience evidence. Numeric authoring deltas and overnight expense amounts are provisional design tuning; the game does not display them.

