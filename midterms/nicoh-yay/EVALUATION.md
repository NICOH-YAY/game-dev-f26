# Evaluation: Trial by Combat: The Broken Oath

Evidence date: 2026-10-24T23:35:04.274Z. Game version 0.1.0; base Git HEAD 9f6b763d09595ccf52e7ef94ac5623a29b78e5b6; working tree **dirty**. These results were generated from the uncommitted implementation, not pristine HEAD. Source manifest SHA-256 03d415852e61d767acb0a3d4b34c8808ab42614c112dcab5aef1dcf3e8eeffc9; suite SHA-256 f30f1dd435aa47426e4508000ec892f7e511c0cd4b4f8b143a4225f7f777bb80; config SHA-256 8fe7ae71f9d6a3da0122c56c0416c7a467f8bda59705381c996e75d36182e5a6. Full per-file manifest and patch fingerprint: [provenance](results/balance-2026-10-24T23-35-04-141Z/provenance.json). No commit or push was made.

## Declared suite and integrity

[S1/S2/S3/X1 suite](experiments/suite.json) originally freeze-dated 2026-10-24; X2 amendment frozen 2026-10-24 at the base commit above plus the recorded working-tree suite hash. Historical freeze labels do not erase subsequent tuning exposure. Seeds reserve 1,000 per case; trial i uses base+i, paired across arms/personas within a case, disjoint across cases. Development matrix uses i=0..19. Live slots i=0..2 are declared but PENDING. Testimony uses its independent named stream and base 1026102401+i for development cases.

| Case | Evidence / HP | Declared persona | Duel seed range (reserved) | Integrity |
|---|---|---|---|---|
| S1 | .55/.55 accusing; HP12 | Aggressor | 2026102401..2026103400 | Development |
| S2 | .80/.80 clearing; HP9 | Sentinel | 2026103401..2026104400 | Development |
| S3 | .80/.80 accusing; HP12 | Opportunist | 2026104401..2026105400 | Development |
| X1 | .90 clearance + .90 accusation; HP12 | Adapter | 2026105401..2026106400 | held-out from prompt tuning but observed during balance tuning |
| X2 | .90 accusing + .55 exculpatory; HP12 | Mimic | Reserved in suite.json | Fresh final-only; NEVER RUN |

X2 Mimic repeats the champion's previous resolved action with probability .70; otherwise follows Sentinel policy. No previous action uses Sentinel. Unaffordable copied action becomes GUARD. Its new testimony range is reserved separately in suite.json; ".55 unreliable" means less reliable than .90, not below chance. Exact conditioned guilt posterior is 81/92. X2 is excluded from the CLI and balance scripts, including baselines, and is reserved for one final evaluation after Nicoh's explicit instruction and independent review. Unit tests exercise synthetic policy inputs with non-suite seeds; they are not X2 episodes. The integrity test scans existing result files for either reserved range. Do not change the freeze after observing final results.

## Players / arms

Primary baseline: depth-3 expectimax, pooled global plus local public-context online action learning, current-tell Bayes update, exact min-harm judgment. Fresh controller each episode. Depth1 retains learning at depth 1; baseline-agnostic learns pooled action counts without contexts; baseline-weighted changes judgment to costs harm=5, imprisonment=1, promise=1. Floors: random legal, always STRIKE/BASH/GUARD/RECOVER/SIDESTEP (unaffordable action becomes GUARD), plus alternating strike-bash. All offline arms use observation-only interfaces; all floors use the declared posterior judgment policy.

Model arms: M-obs current observation; M-hist current observation plus last 8 observations/own actions. Vertex is the configured live provider. Requested setup model is gemini-3.5-flash-lite; no runtime model IDs exist for this offline matrix. Availability/prices are unverified. No model calls were made and no fixture stands in for live evaluation. Four legacy personas are crossed with every development case; X2's Mimic is absent from this matrix.

## Metric definitions

W/D/L counts winner 0 / null / 1; draws are non-wins for criteria. HP difference is final champion minus opponent HP; exchange count counts resolved exchanges. Both are arithmetic means. Terminal reasons are raw counts. RELEASE/DETAIN/abstain count choices; binding/counsel are distinct authority contexts. Ledger columns count safe-passage breach, protection breach, innocent imprisonment and enabled harm from the binding verdict, not advisory choices. Posterior is the arithmetic mean over episodes with ledger values, followed by exact episode fractions in summary order and a missing count; it is foreseeable guilt risk, not observed guilt frequency.

Illegal counts rejected proposals; fallbacks count runner substitutions and never model moves. Calls include rejected replies and reasks. Token input/output sums count reported usage for all calls. Latency p50/p95 uses nearest rank over model-call latencies only, including rejected calls; empty offline distributions display 0. Cost is zero for offline runs; live cost remains unknown until dated input/output prices are supplied. Raw paired counts are descriptive, with no significance or ethical-understanding claim. Correctness tests and human experience are different evidence.

## Fresh offline comparison

3,520 episodes, 11 controllers x 4 personas x 4 cases x 20 seeds. Zero calls, fallbacks, illegal proposals, tokens and cloud cost. The table below selects the four declared cells; the [full 176-group comparison](results/balance-2026-10-24T23-35-04-141Z/comparison.md), [raw summary](results/balance-2026-10-24T23-35-04-141Z/summary.jsonl), and adjacent traces contain the full cross-product. This table is generated by experiments/evaluation.mjs from the current completed matrix.

|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | S1/Aggressor | 17/0/3 | ko:20 | 2.55 | 9.80 | 0/20/0 | 17/3 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Sentinel | 11/2/7 | ko:13, time_up_win:5, time_up_draw:2 | 0.80 | 15.10 | 20/0/0 | 11/9 | 9/0/8/0 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Opportunist | 19/0/1 | ko:20 | 4.30 | 8.55 | 0/20/0 | 19/1 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Adapter | 16/1/3 | ko:19, time_up_draw:1 | 3.20 | 11.65 | 20/0/0 | 16/4 | 4/7/3/7 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Aggressor | 16/3/1 | ko:17, double_ko_draw:3 | 4.15 | 8.75 | 0/20/0 | 16/4 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Sentinel | 12/1/7 | ko:16, time_up_win:3, time_up_draw:1 | 1.20 | 13.50 | 20/0/0 | 12/8 | 8/0/7/0 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 5.15 | 7.75 | 0/20/0 | 19/1 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Adapter | 18/0/2 | ko:19, time_up_win:1 | 4.45 | 9.80 | 20/0/0 | 18/2 | 2/8/2/8 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S1/Aggressor | 18/1/1 | ko:19, double_ko_draw:1 | 3.55 | 9.25 | 0/20/0 | 18/2 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S2/Sentinel | 16/1/3 | ko:16, time_up_win:3, time_up_draw:1 | 1.95 | 15.10 | 20/0/0 | 16/4 | 4/1/4/1 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S3/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 5.15 | 8.40 | 0/20/0 | 19/1 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | X1/Adapter | 17/1/2 | ko:19, time_up_draw:1 | 3.45 | 11.60 | 20/0/0 | 17/3 | 3/7/2/7 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Aggressor | 17/0/3 | ko:20 | 2.55 | 9.80 | 0/20/0 | 17/3 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Sentinel | 11/2/7 | ko:13, time_up_win:5, time_up_draw:2 | 0.80 | 15.10 | 20/0/0 | 11/9 | 9/0/8/0 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Opportunist | 19/0/1 | ko:20 | 4.30 | 8.55 | 0/20/0 | 19/1 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Adapter | 16/1/3 | ko:19, time_up_draw:1 | 3.20 | 11.65 | 0/20/0 | 16/4 | 20/0/12/0 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Aggressor | 6/1/13 | ko:16, time_up_win:3, time_up_draw:1 | -2.25 | 13.20 | 0/20/0 | 6/14 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Sentinel | 8/2/10 | ko:13, time_up_win:5, double_ko_draw:2 | -1.00 | 15.25 | 20/0/0 | 8/12 | 12/0/11/0 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Opportunist | 6/1/13 | ko:17, time_up_win:2, time_up_draw:1 | -2.55 | 11.65 | 0/20/0 | 6/14 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Adapter | 5/1/14 | time_up_win:7, ko:12, time_up_draw:1 | -2.80 | 15.10 | 20/0/0 | 5/15 | 15/0/7/0 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Aggressor | 17/2/1 | ko:18, double_ko_draw:2 | 3.45 | 7.70 | 0/20/0 | 17/3 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Sentinel | 4/1/15 | ko:19, double_ko_draw:1 | -2.90 | 11.25 | 20/0/0 | 4/16 | 16/0/15/0 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 5.65 | 6.75 | 0/20/0 | 19/1 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Adapter | 4/2/14 | time_up_win:7, ko:11, time_up_draw:2 | -3.30 | 15.50 | 20/0/0 | 4/16 | 16/2/10/2 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Aggressor | 1/0/19 | ko:20 | -7.10 | 8.90 | 0/20/0 | 1/19 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Sentinel | 20/0/0 | ko:19, time_up_win:1 | 5.10 | 13.20 | 20/0/0 | 20/0 | 0/1/0/1 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Opportunist | 12/0/8 | ko:20 | 0.45 | 10.85 | 0/20/0 | 12/8 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Adapter | 7/2/11 | ko:18, double_ko_draw:2 | -4.40 | 8.60 | 20/0/0 | 7/13 | 13/2/7/2 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Aggressor | 0/0/20 | ko:18, time_up_win:2 | -9.15 | 14.15 | 0/20/0 | 0/20 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Sentinel | 0/1/19 | time_up_win:17, ko:2, time_up_draw:1 | -4.75 | 17.45 | 20/0/0 | 0/20 | 20/0/19/0 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Opportunist | 0/0/20 | ko:20 | -10.30 | 12.75 | 0/20/0 | 0/20 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Adapter | 0/0/20 | ko:20 | -10.85 | 9.95 | 20/0/0 | 0/20 | 20/0/12/0 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S1/Aggressor | 0/0/20 | ko:20 | -12.00 | 8.45 | 0/20/0 | 0/20 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S2/Sentinel | 0/0/20 | ko:12, time_up_win:8 | -10.75 | 14.85 | 20/0/0 | 0/20 | 20/0/19/0 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S3/Opportunist | 0/0/20 | ko:20 | -12.00 | 7.05 | 0/20/0 | 0/20 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | X1/Adapter | 0/0/20 | ko:20 | -12.00 | 5.85 | 20/0/0 | 0/20 | 20/0/12/0 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S1/Aggressor | 0/2/18 | time_up_win:17, ko:1, time_up_draw:2 | -3.60 | 17.70 | 0/20/0 | 0/20 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S2/Sentinel | 0/0/20 | time_up_win:20 | -4.00 | 18.00 | 20/0/0 | 0/20 | 20/0/19/0 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S3/Opportunist | 17/3/0 | time_up_win:17, time_up_draw:3 | 3.10 | 18.00 | 0/20/0 | 17/3 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | X1/Adapter | 0/1/19 | time_up_win:19, time_up_draw:1 | -3.30 | 18.00 | 20/0/0 | 0/20 | 20/0/12/0 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Aggressor | 6/6/8 | ko:14, double_ko_draw:6 | -0.05 | 8.85 | 0/20/0 | 6/14 | 20/0/10/0 | 0.599010 [121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202, 121/202] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Sentinel | 7/3/10 | ko:17, time_up_draw:3 | -1.10 | 13.35 | 20/0/0 | 7/13 | 13/0/12/0 | 0.058824 [1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17, 1/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Opportunist | 19/0/1 | ko:20 | 5.20 | 7.80 | 0/20/0 | 19/1 | 20/0/0/0 | 0.941176 [16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17, 16/17] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Adapter | 6/1/13 | time_up_win:9, double_ko_draw:1, ko:10 | -1.60 | 15.95 | 20/0/0 | 6/14 | 14/5/11/5 | 0.500000 [1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2, 1/2] missing:0 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |

## Balance criteria

(a) Baseline wins >= every single-action bot and > random in each declared cell: **FAIL**. S2/Sentinel remains baseline 11/20 versus always-BASH 20/20 and random 8/20. (b) Each single-action bot <=10/20 wins against Adapter in each development situation: **PASS**. No combat/persona tuning was applied in this pass. [Per-cell balance report](results/balance-2026-10-24T23-35-04-141Z/balance.md). Execution succeeded; balance exit 1 records unmet criterion (a), not a correctness-test failure. No gate is approved here.

## CI evidence

PENDING ? add hosted CI run URL after Nicoh pushes. Local evidence: npm test and npm run typecheck; see [test record](docs/TEST-RESULTS.md). Hosted CI was not run during this implementation.

## Live trials

PENDING; no live trial has run. Declared-persona slice is 2 arms x 4 development cases x 3 trials = 24 episodes. The documented current CLI command crosses all four personas, so executing it would produce 96 live episodes; it still excludes X2. X2 final evaluation protocol/execution is pending, and must be frozen and reviewed before use.

| Arm | Case/persona | Trial/seed | Runtime model/config ID | Outcome | Calls/tokens/latency/cost | Artifact |
|---|---|---|---|---|---|---|
| M-obs | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING |
| M-hist | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING |
| Final X2 | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING |

## Cost

2026-10-24 dated-price placeholder: input USD/million tokens **PENDING**, output USD/million tokens **PENDING**, official price URL and retrieval date **PENDING**. No quoted price was fetched. For live trials, estimated USD = input_tokens/1e6 * input_price + output_tokens/1e6 * output_price, with caching/other charges documented if applicable. Current offline cost is USD 0. Caps: 30 calls/episode, 20s/call, one unparseable reask counted toward cap, three consecutive fallbacks forfeit. No cloud credits were spent by these runs.

## LIMITATIONS

TODO ? Nicoh writes this section in his own voice.

### facts for Nicoh, not his text

- Criterion (a) fails in S2/Sentinel; depth 3 does not dominate all floors or ablations.
- X1 was observed during balance tuning; it is not clean final generalization evidence.
- X2 has never run; the final-only exclusion needs a reviewed final-evaluation path before its one use.
- No live results, provider availability verification, dated price quote, hosted CI run, peer play or recording exists for this pass.
- Fixed paired seeds and small samples do not establish significance; scripted personas and conditioned testimony are synthetic.
- .55 reliability is comparatively unreliable; the independent-witness and 1/2-prior assumptions are designed, not calibrated to people.
- Headless terminal play and included key art do not constitute a complete renderer.
- Independent review of this pass, authorial AGENT-TEAM narrative and interpretation remain pending.
