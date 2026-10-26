# Small Change
A playable 2D adaptation of **Cart Life (Richard Hofmeier, 2011)**, directed by Nicoh. Melanie is separated and raising Laura while running a coffee cart. The days keep coming. There is no score, terminal failure, morality meter, or ending to optimize.

## Play locally
Requires Node 24 and npm. From `midterms/nicoh-yay/`:

```sh
npm ci
npm run web
```
Open http://127.0.0.1:5173. Choose **Open the curtains**. Read and select a morning choice, then the first cart dilemma. Serve coffee by typing the displayed recipe letters **G / T / P / S / W / L**, or tapping each highlighted key. Orders differ; read the recipe when Melanie’s hands shake. Conversations take time. Patience bars belong to customers, not to a morality system.

A shift contains 105 seconds of simulation time with three dilemma interruptions; decisions pause service. Mistakes and conversation consume some of that time. Then an evening choice and Melanie’s journal lead into another day. Every fifth day brings a Laura vignette. **Pause** or Escape pauses; switching tabs pauses automatically. Optional sound begins muted. **New life** offers a local reset confirmation. Browser storage saves decisions and coffee actions; no account, API, or model is used. A blocked or malformed save falls back safely. Paused progress resumes from the title screen.

## Test and publish

```sh
npm test
npm run typecheck
npm run web:build
```
The static output is `web/dist/`, with relative asset URLs (`base './'`). Upload that folder to Cloudflare Pages (build command `npm run web:build`, project root `midterms/nicoh-yay`, output `web/dist`) under the course publishing workflow. No deployment, commit, or push was performed. CI remains `.github/workflows/midterm-nicoh-yay.yml`, running npm ci/test/typecheck in this folder.

## Structure
- `src/sim.ts`: deterministic day simulation, state ownership, saves, five operations.
- `src/player_interface.ts`: reset / observe / legal_actions / step / outcome exports. Controllers should receive observations and legal ids; keep State in the host, not in the player.
- `src/dilemmas.ts`: 24 dilemmas, callback text, declarative conditions and hidden effects, validator.
- `src/coffee.ts`: seeded orders, patience, recipes, fatigue, tips and conversation.
- `src/scripted_controller.ts`: deterministic development coffee controller, no model.
- `web/src/`: responsive DOM/CSS view, input, optional WebAudio, local save.
- `tests/`: contracts, integration, full-day automated DOM flow.

## Pending art
All new PNGs are currently placeholders. Drop Claude’s Higgsfield images into `web/public/art/` with these filenames: `title.png`, `melanie.png`, `laura.png`, `laura_distant.png`, `cart_street.png`, `rival.png`, `regular_businessman.png`, `regular_student.png`, `regular_nurse.png`, `regular_oldman.png`, `regular_cop.png`, `apartment.png`. Missing files use CSS scenes/silhouettes; no art generation was requested from a model. Backgrounds replace the CSS scenery automatically; portraits retain transparent backgrounds. The original game’s assets, music, and HOOGE font are not bundled.

See [credits](CREDITS.md), [license](LICENSE-CARTLIFE.md), [design](docs/DESIGN.md), [data authoring](docs/DILEMMAS.md), and [Claude handoff](docs/REVIEW-HANDOFF.md). Human playtesting and Claude review remain pending.
