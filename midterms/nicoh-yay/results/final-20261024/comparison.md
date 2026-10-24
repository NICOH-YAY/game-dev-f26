# Trial by Combat comparison

Raw counts; paired seeds; no significance claims. Judgment counts are choices; counsel is advisory. Ledger counts use binding verdicts. Model-call latency only (offline = 0). Price placeholders dated 2026-10-24.

| Player | Situation | W/D/L | Terminal reasons | HP diff avg | Exchanges avg | RELEASE/DETAIN/abstain | Binding/counsel | Passage/protection/innocent/harm | p_guilt | Illegal | Fallbacks | Calls | Latency p50/p95 ms | Tokens in/out | Est. cost USD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | S1/Aggressor | 17/2/1 | double_ko_draw:2, ko:18 | 3.00 | 8.00 | 0/20/0 | 17/3 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S1/Sentinel | 13/2/5 | time_up_win:6, ko:12, double_ko_draw:2 | 2.05 | 14.25 | 0/20/0 | 13/7 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S1/Opportunist | 18/2/0 | double_ko_draw:2, ko:18 | 4.05 | 8.15 | 0/20/0 | 18/2 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S1/Adapter | 20/0/0 | ko:11, time_up_win:9 | 4.45 | 15.30 | 0/20/0 | 20/0 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Aggressor | 14/3/3 | ko:17, double_ko_draw:3 | 2.05 | 8.10 | 20/0/0 | 14/6 | 6/0/5/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Sentinel | 5/2/13 | ko:9, time_up_win:9, time_up_draw:2 | -2.30 | 16.60 | 20/0/0 | 5/15 | 15/0/14/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Opportunist | 16/2/2 | ko:18, double_ko_draw:2 | 1.85 | 8.30 | 20/0/0 | 16/4 | 4/1/4/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Adapter | 12/3/5 | ko:13, time_up_win:4, double_ko_draw:1, time_up_draw:2 | 1.30 | 14.80 | 20/0/0 | 12/8 | 8/0/7/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Aggressor | 18/1/1 | ko:19, double_ko_draw:1 | 3.00 | 8.30 | 0/20/0 | 18/2 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Sentinel | 16/0/4 | ko:13, time_up_win:7 | 2.95 | 15.20 | 0/20/0 | 16/4 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 3.55 | 8.30 | 0/20/0 | 18/2 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Adapter | 18/1/1 | ko:12, time_up_win:7, double_ko_draw:1 | 3.80 | 14.80 | 0/20/0 | 18/2 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Aggressor | 18/2/0 | ko:18, double_ko_draw:1, time_up_draw:1 | 3.75 | 8.05 | 20/0/0 | 18/2 | 2/8/2/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Sentinel | 16/2/2 | ko:15, time_up_win:3, double_ko_draw:1, time_up_draw:1 | 3.40 | 14.70 | 20/0/0 | 16/4 | 4/7/3/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 4.55 | 6.95 | 20/0/0 | 19/1 | 1/7/0/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Adapter | 18/1/1 | ko:11, time_up_draw:1, time_up_win:8 | 3.75 | 15.85 | 20/0/0 | 18/2 | 2/8/2/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Aggressor | 19/1/0 | ko:19, double_ko_draw:1 | 4.65 | 7.60 | 0/20/0 | 19/1 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Sentinel | 12/1/7 | time_up_win:7, ko:12, double_ko_draw:1 | 1.55 | 14.90 | 0/20/0 | 12/8 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Opportunist | 19/0/1 | ko:20 | 5.25 | 7.65 | 0/20/0 | 19/1 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Adapter | 18/1/1 | ko:13, time_up_win:6, double_ko_draw:1 | 4.75 | 15.80 | 0/20/0 | 18/2 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Aggressor | 13/7/0 | ko:13, double_ko_draw:6, time_up_draw:1 | 1.60 | 8.20 | 20/0/0 | 13/7 | 7/1/7/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Sentinel | 11/1/8 | ko:13, time_up_win:6, time_up_draw:1 | 0.40 | 15.60 | 20/0/0 | 11/9 | 9/0/8/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Opportunist | 10/5/5 | ko:14, double_ko_draw:5, time_up_win:1 | 0.55 | 9.60 | 20/0/0 | 10/10 | 10/0/9/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Adapter | 12/2/6 | ko:11, time_up_win:7, time_up_draw:1, double_ko_draw:1 | 1.25 | 14.95 | 20/0/0 | 12/8 | 8/1/8/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Aggressor | 19/0/1 | ko:20 | 3.75 | 6.90 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Sentinel | 14/3/3 | time_up_draw:3, ko:11, time_up_win:6 | 2.95 | 16.00 | 0/20/0 | 14/6 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 5.05 | 7.00 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Adapter | 17/1/2 | ko:14, time_up_win:5, time_up_draw:1 | 3.85 | 15.10 | 0/20/0 | 17/3 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Aggressor | 19/1/0 | ko:19, double_ko_draw:1 | 5.25 | 6.25 | 20/0/0 | 19/1 | 1/7/0/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Sentinel | 10/1/9 | ko:12, time_up_win:7, time_up_draw:1 | 1.45 | 15.25 | 20/0/0 | 10/10 | 10/6/8/6 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Opportunist | 20/0/0 | ko:20 | 5.30 | 5.95 | 20/0/0 | 20/0 | 0/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Adapter | 19/0/1 | ko:13, time_up_win:7 | 4.90 | 15.20 | 20/0/0 | 19/1 | 1/7/0/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S1/Aggressor | 19/0/1 | ko:20 | 2.70 | 8.75 | 0/20/0 | 19/1 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S1/Sentinel | 15/0/5 | time_up_win:5, ko:15 | 2.70 | 14.30 | 0/20/0 | 15/5 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S1/Opportunist | 17/1/2 | ko:19, double_ko_draw:1 | 3.70 | 9.10 | 0/20/0 | 17/3 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S1/Adapter | 18/1/1 | ko:18, time_up_win:1, double_ko_draw:1 | 4.05 | 13.65 | 0/20/0 | 18/2 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S2/Aggressor | 9/4/7 | double_ko_draw:4, ko:15, time_up_win:1 | -0.35 | 10.35 | 20/0/0 | 9/11 | 11/0/10/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S2/Sentinel | 12/0/8 | ko:11, time_up_win:9 | 0.05 | 16.10 | 20/0/0 | 12/8 | 8/1/8/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S2/Opportunist | 15/2/3 | ko:18, double_ko_draw:2 | 1.55 | 8.45 | 20/0/0 | 15/5 | 5/1/5/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S2/Adapter | 10/7/3 | double_ko_draw:3, time_up_draw:4, ko:12, time_up_win:1 | 1.05 | 14.15 | 20/0/0 | 10/10 | 10/0/9/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S3/Aggressor | 17/1/2 | ko:19, double_ko_draw:1 | 2.70 | 9.55 | 0/20/0 | 17/3 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S3/Sentinel | 15/2/3 | ko:13, time_up_draw:2, time_up_win:5 | 3.40 | 14.70 | 0/20/0 | 15/5 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S3/Opportunist | 17/0/3 | ko:20 | 3.00 | 9.60 | 0/20/0 | 17/3 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S3/Adapter | 16/3/1 | ko:14, time_up_win:3, double_ko_draw:2, time_up_draw:1 | 3.55 | 12.30 | 0/20/0 | 16/4 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | X1/Aggressor | 17/2/1 | ko:18, double_ko_draw:2 | 3.70 | 8.05 | 20/0/0 | 17/3 | 3/7/2/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | X1/Sentinel | 18/0/2 | ko:16, time_up_win:4 | 5.45 | 13.70 | 20/0/0 | 18/2 | 2/7/1/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | X1/Opportunist | 19/0/1 | ko:20 | 4.00 | 7.40 | 20/0/0 | 19/1 | 1/8/1/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | X1/Adapter | 20/0/0 | ko:17, time_up_win:3 | 4.10 | 12.50 | 20/0/0 | 20/0 | 0/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Aggressor | 17/2/1 | double_ko_draw:2, ko:18 | 3.00 | 8.00 | 0/20/0 | 17/3 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Sentinel | 13/2/5 | time_up_win:6, ko:12, double_ko_draw:2 | 2.05 | 14.25 | 0/20/0 | 13/7 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Opportunist | 18/2/0 | double_ko_draw:2, ko:18 | 4.05 | 8.15 | 0/20/0 | 18/2 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Adapter | 20/0/0 | ko:11, time_up_win:9 | 4.45 | 15.30 | 0/20/0 | 20/0 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Aggressor | 14/3/3 | ko:17, double_ko_draw:3 | 2.05 | 8.10 | 20/0/0 | 14/6 | 6/0/5/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Sentinel | 5/2/13 | ko:9, time_up_win:9, time_up_draw:2 | -2.30 | 16.60 | 20/0/0 | 5/15 | 15/0/14/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Opportunist | 16/2/2 | ko:18, double_ko_draw:2 | 1.85 | 8.30 | 20/0/0 | 16/4 | 4/1/4/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Adapter | 12/3/5 | ko:13, time_up_win:4, double_ko_draw:1, time_up_draw:2 | 1.30 | 14.80 | 20/0/0 | 12/8 | 8/0/7/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Aggressor | 18/1/1 | ko:19, double_ko_draw:1 | 3.00 | 8.30 | 0/20/0 | 18/2 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Sentinel | 16/0/4 | ko:13, time_up_win:7 | 2.95 | 15.20 | 0/20/0 | 16/4 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 3.55 | 8.30 | 0/20/0 | 18/2 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Adapter | 18/1/1 | ko:12, time_up_win:7, double_ko_draw:1 | 3.80 | 14.80 | 0/20/0 | 18/2 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Aggressor | 18/2/0 | ko:18, double_ko_draw:1, time_up_draw:1 | 3.75 | 8.05 | 0/20/0 | 18/2 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Sentinel | 16/2/2 | ko:15, time_up_win:3, double_ko_draw:1, time_up_draw:1 | 3.40 | 14.70 | 0/20/0 | 16/4 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 4.55 | 6.95 | 0/20/0 | 19/1 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Adapter | 18/1/1 | ko:11, time_up_draw:1, time_up_win:8 | 3.75 | 15.85 | 0/20/0 | 18/2 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Aggressor | 4/0/16 | ko:15, time_up_win:5 | -3.35 | 13.85 | 0/20/0 | 4/16 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Sentinel | 12/2/6 | time_up_win:11, double_ko_draw:1, ko:7, time_up_draw:1 | 1.60 | 16.95 | 0/20/0 | 12/8 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Opportunist | 4/1/15 | ko:17, time_up_win:2, time_up_draw:1 | -3.40 | 14.05 | 0/20/0 | 4/16 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Adapter | 4/1/15 | time_up_win:7, ko:12, time_up_draw:1 | -4.20 | 14.85 | 0/20/0 | 4/16 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Aggressor | 3/0/17 | ko:18, time_up_win:2 | -3.80 | 11.45 | 20/0/0 | 3/17 | 17/0/16/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Sentinel | 7/2/11 | ko:9, time_up_win:9, double_ko_draw:1, time_up_draw:1 | -0.60 | 16.25 | 20/0/0 | 7/13 | 13/0/12/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Opportunist | 3/1/16 | ko:17, double_ko_draw:1, time_up_win:2 | -4.20 | 10.90 | 20/0/0 | 3/17 | 17/0/16/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Adapter | 5/1/14 | ko:16, time_up_draw:1, time_up_win:3 | -4.25 | 11.65 | 20/0/0 | 5/15 | 15/1/15/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Aggressor | 5/1/14 | ko:11, time_up_win:8, double_ko_draw:1 | -2.70 | 14.20 | 0/20/0 | 5/15 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Sentinel | 14/1/5 | time_up_win:16, ko:3, time_up_draw:1 | 2.30 | 17.30 | 0/20/0 | 14/6 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Opportunist | 4/2/14 | ko:14, time_up_win:4, time_up_draw:2 | -3.70 | 12.35 | 0/20/0 | 4/16 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Adapter | 5/1/14 | ko:13, time_up_win:6, double_ko_draw:1 | -4.50 | 13.45 | 0/20/0 | 5/15 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Aggressor | 5/2/13 | ko:13, time_up_win:5, double_ko_draw:1, time_up_draw:1 | -2.80 | 14.15 | 20/0/0 | 5/15 | 15/1/8/1 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Sentinel | 10/1/9 | time_up_draw:1, ko:5, time_up_win:14 | 0.70 | 17.40 | 20/0/0 | 10/10 | 10/4/6/4 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Opportunist | 4/1/15 | ko:12, time_up_win:7, time_up_draw:1 | -2.05 | 13.85 | 20/0/0 | 4/16 | 16/1/9/1 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Adapter | 6/1/13 | time_up_win:9, ko:10, time_up_draw:1 | -2.55 | 15.55 | 20/0/0 | 6/14 | 14/0/6/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Aggressor | 19/1/0 | ko:19, double_ko_draw:1 | 4.50 | 7.85 | 0/20/0 | 19/1 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Sentinel | 10/2/8 | time_up_win:5, double_ko_draw:2, ko:13 | 0.45 | 14.40 | 0/20/0 | 10/10 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Opportunist | 20/0/0 | ko:20 | 6.15 | 7.25 | 0/20/0 | 20/0 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Adapter | 14/4/2 | time_up_win:13, ko:3, time_up_draw:3, double_ko_draw:1 | 2.55 | 17.50 | 0/20/0 | 14/6 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Aggressor | 10/8/2 | double_ko_draw:8, ko:12 | 1.95 | 6.85 | 20/0/0 | 10/10 | 10/0/9/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Sentinel | 9/1/10 | ko:17, time_up_win:2, double_ko_draw:1 | -0.70 | 14.35 | 20/0/0 | 9/11 | 11/0/10/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Opportunist | 18/1/1 | double_ko_draw:1, ko:19 | 3.60 | 6.90 | 20/0/0 | 18/2 | 2/1/2/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Adapter | 8/5/7 | time_up_win:13, time_up_draw:4, double_ko_draw:1, ko:2 | -0.10 | 17.60 | 20/0/0 | 8/12 | 12/1/12/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Aggressor | 18/0/2 | ko:19, time_up_win:1 | 3.95 | 7.30 | 0/20/0 | 18/2 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Sentinel | 6/0/14 | time_up_win:7, ko:13 | -2.05 | 15.40 | 0/20/0 | 6/14 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Opportunist | 20/0/0 | ko:20 | 6.15 | 6.90 | 0/20/0 | 20/0 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Adapter | 13/4/3 | time_up_win:14, ko:2, time_up_draw:4 | 1.75 | 17.70 | 0/20/0 | 13/7 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Aggressor | 18/2/0 | ko:18, double_ko_draw:1, time_up_draw:1 | 4.75 | 6.95 | 20/0/0 | 18/2 | 2/7/1/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Sentinel | 9/1/10 | ko:15, time_up_win:4, time_up_draw:1 | -0.90 | 14.85 | 20/0/0 | 9/11 | 11/4/7/4 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Opportunist | 20/0/0 | ko:20 | 6.60 | 6.30 | 20/0/0 | 20/0 | 0/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Adapter | 15/3/2 | time_up_win:13, ko:4, time_up_draw:3 | 2.80 | 16.80 | 20/0/0 | 15/5 | 5/6/3/6 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Aggressor | 0/1/19 | ko:19, double_ko_draw:1 | -7.30 | 9.00 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Sentinel | 20/0/0 | ko:20 | 6.50 | 14.00 | 0/20/0 | 20/0 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Opportunist | 13/2/5 | ko:18, double_ko_draw:2 | 1.30 | 12.30 | 0/20/0 | 13/7 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Adapter | 4/0/16 | ko:20 | -7.95 | 8.05 | 0/20/0 | 4/16 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Aggressor | 0/0/20 | ko:20 | -9.10 | 6.15 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Sentinel | 20/0/0 | ko:19, time_up_win:1 | 4.95 | 13.35 | 20/0/0 | 20/0 | 0/1/0/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Opportunist | 7/3/10 | ko:16, time_up_win:1, double_ko_draw:3 | -1.70 | 11.00 | 20/0/0 | 7/13 | 13/0/12/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Adapter | 1/0/19 | ko:20 | -9.00 | 5.80 | 20/0/0 | 1/19 | 19/0/18/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Aggressor | 1/0/19 | ko:20 | -6.75 | 8.80 | 0/20/0 | 1/19 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Sentinel | 19/0/1 | ko:20 | 7.25 | 13.25 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Opportunist | 11/1/8 | double_ko_draw:1, ko:19 | -0.35 | 11.95 | 0/20/0 | 11/9 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Adapter | 3/1/16 | ko:19, double_ko_draw:1 | -7.00 | 8.50 | 0/20/0 | 3/17 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Aggressor | 2/0/18 | ko:20 | -6.25 | 8.70 | 20/0/0 | 2/18 | 18/1/11/1 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Sentinel | 20/0/0 | ko:19, time_up_win:1 | 7.55 | 12.75 | 20/0/0 | 20/0 | 0/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Opportunist | 16/2/2 | ko:18, double_ko_draw:2 | 2.50 | 12.95 | 20/0/0 | 16/4 | 4/5/1/5 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Adapter | 4/2/14 | double_ko_draw:2, ko:18 | -5.70 | 9.25 | 20/0/0 | 4/16 | 16/0/8/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Aggressor | 0/0/20 | ko:18, time_up_win:2 | -11.70 | 14.15 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Sentinel | 0/1/19 | time_up_win:19, time_up_draw:1 | -4.10 | 18.00 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Opportunist | 0/0/20 | ko:18, time_up_win:2 | -11.55 | 13.20 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Adapter | 0/0/20 | ko:20 | -12.00 | 11.05 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Aggressor | 0/0/20 | ko:20 | -12.00 | 12.30 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Sentinel | 0/0/20 | time_up_win:18, ko:2 | -6.60 | 17.45 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Opportunist | 0/0/20 | ko:20 | -12.00 | 11.55 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Adapter | 0/0/20 | ko:20 | -12.00 | 8.80 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Aggressor | 0/0/20 | ko:20 | -12.00 | 13.50 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Sentinel | 0/5/15 | time_up_win:14, time_up_draw:5, ko:1 | -3.10 | 17.85 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Opportunist | 0/0/20 | ko:20 | -12.00 | 12.75 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Adapter | 0/0/20 | ko:20 | -12.00 | 10.10 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Aggressor | 0/0/20 | ko:19, time_up_win:1 | -11.85 | 14.25 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Sentinel | 0/1/19 | time_up_win:18, ko:1, time_up_draw:1 | -3.65 | 18.00 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Opportunist | 0/0/20 | ko:19, time_up_win:1 | -11.85 | 13.00 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Adapter | 0/0/20 | ko:20 | -12.00 | 9.95 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S1/Aggressor | 0/0/20 | ko:20 | -12.00 | 8.45 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S1/Sentinel | 0/0/20 | time_up_win:10, ko:10 | -10.05 | 15.85 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S1/Opportunist | 0/0/20 | ko:20 | -12.00 | 7.15 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S1/Adapter | 0/0/20 | ko:20 | -12.00 | 6.15 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S2/Aggressor | 0/0/20 | ko:20 | -12.00 | 6.10 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S2/Sentinel | 0/0/20 | ko:12, time_up_win:8 | -10.75 | 14.85 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S2/Opportunist | 0/0/20 | ko:20 | -12.00 | 5.25 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S2/Adapter | 0/0/20 | ko:20 | -12.00 | 4.55 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S3/Aggressor | 0/0/20 | ko:20 | -12.00 | 8.05 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S3/Sentinel | 0/1/19 | time_up_win:14, time_up_draw:1, ko:5 | -7.10 | 16.75 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S3/Opportunist | 0/0/20 | ko:20 | -12.00 | 7.05 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | S3/Adapter | 0/0/20 | ko:20 | -12.00 | 5.80 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | X1/Aggressor | 0/0/20 | ko:20 | -12.00 | 8.20 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | X1/Sentinel | 0/0/20 | time_up_win:13, ko:7 | -8.90 | 16.75 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | X1/Opportunist | 0/0/20 | ko:20 | -12.00 | 6.60 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-recover | X1/Adapter | 0/0/20 | ko:20 | -12.00 | 5.85 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S1/Aggressor | 0/1/19 | time_up_win:18, ko:1, time_up_draw:1 | -4.20 | 17.70 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S1/Sentinel | 0/7/13 | time_up_win:13, time_up_draw:7 | -1.70 | 18.00 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S1/Opportunist | 0/10/10 | time_up_draw:10, time_up_win:10 | -1.30 | 18.00 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S1/Adapter | 0/1/19 | time_up_win:19, time_up_draw:1 | -3.40 | 18.00 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S2/Aggressor | 0/0/20 | time_up_win:15, ko:5 | -8.25 | 17.30 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S2/Sentinel | 0/0/20 | time_up_win:20 | -4.90 | 18.00 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S2/Opportunist | 0/0/20 | time_up_win:20 | -4.30 | 18.00 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S2/Adapter | 0/0/20 | time_up_win:17, ko:3 | -8.15 | 17.90 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S3/Aggressor | 0/1/19 | time_up_win:18, ko:1, time_up_draw:1 | -5.70 | 17.90 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S3/Sentinel | 0/15/5 | time_up_draw:15, time_up_win:5 | -0.60 | 18.00 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S3/Opportunist | 0/12/8 | time_up_draw:12, time_up_win:8 | -0.90 | 18.00 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S3/Adapter | 0/0/20 | time_up_win:20 | -4.75 | 18.00 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | X1/Aggressor | 0/4/16 | time_up_win:15, time_up_draw:4, ko:1 | -5.75 | 17.80 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | X1/Sentinel | 0/7/13 | time_up_draw:7, time_up_win:13 | -1.60 | 18.00 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | X1/Opportunist | 0/14/6 | time_up_win:6, time_up_draw:14 | -0.60 | 18.00 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | X1/Adapter | 0/1/19 | time_up_win:19, time_up_draw:1 | -3.50 | 18.00 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Aggressor | 5/9/6 | double_ko_draw:9, ko:11 | 0.15 | 9.90 | 0/20/0 | 5/15 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Sentinel | 18/1/1 | ko:17, time_up_win:2, double_ko_draw:1 | 5.30 | 16.45 | 0/20/0 | 18/2 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Opportunist | 19/1/0 | ko:18, double_ko_draw:1, time_up_win:1 | 5.25 | 10.50 | 0/20/0 | 19/1 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Adapter | 14/1/5 | time_up_win:13, ko:6, time_up_draw:1 | 2.15 | 16.85 | 0/20/0 | 14/6 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Aggressor | 4/1/15 | ko:19, double_ko_draw:1 | -1.30 | 7.10 | 20/0/0 | 4/16 | 16/0/15/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Sentinel | 10/3/7 | ko:14, double_ko_draw:1, time_up_win:3, time_up_draw:2 | 0.35 | 15.60 | 20/0/0 | 10/10 | 10/1/10/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Opportunist | 16/1/3 | ko:19, double_ko_draw:1 | 2.35 | 9.50 | 20/0/0 | 16/4 | 4/0/3/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Adapter | 9/4/7 | time_up_win:10, ko:6, time_up_draw:4 | 0.55 | 16.10 | 20/0/0 | 9/11 | 11/0/10/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Aggressor | 9/4/7 | ko:16, double_ko_draw:4 | 0.15 | 8.25 | 0/20/0 | 9/11 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Sentinel | 19/0/1 | time_up_win:5, ko:15 | 6.20 | 16.10 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Opportunist | 19/0/1 | ko:20 | 5.35 | 8.50 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Adapter | 15/4/1 | time_up_win:12, time_up_draw:4, ko:4 | 3.55 | 16.90 | 0/20/0 | 15/5 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Aggressor | 11/6/3 | ko:14, double_ko_draw:6 | 1.10 | 8.40 | 20/0/0 | 11/9 | 9/5/6/5 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Sentinel | 19/1/0 | ko:16, time_up_win:3, time_up_draw:1 | 5.20 | 15.20 | 20/0/0 | 19/1 | 1/7/0/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Opportunist | 20/0/0 | ko:20 | 6.30 | 8.00 | 20/0/0 | 20/0 | 0/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Adapter | 18/1/1 | time_up_win:16, ko:3, time_up_draw:1 | 3.80 | 17.35 | 20/0/0 | 18/2 | 2/7/1/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
