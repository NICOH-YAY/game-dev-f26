# First-person rule and source map

Labels describe source evidence, not certainty about player experience. All numeric tuning is `assumed`, even when deterministic tests establish implementation behavior. See DESIGN.md for source links and distinctions.

| Rule | Evidence | Implementation / test |
|---|---|---|
| First-person stick/bend/fling pole climbing; one checkpoint reference | `observed`: Steam https://store.steampowered.com/app/5070190/Refund_This_Game/ and GamesRadar press (DESIGN.md), accessed 2026-10-25 | src/sim/index.ts:62, web/src/scene.ts, tests/sim.test.ts |
| 4.5m first-hit reach; .8s charge, toward-point bonus; free look; capped away/up/look launch; midair replant | `assumed`: original adaptation requested by Nicoh | src/sim/index.ts:4, :61, :62, :68; tests/sim.test.ts |
| Sphere radius .42; 120Hz gravity, sliding AABB collision, weak nudge; no fall damage | `assumed`: original physics tuning | src/sim/index.ts:68; tests/sim.test.ts |
| One 15.4m checkpoint; R/void respawn retaining time; bottom clears run; summit top wins | `assumed`: original course/outcome rules | src/sim/index.ts:32, :68; src/sim/tower.json; tests/sim.test.ts |
| 16 yaw / 8 pitch / 4 bend macros while standing/attached; local first-hit scans; invalid action unchanged | `assumed`: requested future AI boundary, instantaneous turn scan and stationary charge abstraction | src/sim/index.ts:139, :140, :146, :162; src/player_interface.ts:3; tests/sim.test.ts |
| Five original stages, catch shelves; checkpoint/summit reachable | `assumed` layout; `code` reachability evidence (not human evidence) | src/sim/tower.json; src/sim/search.ts:3; docs/SEARCH-ROUTES.json; tests/sim.test.ts |
