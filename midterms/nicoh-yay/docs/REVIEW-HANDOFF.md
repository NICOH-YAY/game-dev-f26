# Claude review handoff ? Vaulting Ambition
Implementation complete for review; independent review and Nicoh's gate decision remain pending. No commits, pushes, runtime model calls, or human playtests performed.

## Rules and evidence
All new mechanics carry `design` evidence from Nicoh's Vaulting Ambition replacement request dated 2026-10-25. See `rule-source-map.md` and `DESIGN.md`. The custom 120 Hz sim owns physics, run-up, snapping, collision, landing, falling, and crown outcomes. The web controls only aim and charge before committing. Old source/tests/docs/results and unused art/models were removed as authorized; prior game remains on the branch Nicoh identified. Only this project folder and the existing named CI workflow were edited.

## Test-first trace and implementation
The rule map and acceptance suite were written before the simulator. The first runnable test command (`npm.cmd test`) failed at suite import: missing `../src/sim/index.js`. This demonstrates absent implementation, not a behavior-level red test for every individual rule; that limitation is explicit. Subsequent failures exposed a wall fixture that did not actually reach the wall in one tick, a long-fall fixture that landed after only 2m, and an overly narrow TypeScript test variable. These fixtures/type annotation were corrected to describe their stated scenarios; no gameplay constants were tuned to force the search to pass.

`src/sim/index.ts` implements reset/tick/launch/predictVault/observe/legal_actions/step/outcome. `src/sim/level.ts` validates and parses `tower.json`. `src/sim/search.ts` is an offline development search using all 32 actions. `src/player_interface.ts` owns state in a closure for the future player controller. `web/src/scene.ts` and `main.ts` implement rendering, input, title/victory and feedback.

## Boundary effects
Observations copy only nearby geometry (14 vertical metres), position/velocity/counters, current section, nearby crown and public actions. A refused action throws without replacing or mutating authoritative state. Tests mutate returned observations and add unseen geometry to establish copying and local non-interference. Player interface exposes no raw state, level object, files, credentials, or model client. Development search deliberately knows the full authored map and must stay separate from a future agent observation/action interface. Discrete step resolves a whole vault; web presentation advances the identical fixed ticks. No trajectory is drawn in the player UI.

## Observed verification
- `npm.cmd ci --cache .npm-cache`: success; 45 packages installed, 46 audited, zero audit vulnerabilities at execution. npm reported an allow-scripts notice for esbuild; the subsequent build succeeded without changing approval settings.
- `npm.cmd test`: 12 passing tests, including SHA-256 trajectory equality, predictor parity, top landing, side bounce, snap threshold, run-up commitment, rejected actions, copied observation, long fall/catch, parser rejection and crown reachability.
- `npm.cmd run typecheck`: success.
- `npm.cmd run web:build`: success. Vite warns that the Three.js bundle exceeds 500 kB (about 617 kB raw / 159 kB gzip); no build failure.
- Full-map bounded BFS explores 397 states before finding a 12-vault route. Exact replay wins at feet height 36.449191384295204m, simulation time 17.591666666666665s, 1 counted fall. All three sections are crossed. Details in TEST-RESULTS.md.

## Assumptions and limitations
- Run-up is constrained to the current support so planting remains grounded. Vault launch direction is above the horizon; the visual lance points toward the plant below it. Width/height colliders are intentionally simple boxes.
- A fall is one >3m descent from a flight apex. Crown contact uses proximity, including in flight. Missing the entire courtyard invokes the below ?8m rescue described in DESIGN.
- Embedded Idle clip is used; run/vault/landing/snap use procedural motion. Decorative Kenney towers are not colliders.
- Best height persists in try/catch-protected localStorage. Timer uses active fixed-step simulation time; hidden tabs pause.
- Optional title art is absent. Claude can add `web/public/art/title.png` and its provenance/credit.
- Browser visual/input verification could not run: computer-use reported iab unavailable and zero apps/browsers in inventory. WebGL2 rendering, screen composition, input feel, R confirmation, localStorage behavior and win screen need a real browser check. No screenshot or human playtest evidence is claimed.
- Search uses .2m landed-position pruning and a 30,000-expansion cap. Success with exact replay proves this tower completable; it is not a proof of exhaustive state-space coverage or human enjoyment.
- The previous combat balance skill/matrix was read but not executed: Nicoh replaced that game. The requested tower search supplies the new prototype evidence. No X2 runs or fabricated combat evidence.

Suggested review: verify collision edge behavior and parser assumptions first, then manually climb/restart/win in the browser, inspect art placement and assess recovery ledges with Nicoh. Human experience evidence remains TODO.
