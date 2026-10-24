# Trial by Combat comparison

Raw counts; paired seeds; no significance claims. Judgment counts are choices; counsel is advisory. Ledger counts use binding verdicts. Model-call latency only (offline = 0). Price placeholders dated 2026-10-24.

| Player | Situation | W/D/L | Terminal reasons | HP diff avg | Exchanges avg | RELEASE/DETAIN/abstain | Binding/counsel | Passage/protection/innocent/harm | p_guilt | Illegal | Fallbacks | Calls | Latency p50/p95 ms | Tokens in/out | Est. cost USD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | S1/Aggressor | 19/0/1 | ko:20 | 2.80 | 9.30 | 0/20/0 | 19/1 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S1/Sentinel | 20/0/0 | ko:16, time_up_win:4 | 6.35 | 14.30 | 0/20/0 | 20/0 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S1/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 3.95 | 9.30 | 0/20/0 | 18/2 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S1/Adapter | 20/0/0 | ko:19, time_up_win:1 | 4.05 | 9.25 | 0/20/0 | 20/0 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Aggressor | 10/4/6 | ko:16, double_ko_draw:4 | -0.45 | 10.80 | 20/0/0 | 10/10 | 10/0/10/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Sentinel | 18/2/0 | ko:14, time_up_win:4, double_ko_draw:1, time_up_draw:1 | 3.60 | 14.35 | 20/0/0 | 18/2 | 2/0/2/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Opportunist | 15/3/2 | ko:17, double_ko_draw:3 | 1.55 | 10.55 | 20/0/0 | 15/5 | 5/0/5/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Adapter | 10/4/6 | ko:15, time_up_win:1, double_ko_draw:3, time_up_draw:1 | -0.05 | 11.35 | 20/0/0 | 10/10 | 10/0/10/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Aggressor | 19/0/1 | ko:20 | 2.80 | 9.30 | 0/20/0 | 19/1 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Sentinel | 20/0/0 | ko:16, time_up_win:4 | 6.35 | 14.30 | 0/20/0 | 20/0 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 3.95 | 9.30 | 0/20/0 | 18/2 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Adapter | 20/0/0 | ko:19, time_up_win:1 | 4.05 | 9.25 | 0/20/0 | 20/0 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Aggressor | 19/0/1 | ko:20 | 2.80 | 9.30 | 20/0/0 | 19/1 | 1/9/1/9 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Sentinel | 20/0/0 | ko:16, time_up_win:4 | 6.35 | 14.30 | 20/0/0 | 20/0 | 0/9/0/9 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 3.95 | 9.30 | 20/0/0 | 18/2 | 2/8/1/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Adapter | 20/0/0 | ko:19, time_up_win:1 | 4.05 | 9.25 | 20/0/0 | 20/0 | 0/9/0/9 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Aggressor | 16/2/2 | time_up_win:2, ko:16, double_ko_draw:2 | 3.15 | 9.25 | 0/20/0 | 16/4 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Sentinel | 20/0/0 | ko:18, time_up_win:2 | 6.50 | 13.20 | 0/20/0 | 20/0 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Opportunist | 20/0/0 | ko:20 | 5.75 | 7.20 | 0/20/0 | 20/0 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Adapter | 18/2/0 | time_up_win:1, ko:17, double_ko_draw:2 | 6.05 | 9.45 | 0/20/0 | 18/2 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Aggressor | 9/5/6 | ko:15, double_ko_draw:5 | 0.15 | 8.95 | 20/0/0 | 9/11 | 11/0/11/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Sentinel | 18/2/0 | ko:16, double_ko_draw:2, time_up_win:2 | 3.65 | 13.20 | 20/0/0 | 18/2 | 2/0/2/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Opportunist | 11/5/4 | ko:14, time_up_win:1, double_ko_draw:4, time_up_draw:1 | 0.95 | 9.70 | 20/0/0 | 11/9 | 9/0/9/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Adapter | 17/1/2 | ko:19, double_ko_draw:1 | 3.20 | 10.15 | 20/0/0 | 17/3 | 3/0/3/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Aggressor | 16/2/2 | time_up_win:2, ko:16, double_ko_draw:2 | 3.15 | 9.25 | 0/20/0 | 16/4 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Sentinel | 20/0/0 | ko:18, time_up_win:2 | 6.50 | 13.20 | 0/20/0 | 20/0 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Opportunist | 20/0/0 | ko:20 | 5.75 | 7.20 | 0/20/0 | 20/0 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Adapter | 18/2/0 | time_up_win:1, ko:17, double_ko_draw:2 | 6.05 | 9.45 | 0/20/0 | 18/2 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Aggressor | 16/2/2 | time_up_win:2, ko:16, double_ko_draw:2 | 3.15 | 9.25 | 20/0/0 | 16/4 | 4/5/0/5 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Sentinel | 20/0/0 | ko:18, time_up_win:2 | 6.50 | 13.20 | 20/0/0 | 20/0 | 0/9/0/9 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Opportunist | 20/0/0 | ko:20 | 5.75 | 7.20 | 20/0/0 | 20/0 | 0/9/0/9 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Adapter | 18/2/0 | time_up_win:1, ko:17, double_ko_draw:2 | 6.05 | 9.45 | 20/0/0 | 18/2 | 2/7/0/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Aggressor | 19/0/1 | ko:20 | 2.80 | 9.30 | 0/20/0 | 19/1 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Sentinel | 20/0/0 | ko:16, time_up_win:4 | 6.35 | 14.30 | 0/20/0 | 20/0 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 3.95 | 9.30 | 0/20/0 | 18/2 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Adapter | 20/0/0 | ko:19, time_up_win:1 | 4.05 | 9.25 | 0/20/0 | 20/0 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Aggressor | 10/4/6 | ko:16, double_ko_draw:4 | -0.45 | 10.80 | 20/0/0 | 10/10 | 10/0/10/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Sentinel | 18/2/0 | ko:14, time_up_win:4, double_ko_draw:1, time_up_draw:1 | 3.60 | 14.35 | 20/0/0 | 18/2 | 2/0/2/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Opportunist | 15/3/2 | ko:17, double_ko_draw:3 | 1.55 | 10.55 | 20/0/0 | 15/5 | 5/0/5/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Adapter | 10/4/6 | ko:15, time_up_win:1, double_ko_draw:3, time_up_draw:1 | -0.05 | 11.35 | 20/0/0 | 10/10 | 10/0/10/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Aggressor | 19/0/1 | ko:20 | 2.80 | 9.30 | 0/20/0 | 19/1 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Sentinel | 20/0/0 | ko:16, time_up_win:4 | 6.35 | 14.30 | 0/20/0 | 20/0 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 3.95 | 9.30 | 0/20/0 | 18/2 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Adapter | 20/0/0 | ko:19, time_up_win:1 | 4.05 | 9.25 | 0/20/0 | 20/0 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Aggressor | 19/0/1 | ko:20 | 2.80 | 9.30 | 0/20/0 | 19/1 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Sentinel | 20/0/0 | ko:16, time_up_win:4 | 6.35 | 14.30 | 0/20/0 | 20/0 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 3.95 | 9.30 | 0/20/0 | 18/2 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Adapter | 20/0/0 | ko:19, time_up_win:1 | 4.05 | 9.25 | 0/20/0 | 20/0 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Aggressor | 4/0/16 | time_up_win:8, ko:12 | -3.25 | 14.55 | 0/20/0 | 4/16 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Sentinel | 13/3/4 | time_up_win:11, double_ko_draw:1, ko:6, time_up_draw:2 | 3.20 | 17.20 | 0/20/0 | 13/7 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Opportunist | 6/1/13 | ko:16, time_up_win:3, time_up_draw:1 | -3.15 | 14.00 | 0/20/0 | 6/14 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Adapter | 3/0/17 | time_up_win:7, ko:13 | -4.25 | 14.35 | 0/20/0 | 3/17 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Aggressor | 2/1/17 | ko:17, time_up_win:2, time_up_draw:1 | -5.70 | 11.95 | 20/0/0 | 2/18 | 18/0/18/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Sentinel | 8/3/9 | time_up_win:9, ko:8, double_ko_draw:1, time_up_draw:2 | -0.25 | 16.20 | 20/0/0 | 8/12 | 12/0/12/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Opportunist | 1/0/19 | ko:19, time_up_win:1 | -5.30 | 11.75 | 20/0/0 | 1/19 | 19/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Adapter | 1/2/17 | ko:16, double_ko_draw:1, time_up_win:2, time_up_draw:1 | -6.40 | 12.35 | 20/0/0 | 1/19 | 19/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Aggressor | 4/0/16 | time_up_win:8, ko:12 | -3.25 | 14.55 | 0/20/0 | 4/16 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Sentinel | 13/3/4 | time_up_win:11, double_ko_draw:1, ko:6, time_up_draw:2 | 3.20 | 17.20 | 0/20/0 | 13/7 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Opportunist | 6/1/13 | ko:16, time_up_win:3, time_up_draw:1 | -3.15 | 14.00 | 0/20/0 | 6/14 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Adapter | 3/0/17 | time_up_win:7, ko:13 | -4.25 | 14.35 | 0/20/0 | 3/17 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Aggressor | 4/0/16 | time_up_win:8, ko:12 | -3.25 | 14.55 | 20/0/0 | 4/16 | 16/2/9/2 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Sentinel | 13/3/4 | time_up_win:11, double_ko_draw:1, ko:6, time_up_draw:2 | 3.20 | 17.20 | 20/0/0 | 13/7 | 7/7/5/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Opportunist | 6/1/13 | ko:16, time_up_win:3, time_up_draw:1 | -3.15 | 14.00 | 20/0/0 | 6/14 | 14/3/8/3 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Adapter | 3/0/17 | time_up_win:7, ko:13 | -4.25 | 14.35 | 20/0/0 | 3/17 | 17/2/10/2 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Aggressor | 16/2/2 | time_up_win:4, ko:14, double_ko_draw:2 | 2.90 | 9.65 | 0/20/0 | 16/4 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Sentinel | 16/1/3 | time_up_win:8, ko:11, time_up_draw:1 | 3.55 | 16.30 | 0/20/0 | 16/4 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Opportunist | 20/0/0 | ko:20 | 6.15 | 7.05 | 0/20/0 | 20/0 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Adapter | 19/1/0 | ko:17, double_ko_draw:1, time_up_win:2 | 7.45 | 9.50 | 0/20/0 | 19/1 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Aggressor | 7/7/6 | time_up_win:3, double_ko_draw:7, ko:10 | 0.25 | 8.90 | 20/0/0 | 7/13 | 13/0/13/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Sentinel | 11/2/7 | time_up_win:9, double_ko_draw:2, ko:9 | 0.70 | 16.30 | 20/0/0 | 11/9 | 9/0/9/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Opportunist | 17/2/1 | ko:18, double_ko_draw:2 | 3.00 | 6.95 | 20/0/0 | 17/3 | 3/0/3/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Adapter | 19/0/1 | ko:18, time_up_win:2 | 4.45 | 9.40 | 20/0/0 | 19/1 | 1/0/1/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Aggressor | 16/2/2 | time_up_win:4, ko:14, double_ko_draw:2 | 2.90 | 9.65 | 0/20/0 | 16/4 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Sentinel | 16/1/3 | time_up_win:8, ko:11, time_up_draw:1 | 3.55 | 16.30 | 0/20/0 | 16/4 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Opportunist | 20/0/0 | ko:20 | 6.15 | 7.05 | 0/20/0 | 20/0 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Adapter | 19/1/0 | ko:17, double_ko_draw:1, time_up_win:2 | 7.45 | 9.50 | 0/20/0 | 19/1 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Aggressor | 16/2/2 | time_up_win:4, ko:14, double_ko_draw:2 | 2.90 | 9.65 | 20/0/0 | 16/4 | 4/5/0/5 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Sentinel | 16/1/3 | time_up_win:8, ko:11, time_up_draw:1 | 3.55 | 16.30 | 20/0/0 | 16/4 | 4/7/2/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Opportunist | 20/0/0 | ko:20 | 6.15 | 7.05 | 20/0/0 | 20/0 | 0/9/0/9 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Adapter | 19/1/0 | ko:17, double_ko_draw:1, time_up_win:2 | 7.45 | 9.50 | 20/0/0 | 19/1 | 1/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Aggressor | 1/1/18 | ko:19, double_ko_draw:1 | -6.75 | 9.35 | 0/20/0 | 1/19 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Sentinel | 20/0/0 | ko:20 | 7.40 | 13.20 | 0/20/0 | 20/0 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Opportunist | 14/1/5 | ko:19, double_ko_draw:1 | 1.60 | 12.20 | 0/20/0 | 14/6 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Adapter | 8/0/12 | ko:20 | -2.45 | 10.65 | 0/20/0 | 8/12 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Aggressor | 0/0/20 | ko:20 | -8.30 | 6.75 | 20/0/0 | 0/20 | 20/0/20/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Sentinel | 18/0/2 | ko:20 | 3.90 | 12.60 | 20/0/0 | 18/2 | 2/0/2/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Opportunist | 9/0/11 | ko:20 | -1.85 | 10.40 | 20/0/0 | 9/11 | 11/0/11/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Adapter | 4/1/15 | ko:19, double_ko_draw:1 | -6.20 | 7.50 | 20/0/0 | 4/16 | 16/0/16/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Aggressor | 1/1/18 | ko:19, double_ko_draw:1 | -6.75 | 9.35 | 0/20/0 | 1/19 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Sentinel | 20/0/0 | ko:20 | 7.40 | 13.20 | 0/20/0 | 20/0 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Opportunist | 14/1/5 | ko:19, double_ko_draw:1 | 1.60 | 12.20 | 0/20/0 | 14/6 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Adapter | 8/0/12 | ko:20 | -2.45 | 10.65 | 0/20/0 | 8/12 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Aggressor | 1/1/18 | ko:19, double_ko_draw:1 | -6.75 | 9.35 | 20/0/0 | 1/19 | 19/1/11/1 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Sentinel | 20/0/0 | ko:20 | 7.40 | 13.20 | 20/0/0 | 20/0 | 0/9/0/9 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Opportunist | 14/1/5 | ko:19, double_ko_draw:1 | 1.60 | 12.20 | 20/0/0 | 14/6 | 6/6/3/6 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Adapter | 8/0/12 | ko:20 | -2.45 | 10.65 | 20/0/0 | 8/12 | 12/6/9/6 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Aggressor | 0/0/20 | ko:8, time_up_win:12 | -8.85 | 16.55 | 0/20/0 | 0/20 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Sentinel | 0/2/18 | time_up_win:16, time_up_draw:2, ko:2 | -4.05 | 17.90 | 0/20/0 | 0/20 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Opportunist | 0/0/20 | ko:18, time_up_win:2 | -11.55 | 13.15 | 0/20/0 | 0/20 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Adapter | 0/0/20 | ko:8, time_up_win:12 | -8.85 | 16.55 | 0/20/0 | 0/20 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Aggressor | 0/0/20 | ko:13, time_up_win:7 | -10.65 | 14.45 | 20/0/0 | 0/20 | 20/0/20/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Sentinel | 0/0/20 | time_up_win:17, ko:3 | -6.75 | 17.40 | 20/0/0 | 0/20 | 20/0/20/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Opportunist | 0/0/20 | ko:19, time_up_win:1 | -11.85 | 11.10 | 20/0/0 | 0/20 | 20/0/20/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Adapter | 0/0/20 | ko:13, time_up_win:7 | -10.65 | 14.45 | 20/0/0 | 0/20 | 20/0/20/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Aggressor | 0/0/20 | ko:8, time_up_win:12 | -8.85 | 16.55 | 0/20/0 | 0/20 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Sentinel | 0/2/18 | time_up_win:16, time_up_draw:2, ko:2 | -4.05 | 17.90 | 0/20/0 | 0/20 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Opportunist | 0/0/20 | ko:18, time_up_win:2 | -11.55 | 13.15 | 0/20/0 | 0/20 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Adapter | 0/0/20 | ko:8, time_up_win:12 | -8.85 | 16.55 | 0/20/0 | 0/20 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Aggressor | 0/0/20 | ko:8, time_up_win:12 | -8.85 | 16.55 | 20/0/0 | 0/20 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Sentinel | 0/2/18 | time_up_win:16, time_up_draw:2, ko:2 | -4.05 | 17.90 | 20/0/0 | 0/20 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Opportunist | 0/0/20 | ko:18, time_up_win:2 | -11.55 | 13.15 | 20/0/0 | 0/20 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Adapter | 0/0/20 | ko:8, time_up_win:12 | -8.85 | 16.55 | 20/0/0 | 0/20 | 20/0/11/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Aggressor | 7/7/6 | double_ko_draw:7, ko:13 | 0.65 | 10.15 | 0/20/0 | 7/13 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Sentinel | 19/1/0 | ko:16, time_up_draw:1, time_up_win:3 | 5.70 | 16.10 | 0/20/0 | 19/1 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Opportunist | 19/1/0 | ko:18, double_ko_draw:1, time_up_win:1 | 5.35 | 10.00 | 0/20/0 | 19/1 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Adapter | 19/0/1 | ko:20 | 4.80 | 9.70 | 0/20/0 | 19/1 | 20/0/6/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Aggressor | 4/1/15 | ko:19, double_ko_draw:1 | -1.50 | 8.10 | 20/0/0 | 4/16 | 16/0/16/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Sentinel | 13/4/3 | ko:13, double_ko_draw:3, time_up_win:3, time_up_draw:1 | 2.70 | 16.05 | 20/0/0 | 13/7 | 7/0/7/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Opportunist | 16/1/3 | ko:18, double_ko_draw:1, time_up_win:1 | 2.15 | 9.70 | 20/0/0 | 16/4 | 4/0/4/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Adapter | 16/0/4 | ko:20 | 1.80 | 9.25 | 20/0/0 | 16/4 | 4/0/4/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Aggressor | 7/7/6 | double_ko_draw:7, ko:13 | 0.65 | 10.15 | 0/20/0 | 7/13 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Sentinel | 19/1/0 | ko:16, time_up_draw:1, time_up_win:3 | 5.70 | 16.10 | 0/20/0 | 19/1 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Opportunist | 19/1/0 | ko:18, double_ko_draw:1, time_up_win:1 | 5.35 | 10.00 | 0/20/0 | 19/1 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Adapter | 19/0/1 | ko:20 | 4.80 | 9.70 | 0/20/0 | 19/1 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Aggressor | 7/7/6 | double_ko_draw:7, ko:13 | 0.65 | 10.15 | 20/0/0 | 7/13 | 13/1/5/1 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Sentinel | 19/1/0 | ko:16, time_up_draw:1, time_up_win:3 | 5.70 | 16.10 | 20/0/0 | 19/1 | 1/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Opportunist | 19/1/0 | ko:18, double_ko_draw:1, time_up_win:1 | 5.35 | 10.00 | 20/0/0 | 19/1 | 1/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Adapter | 19/0/1 | ko:20 | 4.80 | 9.70 | 20/0/0 | 19/1 | 1/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
