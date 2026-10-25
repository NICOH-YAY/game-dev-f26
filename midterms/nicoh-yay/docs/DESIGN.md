# Vaulting Ambition: first-person rebuild

Nicoh remains Creative Director and Executive Producer. Implementation: Codex. Independent reviewer: Claude, pending. The rejected side-view prototype is replaced, with its scaffolding, licenses, assets, CI and title art retained.

## Reference and evidence

`observed`: [Refund This Game, Steam](https://store.steampowered.com/app/5070190/Refund_This_Game/), Cactile Games & dofhouse, accessed 2026-10-25. Its store description establishes 3D Getting Over It-style climbing and a pole that sticks to walls, bends and flings the player. [GamesRadar press coverage](https://www.gamesradar.com/games/platformer/after-valve-was-criticized-devs-back-steams-refund-policy-by-creating-a-2-hour-game-literally-called-refund-this-game-we-celebrate-players-right-to-refund/) identifies the first-person presentation and one checkpoint. These are store/press observations, not our own play session or a claim of reproducing the commercial game's exact physics. No code, sounds or assets from that game were used.

`observed`, reported by Nicoh: Nicoh playtested the previous 2D side-view prototype and rejected aiming: "very bad, I can't aim it". No additional human observations are invented. Follow-up human playtest: TODO.

`assumed`: all numerical tuning, launch equation, sphere body, original castle/cyber course, action discretization and feedback are our adaptation, requested by Nicoh. Tests and search supply `code` evidence about this implementation; they do not promote design assumptions into observed human experience.

## Aiming and launch

Pointer-lock mouse look controls the actual eye ray. The crosshair stays central; the mint dot appears only on the nearest solid surface within 4.5m. The visible pole begins at the lower-right hand and points toward the crosshair. Holding left mouse attaches its tip to that fixed world point. Its quadratic curve bends down as charge grows, saturating after .8 seconds; pushing toward the point adds a small charging bonus. Looking remains free while attached. Releasing uses:

```
away = normalize(eye - plantPoint)
direction = normalize(away + .18 * normalize(lookDir) + (0, .22, 0))
velocity = direction * (5 + 9 * clamp(bend, 0, 1))
```

The result replaces velocity, capped at 14m/s; momentum cannot accumulate without bound. Floor planting launches upward. Wall planting pushes away with a small up bias. Ceiling planting initially pushes downward: chain a replant to recover around undersides rather than expecting every surface to lift you. Holding is elastic visual charging, not a rigid rope constraint; the tip detaches if eye distance exceeds reach + .5m. Midair planting works, including automatic attachment when a held mouse finds a reachable surface.

## Physics and course

Pure TypeScript, no physics package, randomness or model. Fixed 1/120s steps; four position substeps and three contact passes per tick. Closest-point sphere/AABB depenetration removes inward normal velocity while preserving tangential velocity for sliding. An inside-box fallback chooses the nearest face. Upward contact normals above .65 ground the player. Radius .42m; the camera is the sphere center (a compact stylized body, not a standing-height capsule). Gravity 20m/s2. Ground friction is exponential, 8/s. WASD accelerates at 2m/s2 only below a 1.1m/s nudge cap or when opposing existing velocity. The strongest vault rises approximately 4.9m without intervening contact.

The editable JSON is the collision source of truth: finite min/max boxes with IDs, material names and optional checkpoint/goal flags. The course is a rising series of broad gate ledges, offset pillars, shaft walls, underside/overhang targets and a narrower spire. Catch shelves reduce some falls. The sole mint checkpoint is at 15.4m of a 33m summit. Contact with its top saves once; contact with the gold summit top wins. R/void below -16m returns to checkpoint, retaining elapsed time and vault count; bottom restart resets the run. No fall damage.

Rendering uses simple original materials plus retained Kenney decorative towers; scenery has no collision. A 2-pixel RenderPixelatedPass keeps aiming crisp. Launch adds a 7-degree FOV kick and small deterministic camera shake; landing produces dust. Synthesized filtered rush/thump audio needs no downloaded assets. HUD shows speedrun timer, stage, height, best records, vaults, reach and bend. Esc, focus loss and hidden tabs pause and cancel a held plant to avoid accidental launches.

## Future player interface

`src/player_interface.ts` owns authoritative state in a closure. Controllers get copied observations and proposals, never the course, renderer, files, credentials or model clients. The five operations are reset, observe, legal_actions, step, outcome. `simulateLaunch(state, plantPoint, bend, lookDir)` is a pure forward impulse model returning a new state; no trajectory appears in the player's HUD.

Yaw buckets: angle = bucket * 2pi/16, starting along -Z; positive yaw aims +X. Pitch = -pi/2 + (bucket + .5) * pi/8, from down to up. Bend = (bucket + 1)/4. An action turns the eye, raycasts to the nearest surface, charges the selected amount and releases. `step` then runs at most 360 fixed ticks, stopping on landing/win. Standing or attached states permit actions; an unattached airborne state has none. The human controller can aim continuously and replant midair; the discrete baseline is intentionally narrower.

Charge time is accounted as stationary setup time in this macro action; an already airborne attached macro does not simulate drift during that setup. Thus the discrete action is an abstraction of timed human inputs, not an exact mouse-input replay. The launch and flight integrator are shared. Refused/malformed/out-of-range actions return unchanged state and do not advance time.

Observation contains position, velocity, ground/attachment/bend, time/height, checkpoint boolean, outcome and 128 local first-hit reach rays indexed by the same yaw/pitch buckets. This is an instantaneous turn-and-look scan in every candidate direction, including behind the initial heading; it reveals only the surface a player could see by looking there within pole reach. No full map, goal location, through-wall hits or box IDs are exposed. Legal actions are exactly the ray hits expanded over four bends.

## Reachability evidence and remaining work

`code`: tests and `docs/SEARCH-ROUTES.json`. Beam search starts at the actual spawn, selects only legal actions, quantizes landed positions to .5m for duplicate pruning, keeps 60 highest candidates per depth, and replays success through the exact sim. Search is development tooling, not a playing model, human playtest, evaluation or gate approval. Success proves a route exists for the discrete interface; failure would be inconclusive. Full course success is asserted as well as checkpoint success.

TODO for Nicoh: verify pointer capture/Esc, aim at floor/wall/underside, release at low/full bend, recover from a fall and try midair chains. Record only actual play. Browser visual verification could not run because the connected tool inventory had no browser surfaces. Claude must independently review rules, boundary, evidence and implementation before any student merge decision.
