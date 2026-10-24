# Offline renderer samples

Regenerated on 2026-10-24 with `npm run build` and
`node web/tools/capture-demo.mjs`. These are presentation fixtures, not updated
matrix evaluation evidence or human playtests. No model calls or X2 cases.

The four baseline samples use current depth-3 Expectimax, the named scenario
and persona, first declared duel seed, and the suite testimony seed base.
X1 was already observed during tuning and is not clean held-out evidence.
`renderer-demo.jsonl` uses seed 42, AlwaysStrike vs Sentinel, default evidence;
`web/public/traces/sample.jsonl` is an identical copy.

Each runner row includes player-0 `observation` before the attempt, `after`
following its engine transition, and allowlisted `terminal` status/reason/
winner/judgment. `after.previous` is the resolved own/opponent action pair;
HP, footing (`position`) and corner flags are engine facts. Failed/reasked
attempts have unchanged after-state. Opponent commits do not resolve damage.
No private State, exact opponent stamina, guilt, persona ID or RNG is serialized.
The legacy actor-relative observation hash is retained for compatibility.
Old action-only JSONL still loads with explicit unknown values.
