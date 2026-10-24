# Trial by Combat: The Broken Oath

Headless, original two-knight combat and prisoner judgment game. TypeScript rules, observation-only controllers, offline evaluations, and an explicitly gated Vertex adapter. No renderer or assets yet. `docs/DESIGN.md` is Nicoh's spec; proposed numeric/timing defaults are in [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md). This implementation is pending Claude's independent review; it has not been approved.

All commands run from **`midterms/nicoh-yay/`**, using Node 24 and npm:

```sh
npm install
npm test
npm run typecheck
npm run balance
npm run play -- 42
npm run eval -- --suite experiments/suite.json --players baseline,random,always-strike --trials 20
npm run eval -- --suite experiments/suite.json --players baseline-depth1 --trials 20 --out results/depth1
```

On Windows PowerShell with scripts disabled, use `npm.cmd`. `npm ci` installs the locked dependencies. `play` is a text terminal interface: enter a listed action; the opponent is Aggressor. It prints only observations until the terminal outcome. `build` emits ignored `dist/`; eval/play compile then use plain Node, avoiding platform account lookup in third-party TS launchers.

Evaluation writes one JSONL trace per episode, `results/summary.jsonl`, and [results/comparison.md](results/comparison.md). Twenty trials means twenty **per controller per persona per situation**: 3,520 episodes for all 11 offline controllers. Common seeds pair arms; X1 is held out; no significance claims. The depth-1 validation arm writes to a separate directory. To compare normative policies, include `baseline-weighted` as another offline player. The exact posterior and published likelihoods are engine-owned.

The five-operation player interface is `Game.reset/observe/legalActions/step/outcome` in `src/game.ts`. `step` submits a combat action; the second submission resolves the exchange. Illegal actions leave the whole state unchanged. Players never receive Game or its state; runner-only hooks terminate invalid episodes and implement judgment abstention. See [docs/rule-source-map.md](docs/rule-source-map.md) for `design` evidence and source/test locators. State can be serialized; `stableHash` is a deterministic checksum, not a security primitive.

Live use is separate and costs credits. It requires Nicoh's explicit choice to run the following, Vertex credentials (ADC), and `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`, `COURSE_MODEL` in the environment:

```sh
npm run eval -- --suite experiments/suite.json --players M-obs,M-hist --trials 3 --live --out results/live
```

No live call was run for this implementation. Tests use MockModel, never network or a fixture masquerading as live. Live pricing is an unfilled, dated placeholder in reports; runtime model IDs are recorded with results. Model configuration and artifact pointers are in `agent-config.json`.

Credits: TODO Nicoh to finalize; see [CREDITS.md](CREDITS.md) for KayKit/Kenney CC0 placeholders. No assets or personal playtester data are included. Observed development bugs are in [docs/BUGLOG.md](docs/BUGLOG.md). No human playtest is claimed.

AGENT-TEAM: TODO ? Nicoh writes personally.

Limitations: TODO ? Nicoh writes personally.

Balance targets are separate from CI correctness: `npm run balance` runs all 3,520 offline episodes, writes traces and a per-criterion PASS/FAIL report, and appends it to [BALANCE-FINAL](docs/BALANCE-FINAL.md) while retaining history. Exit 1 means unmet design targets; exit 2 means matrix execution failed. Current criterion (a) FAIL: S2/Sentinel baseline 11/20 versus always-BASH 20/20 (random 8/20). Other declared cells PASS; criterion (b) Adapter ceiling PASS in all four situations. These targets remain unmet; green correctness tests do not approve a balance gate.

`npm test` retains rule, limit, leak, determinism, observed regression and CLI tests. The existing CI workflow runs `npm test` and typecheck unchanged. GUARD now ripostes for 1 damage as approved by Nicoh on 2026-10-24; the S2 sparse-context evidence-loss fix and its controlled comparison are in [BUGLOG](docs/BUGLOG.md).
