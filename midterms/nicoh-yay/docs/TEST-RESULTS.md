# Observed local verification ? 2026-10-25
Environment: Windows, Node v24.18.1. Commands ran in `midterms/nicoh-yay/`. No network inside tests, no model/provider calls.

`npm ci --cache .npm-cache`: success. `npm test`: 12 passed. `npm run typecheck`: success. `npm run web:build`: success, with Vite's >500kB bundle-size warning.

## Exact search replay
Development-only breadth-first search over all 32 angle/power choices from the start, pruning landed x to .2m. It found a route after 397 expanded states. Replay through the real sim returned `won`, 12 vaults, 1 fall, simulation time 17.591666666666665 seconds, feet height 36.449191384295204m. Courtyard, Battlements and Belfry crossed.

Action pairs `(angleIndex, powerIndex)` in order:
```
(3,1) (4,1) (3,1) (4,1) (3,1) (4,3)
(2,1) (5,1) (2,1) (5,1) (2,1) (4,1)
```
Indices map to angles `[25,43,61,79,101,119,137,155]` and powers `[.4,.6,.8,1]`. Each step includes the complete run-up and flight until landing or victory. This is deterministic software evidence, not an observed human run, speed record or difficulty assessment.

HTTP smoke check: dev server returned 200 for the entry page, both web modules, Knight.glb, tower-square.glb, castle texture, and pixel font. This verifies serving, not rendered appearance or input behavior. Final Git path audit found no changes outside the authorized project folder and named workflow.

## Unperformed
Browser automation: unavailable (empty browser/app inventory). Human playtesting, artistic review, and Claude independent review: TODO. No live AI evaluation was requested or run.
