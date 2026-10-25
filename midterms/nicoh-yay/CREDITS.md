# Credits
Creative Director / Executive Producer: Nicoh. Implementation: OpenAI Codex, at Nicoh's direction. Independent review: pending Claude; no review claimed.

Original Vaulting Ambition game code and procedural geometry. The previous project's Three.js / RenderPixelatedPass setup and GLTF loading approach were adapted; no Trial by Combat game rules, AI controllers, results, or combat UI remain.

## Retained CC0 assets
| Author / pack | Source | Shipped files | Use |
|---|---|---|---|
| Kay Lousberg / KayKit Adventurers 1.0 | https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0 | `web/public/assets/Knight.glb`, `LICENSE.txt` | Retained asset; not rendered in first-person mode |
| Kenney / Castle Kit 2.0 | https://kenney.nl/assets/castle-kit | `tower-square.glb`, `Textures/colormap.png`, `Kenney-License.txt` | Decorative background castle towers and their texture |
| Kenney / Fonts | https://kenney.nl/assets/kenney-fonts | `pixel.ttf`, `Kenney-Fonts-License.txt` | Kenney Mini Square UI font |

Asset paths above are under `web/public/assets/`. License files are retained verbatim from the previous project. All listed packs are CC0 1.0. No additional assets were downloaded. The first-person rebuild does not render the retained knight. Pole bending, camera feedback and dust are procedural. Lance, crown, ledges, dust, and course walls are original procedural geometry. Gameplay colliders are authored boxes; castle meshes are visual only.

Three.js (MIT), Vite (MIT), TypeScript (Apache-2.0), Vitest (MIT) retain their package licenses in dependencies. RenderPixelatedPass is part of Three.js.

## Design references (ideas only)

Refund This Game, by Cactile Games & dofhouse: first-person stick/bend/fling climbing and one checkpoint. `observed` evidence is its [Steam page](https://store.steampowered.com/app/5070190/Refund_This_Game/) and linked press in docs/DESIGN.md, accessed 2026-10-25. No code, art or sound from it was copied. Getting Over It supplies the broader Foddian climbing reference. Launch math, level boxes, pole/crown meshes, feedback and sounds are original implementation choices (`assumed` tuning).

`web/public/art/title.png` is retained unchanged from the existing branch. Its original author/provenance was not supplied to this rebuild; verification remains for the student/reviewer. It was not generated or replaced during this task.
