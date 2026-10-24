# Observed regressions

A genuine observed regression test is pinned in `node24-cli.test.ts`; see `../../docs/BUGLOG.md`.
It records an actual offline-launch failure encountered in development, not human play.
A game-rule regression will be pinned when a real game-rule bug is found. Do not fabricate one.
The golden snapshot is a determinism fixture, not an observed regression or human playtest.

The observed Adapter regression is pinned in `../agents.test.ts` (named `observed regression`); its failing result and fix are in BUGLOG.md.

Balance acceptance formerly in `balance.test.ts` now lives in `../../experiments/balance.mjs`, invoked by `npm run balance`. It runs the full matrix and writes explicit per-cell PASS/FAIL for the same criteria. Unmet design targets are reported separately from CI correctness. No rule, limit, leak, determinism or observed-regression tests were removed. S2 sparse-context evidence loss is pinned in `../agents.test.ts`; see BUGLOG for red-before-green evidence.
