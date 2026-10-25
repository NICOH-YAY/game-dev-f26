# Claude review handoff: first-person Vaulting Ambition

Independent review is requested from Claude after implementation. This document is an implementation summary, not a review or gate approval. Nicoh retains all producer/director decisions. No model call was used to obtain review.

## Rules and evidence

`observed`: Steam/press establish Refund This Game's first-person pole stick/bend/fling climbing and one checkpoint. See DESIGN.md for direct links and scope. `observed`, reported by Nicoh: rejection of the previous side-view aiming. `assumed`: our impulse formula, 4.5m reach, .8s bend, 120Hz sphere collision, original 33m box course with checkpoint at 15.4m, weak nudge, local scan action interface, win/respawn rules and feedback tuning. No commercial code/assets reused. The scoped rule-source-map.md gives implementation symbols and lines.

## Test-first evidence

Before changing the engine, wrote the scoped map plus seven first-person tests and ran npm.cmd test: six failed against the 2D API/state, one old determinism property passed. Replaced the sim and rendering, then expanded to 15 tests for exact floor/wall launch math, collision/slide/underside, midair replant, charge direction, checkpoint/void/goal, malformed actions/course and player copies. Additional tests added during implementation are not claimed to have failed before it.

The bounded beam search reaches the checkpoint in five vaults and the summit in eleven, replaying only listed legal actions. SEARCH-ROUTES.json retains the actual actions/hashes. This establishes discrete course reachability; it is not human experience evidence, a player-model evaluation or a gate decision.

## Boundary effects

The state-owning player adapter still exposes only reset/observe/legal_actions/step/outcome. Observations now contain copied 3D state and 128 local nearest-hit rays; actions are 16 yaw x 8 pitch x 4 bend. Instant turning/scanning in all candidate directions is an explicit abstraction: no full map, box IDs or occluded surface information is returned. Invalid action returns the original state and advances no time. Sim/search is development-only and absent from web/player imports.

Review the macro abstraction carefully: charge time is stationary setup time (including when attached in air); launch and flight use the same forward model/integrator, while continuous human input has free look and midair replant. Human and discrete input streams are not asserted to be identical.

## Assumptions and limits

Feel is not playtested. Pointer lock, reach dot appearance, pole bend readability, synthetic sound, FOV/shake and post effect need a desktop check: CUA had no browser surface. The camera uses sphere-center height rather than a full-height capsule. Holding is not a rigid tether and detaches outside reach+.5m. Aiming directly into an underside pushes downward as the away formula dictates. Checkpoint needs top contact; crown win uses summit top contact rather than decorative crown-mesh collision. The course may permit shortcuts; deterministic search proves existence, not difficulty or enjoyment.

Root Python/setup checks are environment-blocked; details are in TEST-RESULTS.md. Requested npm tests/typecheck/build pass; bundle-size warning remains. Title art is unchanged, original provenance not supplied. No commits, pushes or model calls.

Review files: src/sim/{index.ts,level.ts,tower.json,search.ts}, src/player_interface.ts (unchanged closure adapter), tests/sim.test.ts, web/src/{main.ts,scene.ts,style.css}, web/index.html, vitest.config.ts, README.md, CREDITS.md and docs/{DESIGN.md,rule-source-map.md,SEARCH-ROUTES.json,TEST-RESULTS.md}.
