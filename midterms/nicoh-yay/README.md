# Vaulting Ambition
A playable 2.5D Foddian climbing prototype for Nicoh, Creative Director. The knight has one tool: a lance, and one chance to commit each jump. Three authored sections: Courtyard ? Battlements ? Belfry ? crown.

## Run
Node 24, npm. From `midterms/nicoh-yay/`:

```sh
npm ci
npm run web
npm test
npm run typecheck
npm run web:build
```
Open the localhost URL printed by Vite (normally http://127.0.0.1:5173). Production output is `web/dist/`. On Windows with blocked PowerShell scripts use `npm.cmd`.

## Play
Click **Take the first leap** or press Enter. Aim with the mouse relative to the knight, or use A/D / left/right arrows. Left increases the angle toward the left; right lowers it toward the right. Hold Space or the left mouse button to build power; release to run, plant, and vault. The meter fills once, then oscillates: time the release. Above 90% power, shallow angles (<35? above either horizon) snap the lance. There is no air control. Landing on a top stops you; sides bounce you away. The dashed line shows plant direction only, never the full trajectory.

Falls can catch lower ledges. R asks before restarting at the courtyard. Reach the gold crown for time, vaults, and falls. Best height persists if localStorage is available. The timer pauses when the tab is hidden.

The title uses the rendered tower and a gradient placeholder. Drop optional art into `web/public/art/title.png`; it is detected automatically on reload. No generated art is bundled.

## Code and evidence
- `src/sim/`: pure 120 Hz simulation, validated chunk parser, `predictVault`, and development-only reachability search.
- `src/player_interface.ts`: state-owning reset / observe / legal_actions / step / outcome adapter. An action is `{angleIndex, powerIndex}`; 8 angles ? 4 powers. One step resolves one complete vault; the web runtime animates the same fixed ticks.
- `src/sim/tower.json`: three ASCII chunks, top row first, centered x, 1 metre tiles. `#` solid, `.` empty, `S` start, `C` crown. baseY places each section. See DESIGN for authoring rules.
- `tests/sim.test.ts`: deterministic rules and a bounded brute-force crown route from the actual start.
- `docs/REVIEW-HANDOFF.md`: evidence and limitations for Claude. Independent review is pending.

No model calls, commits, pushes, or human playtests were performed. Trial by Combat is replaced on this branch; its preserved branch is `nicoh-yay/trial-by-combat`.
