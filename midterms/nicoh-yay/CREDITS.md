# Credits

Original game design: Nicoh. Design discussion with Claude (Anthropic), ChatGPT and Codex (OpenAI); see docs/DESIGN.md.
Implementation agent: OpenAI Codex CLI. Independent review: Claude Code (see docs/reviews/).

## AI-generated art
- `art/generated/key-art-v1.png`: title/key art generated 2026-10-24 with Higgsfield (model `z_image`, Tongyi-MAI Z Image)
  from a text prompt written by Claude at Nicoh's direction. Nicoh reviewed Higgsfield's terms of use on 2026-10-24
  and confirmed this output may be used and published in this public repository. Known flaws: the blue knight
  holds an axe, not a sword; the judge's clothing looks modern. To be regenerated.

## Requested CC0 asset packs
- KayKit Character Pack: Adventurers, Kay Lousberg, https://kaylousberg.itch.io/kaykit-adventurers (CC0 1.0)
- KayKit Character Animations, Kay Lousberg, https://kaylousberg.itch.io/kaykit-character-animations (CC0 1.0)
- Kenney Castle Kit, https://kenney.nl/assets/castle-kit (CC0)
Actual files obtained and used are listed below.

## Browser renderer assets (obtained 2026-10-24)

License text was read before use. Only the files listed below are shipped under
`web/public/assets/`; total assets are approximately 10.3 MB (decimal).

| Author / pack | Exact source | License | Files used |
|---|---|---|---|
| Kay Lousberg / KayKit Adventurers 1.0 | https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0/tree/main/addons/kaykit_character_pack_adventures/Characters/gltf | CC0 1.0 | `Knight.glb`, `Barbarian.glb` |
| Kay Lousberg / license | https://raw.githubusercontent.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0/main/LICENSE.txt | CC0 1.0 | `LICENSE.txt` (verbatim) |
| Kenney / Castle Kit 2.0 | https://kenney.nl/assets/castle-kit ; archive https://kenney.nl/media/pages/assets/castle-kit/a395102d20-1711543616/kenney_castle-kit.zip | CC0 1.0 | `Models/GLB format/tower-square.glb`, `Models/GLB format/flag-banner-long.glb`, archive `License.txt` copied as `Kenney-License.txt` |

Character exact download URLs:
- https://raw.githubusercontent.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0/main/addons/kaykit_character_pack_adventures/Characters/gltf/Knight.glb
- https://raw.githubusercontent.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0/main/addons/kaykit_character_pack_adventures/Characters/gltf/Barbarian.glb

The character GLBs already embed compatible animations: `Idle`,
`1H_Melee_Attack_Slice_Horizontal`, `Block_Attack`, `Block`, `Dodge_Left`,
`Hit_A`, `Death_A`. These are the animation files actually used; a separate
Rig_Medium file is not shipped. The official GitHub account's repository list
has no standalone Character Animations mirror. The fallback page
https://kaylousberg.itch.io/kaykit-character-animations was inspected and states
CC0, but its download is mediated by itch. No gated downloads were bypassed.
Optional manual replacement: download the free KayKit Character Animations
pack from that page, select its **Rig_Medium glTF animations** and included
license; review clip/bone names before replacing the embedded clips. No manual
download is needed to run the current renderer.

Original procedural geometry: courtyard, perimeter walls, mountains, torches,
blue shield/lion emblem, horns and particles, implemented by Codex for Nicoh.
Castle tower/banner meshes use their original materials; characters use toon
materials with the embedded texture, blue/red tint and darker Barbarian body.
`key-art-v1.png` is copied unchanged from `art/generated/key-art-v1.png`; its
Higgsfield provenance and existing usage approval above still apply.

Pixel font: Kenney, CC0 1.0, https://kenney.nl/assets/kenney-fonts . Exact archive:
https://kenney.nl/media/pages/assets/kenney-fonts/8d5435c213-1677661710/kenney_kenney-fonts.zip .
License text read before use; `Fonts/Kenney Mini Square.ttf` copied as
`web/public/assets/pixel.ttf`, archive `License.txt` as `Kenney-Fonts-License.txt`.

Castle texture repair: Kenney Castle Kit 2.0 (CC0), from the archive credited above,
`Models/GLB format/Textures/colormap.png` copied to
`web/public/assets/Textures/colormap.png` for the relative glTF texture URI.
