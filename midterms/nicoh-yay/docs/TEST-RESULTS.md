# Verification — October 26, 2026

- Node/npm clean install: `npm ci` passed (43 packages). This Windows shell requires `npm.cmd`, equivalent to npm in CI. An initial repeat install hit an esbuild executable lock from our local Vite process; stopping that process and rerunning the clean install resolved it.
- `npm test`: 3 files, **15 tests passed**. Includes a happy-dom full-day input/pause/service/journal/save/reset trace; this is not a browser screenshot or human playtest.
- `npm run typecheck`: passed.
- `npm run web:build`: passed, `base './'`, static `web/dist`. Approximately 34 kB JavaScript and 11 kB CSS before gzip, plus the retained 24 kB local font and license files. No runtime dependencies, WebGL or 3D assets. No external font or model calls.
- CI file `.github/workflows/midterm-nicoh-yay.yml`: unchanged. Its existing display title still says Vaulting Ambition; filename, npm ci/test/typecheck steps and project directory were preserved as requested.
- Browser visual verification: unavailable (computer/browser inventory had no browsers). **TODO:** desktop/mobile screenshot inspection, sound listening, actual device responsiveness, human dilemma playtest, and independent Claude review.
- `python -m unittest discover -s tests -v` at repository root: 36 tests attempted, 4 errors. `test_diagnose` and `test_providers` cannot import the uninstalled `anthropic` module; two minigame tooling tests require Windows symlink privileges (WinError 1314). These are unrelated to the isolated TypeScript game.
- `python -m course_game.setup_check --offline --headless`: setup incomplete. Python and Git pass; GitHub CLI authentication, Pyxel engine, and the root deterministic tests fail. The scripted fixture check passes, explicitly offline and not a live provider evaluation. No cloud credits spent.

The contract file’s initial preimplementation run failed importing the absent simulation module. See REVIEW-HANDOFF for the exact limitation of that red-before-green evidence. No human play or model evaluation results are fabricated.


## Second pass, October 26

- npm test (via npm.cmd): **24 tests passed, 4 files**.
- npm run typecheck: passed.
- npm run web:build: passed, static relative-base build.
- All 40 cards selected through actual phase transitions in deterministic witness states; every authored option callback schedules and delivers its referenced text. Acceptance/refusal chains, local drift, paired delivery framing, medicine eligibility, visible pickup time and warm/distant Laura selection tested.
- DOM assertions cover supplied title/street/portrait paths, fallback on missing image, and portrait load/error handling. No browser layout inspection or human playtest is claimed.
- No model calls, credits, commits or pushes. Earlier root Python diagnostics above were not repeated in this folder-restricted pass.
