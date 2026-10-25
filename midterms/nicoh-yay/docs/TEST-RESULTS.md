# Verification: first-person rebuild, 2026-10-25

- Test-first run before replacing engine: 6 failures / 1 pass. Missing first-person state/functions caused the failures; the old determinism test already passed.
- Final `npm test`: 15 deterministic Vitest tests (see final run output). Includes SHA-256 repeated input trace, floor/wall impulse equation and cap, charge/midair plant, floor/wall/ceiling sliding contacts, void/checkpoint/bottom/goal, nudge limit, invalid action no-op, copied observations/local legal rays, malformed course and replayed search routes.
- `npm run typecheck`: pass.
- `npm run web:build`: pass. Vite warns about a ~619kB Three.js bundle; it is a performance warning, not a failed build.
- Beam width 60, at most 12 checkpoint / 24 summit layers. Checkpoint: 47,000 expanded actions, 5 vaults. Summit: 125,436 expanded actions, 11 vaults. Routes were replayed legally through the exact integrator. Actions, final states and SHA-256 hashes are in SEARCH-ROUTES.json. No full-map data is passed to the player interface.
- Browser visual/input verification: unavailable. CUA reports no browsers/apps. No claim of verified pointer lock, rendering quality, sound or human enjoyment.
- Required root `python -m unittest discover -s tests -v`: 36 tests, 4 errors. test_diagnose/test_providers cannot import anthropic; two minigame symlink tests fail with Windows privilege error 1314. These concern the existing root environment; no Python code changed.
- Required root `python -m course_game.setup_check --offline --headless`: SETUP INCOMPLETE. Python/Git/scripted fixture pass; GitHub authentication, Pyxel and deterministic root tests fail. The fixture was explicitly reported as fixture, with no live provider call; no live evaluation is claimed.

No commit, push, model call, new asset download or gate approval. Title art and retained asset files were not changed. Claude independent review and Nicoh playtesting remain TODO.
