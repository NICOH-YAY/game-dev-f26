# Credits
Creative Director / Executive Producer: Nicoh. Implementation: OpenAI Codex, at Nicoh's direction. Independent review: pending Claude; no review claimed.

Original Vaulting Ambition game code and procedural geometry. The previous project's Three.js / RenderPixelatedPass setup and GLTF loading approach were adapted; no Trial by Combat game rules, AI controllers, results, or combat UI remain.

## Retained CC0 assets
| Author / pack | Source | Shipped files | Use |
|---|---|---|---|
| Kay Lousberg / KayKit Adventurers 1.0 | https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0 | `web/public/assets/Knight.glb`, `LICENSE.txt` | Knight model, embedded Idle clip |
| Kenney / Castle Kit 2.0 | https://kenney.nl/assets/castle-kit | `tower-square.glb`, `Textures/colormap.png`, `Kenney-License.txt` | Decorative background castle towers and their texture |
| Kenney / Fonts | https://kenney.nl/assets/kenney-fonts | `pixel.ttf`, `Kenney-Fonts-License.txt` | Kenney Mini Square UI font |

Asset paths above are under `web/public/assets/`. License files are retained verbatim from the previous project. All listed packs are CC0 1.0. No additional assets were downloaded. Run, vault, landing, and tumble motions use procedural transforms because the retained knight does not provide suitable locomotion/vault clips. Lance, crown, ledges, banners, dust, and backdrop walls are original procedural geometry. Gameplay colliders are authored boxes; castle meshes are visual only.

Three.js (MIT), Vite (MIT), TypeScript (Apache-2.0), Vitest (MIT) retain their package licenses in dependencies. RenderPixelatedPass is part of Three.js.

## Design references (ideas only)
Getting Over It / Sexy Hiking: Foddian climbing premise and catch-ledge structure. Jump King: charge/commit and no air control. Spelunky, from the course Historical Source archive: chunk-based level composition, with seeded towers deferred. No code or assets from these games were used. These are `design` attributions, not claims of archival research or observed play evidence.

Optional `web/public/art/title.png` will need its own provenance/credit when supplied by Claude; none is present in this implementation.
