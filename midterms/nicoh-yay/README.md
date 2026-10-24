# Trial by Combat: The Broken Oath

Original two-knight combat and prisoner judgment game, with TypeScript rules, observation-only controllers, offline evaluation and a gated Vertex adapter. A terminal player interface works; a renderer is pending. Generated key art is included at `art/generated/key-art-v1.png`; planned CC0 renderer assets are not yet included. See [CREDITS](CREDITS.md).

Course brief correction: per Nicoh's implementation instructions, the revised **2026-10-21 brief, ?Choose your game,? allows ORIGINAL games for full credit**. The root AGENTS.md classic-reconstruction line is outdated. The CourseWorks midterm brief (revised October 21, 2026), section "Choose your game", reads: "Choose either a classic reconstruction or an original game. Both are eligible for full credit." Source: https://courseworks2.columbia.edu/courses/258228/assignments/1749857 (login required).

Fresh clone (Node 24 and npm; PowerShell users with script restrictions can use `npm.cmd`):

```sh
git clone https://github.com/NICOH-YAY/game-dev-f26.git
cd game-dev-f26/midterms/nicoh-yay
npm ci
npm test
npm run typecheck
npm run play -- 42
npm run balance
```

All subsequent commands run from `midterms/nicoh-yay/`. `build` emits ignored `dist/`. `play` prints public observations until the terminal outcome. `npm run balance` executes 3,520 episodes: 11 controllers x 4 personas x S1/S2/S3/X1 x 20 paired seeds. Exit 1 means unmet design criteria; exit 2 means execution failure. Current balance and fresh comparisons are in [EVALUATION](EVALUATION.md). Correctness tests do not approve a balance gate.

```sh
npm run eval -- --suite experiments/suite.json --players baseline,random,always-strike --trials 20 --out results/custom-offline
```

The CLI always excludes final-only X2. **Do not run X2, including baselines, until the one final evaluation.** X1 is held-out from prompt tuning but observed during balance tuning. X2's new seeds, Mimic policy and evidence configuration are freeze-dated 2026-10-24 in [suite.json](experiments/suite.json). Future final evaluation needs an explicitly reviewed runner change under Nicoh's instruction; no development opt-in flag bypasses the exclusion.

The player interface is `Game.reset/observe/legalActions/step/outcome` in `src/game.ts`. Opponent commits first; champion receives a noisy pending-action tell; the second submission resolves simultaneously. Illegal requests preserve state. Controllers never receive Game or private state. [DESIGN](docs/DESIGN.md) and the [rule/source map](docs/rule-source-map.md) define original `design` rules. [agent-config.json](agent-config.json) is loaded and validated for runtime history length, timeouts, caps, reasks and fallback streak; episode options provide explicit test overrides. Baseline fields remain descriptive documentation of its implemented defaults, not runtime overrides.

Vertex setup, **only after Nicoh explicitly approves live calls**:

1. Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) for your operating system, then open a fresh terminal and check `gcloud --version`.
2. Select a Google Cloud project with billing and Vertex AI API enabled, and grant the authenticated user permission to use Vertex AI in that project.
3. Authenticate Application Default Credentials: `gcloud auth application-default login`. If required by your project, run `gcloud auth application-default set-quota-project YOUR_PROJECT_ID`.
4. In PowerShell, from this game folder:

```powershell
$env:GOOGLE_CLOUD_PROJECT = "YOUR_PROJECT_ID"
$env:GOOGLE_CLOUD_LOCATION = "global"
$env:COURSE_MODEL = "gemini-3.5-flash-lite"
npm.cmd run eval -- --suite experiments/suite.json --players M-obs,M-hist --trials 3 --live --out results/live
```

The requested model ID must be available to your project at run time; availability and dated pricing remain unverified. This exact command crosses four personas per development situation (96 live episodes, up to 2,880 calls), and excludes X2. The narrower declared-persona scientific comparison is selected from those cells; live trials have not run. No provider or fixture is silently substituted. Model IDs, token usage, latency and fallback sources are recorded. Never store credentials in this repo.

Implementation and review are separate: [AGENTS](AGENTS.md), [rule-change skill](.agents/skills/rule-change/SKILL.md), [balance-check skill](.agents/skills/balance-check/SKILL.md), [invocation log](docs/SKILL-INVOCATIONS.md), [decision register](docs/DECISIONS.md), [review handoff](docs/IMPLEMENTATION-REVIEW-HANDOFF.md). This implementation pass awaits an independent reviewer in a different session; only Nicoh approves gates.

[AGENT-TEAM](AGENT-TEAM.md) and LIMITATIONS in [EVALUATION](EVALUATION.md) are for Nicoh to write in his own voice. [Peer notes](docs/peer-notes/README.md): TODO observed human play. Recording link: **TODO ? Nicoh add a recording URL after recording**. No human play, live model trial or hosted CI result is claimed here.

## 3D browser renderer

From this folder run `npm ci --cache .npm-cache` and `npm run web`.
Press Enter for human play, or choose Sample replay / Load JSONL.
Keys 1–5 select Strike, Bash, Guard, Recover, Sidestep; Enter confirms.
`npm run web:build` creates `web/dist/` for static hosting.
See [renderer handoff](docs/RENDERER-HANDOFF.md) for trace format, provenance,
boundaries, validation and limitations. Independent Claude review is pending.
