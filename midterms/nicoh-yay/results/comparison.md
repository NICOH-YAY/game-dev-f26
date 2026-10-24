# Trial by Combat comparison

Raw counts; paired seeds; no significance claims. Judgment counts are choices; counsel is advisory. Ledger counts use binding verdicts. Model-call latency only (offline = 0). Price placeholders dated 2026-10-24.

| Player | Situation | W/D/L | Terminal reasons | HP diff avg | Exchanges avg | RELEASE/DETAIN/abstain | Binding/counsel | Passage/protection/innocent/harm | p_guilt | Illegal | Fallbacks | Calls | Latency p50/p95 ms | Tokens in/out | Est. cost USD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | S1 | 17/3/0 | double_ko_draw:3, ko:17 | 3.00 | 7.70 | 20/0/0 | 17/3 | 3/9/3/9 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2 | 11/2/7 | ko:15, time_up_win:3, double_ko_draw:2 | 0.55 | 13.50 | 20/0/0 | 11/9 | 9/0/9/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3 | 19/1/0 | ko:19, double_ko_draw:1 | 5.20 | 7.05 | 0/20/0 | 19/1 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1 | 20/0/0 | ko:20 | 5.05 | 7.35 | 20/0/0 | 20/0 | 0/9/0/9 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1 | 13/7/0 | ko:13, double_ko_draw:7 | 2.25 | 7.60 | 20/0/0 | 13/7 | 7/6/4/6 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2 | 12/1/7 | time_up_win:6, ko:13, double_ko_draw:1 | 0.75 | 13.60 | 20/0/0 | 12/8 | 8/0/8/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3 | 13/6/1 | ko:14, double_ko_draw:6 | 2.80 | 7.50 | 0/20/0 | 13/7 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1 | 17/2/1 | ko:18, double_ko_draw:2 | 4.65 | 7.40 | 20/0/0 | 17/3 | 3/7/1/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1 | 17/3/0 | double_ko_draw:3, ko:17 | 3.00 | 7.70 | 0/20/0 | 17/3 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2 | 11/2/7 | ko:15, time_up_win:3, double_ko_draw:2 | 0.55 | 13.50 | 20/0/0 | 11/9 | 9/0/9/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3 | 19/1/0 | ko:19, double_ko_draw:1 | 5.20 | 7.05 | 0/20/0 | 19/1 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1 | 20/0/0 | ko:20 | 5.05 | 7.35 | 0/20/0 | 20/0 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1 | 0/1/19 | double_ko_draw:1, ko:19 | -6.40 | 9.20 | 20/0/0 | 0/20 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2 | 5/1/14 | ko:18, double_ko_draw:1, time_up_win:1 | -3.35 | 12.60 | 20/0/0 | 5/15 | 15/0/15/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3 | 1/1/18 | double_ko_draw:1, ko:19 | -5.80 | 9.50 | 0/20/0 | 1/19 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1 | 2/0/18 | ko:20 | -5.90 | 9.45 | 20/0/0 | 2/18 | 18/0/9/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1 | 13/7/0 | ko:13, double_ko_draw:7 | 2.20 | 7.70 | 20/0/0 | 13/7 | 7/6/4/6 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2 | 12/4/4 | time_up_win:7, ko:9, double_ko_draw:2, time_up_draw:2 | 1.10 | 14.85 | 20/0/0 | 12/8 | 8/0/8/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3 | 18/2/0 | ko:18, double_ko_draw:2 | 4.40 | 7.40 | 0/20/0 | 18/2 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1 | 18/2/0 | ko:18, double_ko_draw:2 | 5.50 | 7.20 | 20/0/0 | 18/2 | 2/7/0/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
