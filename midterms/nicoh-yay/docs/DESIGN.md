# Vaulting Ambition ? prototype design
Nicoh is Creative Director and Executive Producer. Evidence labels: `design` means specified intent; `observed` means an executed check. No human experience claims are made.

## Premise and mechanic ? design
A knight climbs a ruined tower using a lance pole-vault to claim a crown. Aim 25?155? above the horizon; build run-up power by holding, then release. The first charge fills over 1.05 seconds; afterward it oscillates between 20?100%. A 0.2-second ledge-clamped run-up leads to a committed ballistic arc: speed = 7 + 6 ? power metres/second, gravity = 12 metres/second?. No air control. Power ?90% with an angle <35? from either horizon snaps the lance: a short forward tumble costs one vault. These constants implement Nicoh's requested mechanic; no tuning based on human trials is claimed.

Feet use x/y physics with half-width .23m and height 1.15m. Sim ticks are 1/120 second. Top landings stand; side hits reverse horizontal velocity at 38% and force downward motion. Undersides interrupt ascent. A fall counter increments once when a flight drops >3m from its own apex; landing rearms it. Best height measures the feet, including airborne apexes. Crown proximity (<.9m horizontal and <1.3m vertical) wins, including touching it in flight. If the knight misses the entire courtyard and drops below ?8m, reset position to the start while retaining elapsed time and counters.

## Tower chunks ? design
`src/sim/tower.json` contains top-to-bottom ASCII rows with a common odd width (23), section name, and ascending integer baseY. Tile centres are x=column?11, y=baseY+rowCount?2?rowIndex; solid tiles are 1m high, so their top is y+1. `S` marks standing feet at its tile y, and `C` marks the crown target at y+1. There must be exactly one of each; the start must be supported. The parser merges adjacent solid tiles into horizontal boxes.

Courtyard has broad tutorial platforms. Battlements introduces narrower crossings and a left catch shelf; overshooting the right side can lose several landings. Belfry narrows to three-metre shelves. Successive platforms are offset left and right at three-metre rises. Open vertical shafts permit long drops, with the full courtyard catching most bottom falls. Geometry is intentionally compact for prototype validation; human difficulty and recovery feel remain TODO.

## Rendering and feedback ? design
Three.js side camera with perspective, vertical damping, RenderPixelatedPass depth/normal outlines, CC0 KayKit knight and Kenney castle decoration. All physics stays in x/y. Embedded Idle plus procedural run bob, launch lean, aerial tilt, snap spin, landing dust and impact shake. A short dashed plant direction communicates angle, without drawing the predicted path. HUD shows feet height, persisted best, vaults, falls, timer, angle and power. R confirms a restart. Optional title art is loaded from `web/public/art/title.png`; a tower/gradient placeholder works without it.

## Historical ideas ? design
Getting Over It / Sexy Hiking inform the Foddian premise, commitment, loss of progress and catch ledges. Jump King informs no air control. Spelunky from the course Historical Source archive informs chunk-based level design, preparing for later seeded tower composition. These are design references only; no code reused, no fresh archive inspection or historical play session claimed.

## Interface and evidence
The pure sim exports reset, observe, legal_actions, step, outcome and predictVault. The state-owning player interface exposes the five operations without the authoritative state object. Observations include copied geometry within 14 vertical metres and the crown only when nearby; no full map, file access, credentials, or model client. Discrete angles: [25,43,61,79,101,119,137,155]; powers: [.4,.6,.8,1]. Illegal actions throw and change nothing. step resolves one vault; runtime tick animates the same computation. predictVault is a development forward model; the web never shows its trajectory. Full-map search is a development tool, separate from the player interface.

`observed`: deterministic Vitest checks and bounded brute-force search establish a crown route for the supplied start and 32 actions. The search quantizes landed x to .2m for visited-state pruning; it replays every winning action through the exact sim. Search failure would be inconclusive; a replayed success proves this tower can be completed. This does not establish enjoyment, accessibility, or human difficulty. Human playtesting remains TODO.
