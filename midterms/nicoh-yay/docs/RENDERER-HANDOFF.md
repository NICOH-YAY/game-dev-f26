# Browser renderer · implementation handoff (2026-10-24)

Implemented at Nicoh's request; Claude's independent review remains pending.
No engine/rule/controller changes, commits, pushes, live calls, X2 episodes or
human-playtest claims. All new/modified files are within this game folder.

## Run

From `midterms/nicoh-yay`: `npm ci --cache .npm-cache`, `npm run web`.
Open the local URL printed by Vite. Enter starts human play; select the persona
before choosing New human game. Keys **1 Strike / 2 Bash / 3 Guard / 4 Recover /
5 Sidestep**, then Enter. Hearing continues with Enter; judgment uses explicit
Release/Detain buttons. Stamina legal actions are supplied by Game.

Choose Sample replay or load a JSONL file. `?trace=<URL>` loads a trace by URL
(same-origin or CORS-enabled). Play/Pause, Step, and 0.5–4× playback speed control
recorded actions. Recorded latency precedes the action; the chip shows original
latency, with playback speed scaling elapsed time. No model is contacted.
`npm run web:build` emits static files to gitignored `web/dist/`; serve that
folder over HTTP. Assets and the default trace are bundled, with no CDN calls.

## Structure and boundaries

- `web/src/arena.ts`: Three scene, GLB loaders/mixers, pixel pass, particles,
  positional interpolation, camera and dusk lighting. Receives presentation
  observations/cues, imports game types only.
- `web/src/mapping.ts`: pure action/clip, recorded damage/cue, lane and badge
  mapping. No resolution, legal-action, AI-policy or hidden-state code.
- `web/src/session.ts`: isolated browser runner using existing Game and existing
  PersonaController. Opponent receives only `observe(1)` and legal actions;
  it commits before player 0 sees the tell. The UI gets `observe(0)`, legal
  actions, step acceptance and `outcome()`; it never reads `Game.state`.
- `web/src/main.ts`, `style.css`, `env.d.ts`, `web/index.html`: scene flow, DOM HUD,
  input, replay clock, pixel font and title background.
- `web/tools/capture-demo.mjs`: reproducible offline presentation fixture capture.
- `tests/web.test.ts`: pure mapping tests, missing-data and validation tests.
- Package manifest/lockfile: exact Three, Vite and Three types versions;
  tsconfig includes web; `.gitignore` excludes static output.
- `CREDITS.md`, `results/samples/README.md`, `docs/SKILL-INVOCATIONS.md`:
  provenance and applicability record. No rule/balance skill was invoked.

## Trace format and honesty

Existing historical action-only traces load unchanged, including null parsed
replies and invalid rows. Invalid actions do not animate. Hashes cannot recover
observations: absent HP, stamina, testimony, footing, tell, authority, guilt and
ledger stay unknown. Exchange counts are unknown without observations.
`source=controller` is labeled baseline, never model; fallback sources get their
own badge, unknown sources remain unknown. `intent` or `parsed.intent` is shown
as escaped text; `latency_ms` is a recorded pause, never simulated model activity.

The default fixture is copied from `results/samples/renderer-demo.jsonl`.
Optional fields: `observation` (or `obs`) is **player-0's pre-action Observation**,
`after` is player-0's post-action Observation; terminal `outcome` is the Game
public terminal outcome. A paired exchange uses player 0's latest pre-action
observation, so its tell appears before action animation. No private state is
serialized. Optional `effects` strings such as `parry`/`riposte` provide explicit
presentation cues. Live visual counter sparks use recorded damage while a
knight guards; they do not calculate combat results. Wall dust marks observed
damage at an edge, without claiming a separate engine event.

## Assets and validation

KayKit Knight/Barbarian GLBs with embedded animation clips; Kenney Castle Kit
tower/banner; Kenney Mini Square font. CC0 license texts read and vendored;
exact source URLs/files in CREDITS. Key art copied unchanged. Total assets <15 MB.
No procedural character fallback was needed. The separate Rig_Medium download
was not obtained; embedded compatible clips are used, with an optional manual
replacement path in CREDITS.

Run `npm test`, `npm run typecheck`, `npm run web:build`. Build output includes a
large Three bundle warning (~630 kB uncompressed); this does not fail the build.
No browser/GPU or human playtest evidence is claimed by command-line checks.

## Review focus / remaining limitations

- Browser/GPU visual QA, accessory placement and animation transitions need
  Claude/Nicoh review. Horns/heraldry are simple procedural attachments.
- Exact enemy stamina pips are intentionally unavailable: human play displays
  only the observed band, preserving the game's information boundary.
- Historical traces cannot show missing state/effects; use the enriched fixture
  or capture observations to show the full HUD/epilogue. Out-of-order/custom
  actor-1 observations must be normalized to the documented player-0 format.
- Counter and wall particles describe observed visual facts; the engine exports
  no named parry/riposte/slam event stream. No such API was added in this scope.
- Dawn/dusk colors, pixel size 5 and asset scales are presentation constants.
  No audio or external multiplayer is included.
