# Vaulting Ambition rule map
All rows are `design`: Nicoh?s Vaulting Ambition request, 2026-10-25. No historical game code is reused.

| Rule | Evidence / rationale | Implementation | Test |
|---|---|---|---|
| Fixed-step ballistics, run-up, top landing, damped wall bounce | design: Physics; deterministic plane instead of a physics library | src/sim/index.ts: tick | tests/sim.test.ts: determinism, landing, wall |
| Angle + power; no air control; high-power shallow snap | design: Mechanic; timing instead of steering in flight | src/sim/index.ts: launch | tests/sim.test.ts: snap, refusal |
| 8 angles x 4 powers, standing only; copied local observation | design: Physics/interface; finite search space instead of model-owned state | src/sim/index.ts: legal_actions, observe, step | tests/sim.test.ts: interface |
| Parsed three-section tower, catch ledges, crown victory | design: World/Win; authored chunks before seeded generation | src/sim/level.ts; src/sim/search.ts | tests/sim.test.ts: parser, reachability |
| Forward model equals runtime ticks | design: Physics; shared code instead of an approximate predictor | src/sim/index.ts: predictVault | tests/sim.test.ts: prediction |
