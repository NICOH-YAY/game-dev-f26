# Vaulting Ambition

First-person 3D pole climbing for Nicoh, Creative Director and Executive Producer. Five authored stages rise 33 metres: Gate, Pillars, Wall run, Overhangs, Spire. One checkpoint at 15.4m. Falls cost progress; catch platforms offer recovery.

## Run

Node 24 and npm, from `midterms/nicoh-yay/`:

```sh
npm ci
npm run web
npm test
npm run typecheck
npm run web:build
```

Open http://127.0.0.1:5173 (or the URL Vite prints). Build output: `web/dist/`. Use `npm.cmd` in PowerShell if scripts are blocked. Desktop mouse/keyboard and WebGL are required.

## Controls

- Click Start to capture the mouse. Mouse looks; Esc releases and pauses.
- Aim at the mint reach dot. Hold left mouse to stick the pole tip there and bend it; release to launch away from that point. Look down at the floor for the first vault. Looking around while planted adjusts the small directional bias.
- Replant in midair to chain vaults. Holding with no target will plant when a surface enters reach.
- WASD gives a tiny nudge, not walking speed. The pole provides real movement.
- R returns to the saved checkpoint (or bottom before reaching it), retaining the timer. Pause menu: sensitivity, checkpoint restart, bottom restart. Bottom restart clears the current timer and vault count.
- Height, best height, best completed time and vault count are on the HUD. Records use localStorage with a safe fallback when storage is blocked.

## Where to change things

- `src/sim/index.ts`: pure deterministic 120 Hz integrator, launch model and game rules. `C` holds reach 4.5m, radius .42m, gravity 20m/s2, launch speed 5-14m/s, .8-second bend, .18 look bias, .22 upward bias, nudge cap 1.1m/s, friction 8/s, void -16m.
- `src/sim/tower.json`: explicit boxes in metres, min/max corners, material, optional checkpoint/goal. Exactly one of each. No visual mesh controls collision.
- `web/src/main.ts`: mouse sensitivity .002 radians/pixel times slider, input and HUD.
- `web/src/scene.ts`: 78-degree FOV, +7 launch kick, 2-pixel post effect, procedural pole/dust, Kenney scenery. Retained KayKit assets remain available.
- `src/player_interface.ts`: state-owning reset / observe / legal_actions / step / outcome. Actions use yawBucket 0-15, pitchBucket 0-7, bendBucket 0-3. See DESIGN for exact semantics.
- `src/sim/search.ts`: development beam search, isolated from web/player interface. `docs/SEARCH-ROUTES.json` stores replayed deterministic routes for the future baseline.

## Evidence and limits

Tests cover deterministic hash, launch, contacts, midair planting, checkpoint/void/goal, action refusal and course validation. Beam search plus exact replay reaches the checkpoint and summit. This proves discrete reachability, not aiming comfort or enjoyment. Nicoh rejected the previous 2D prototype; this replacement has not yet had a human playtest. Browser tooling was unavailable, so pointer lock, visual polish and feel still need desktop verification. Claude review is pending in `docs/REVIEW-HANDOFF.md`. No commits, pushes or model calls were made.
