# Trial by Combat comparison

Raw counts; paired seeds; no significance claims. Judgment counts are choices; counsel is advisory. Ledger counts use binding verdicts. Model-call latency only (offline = 0). Price placeholders dated 2026-10-24.

| Player | Situation | W/D/L | Terminal reasons | HP diff avg | Exchanges avg | RELEASE/DETAIN/abstain | Binding/counsel | Passage/protection/innocent/harm | p_guilt | Illegal | Fallbacks | Calls | Latency p50/p95 ms | Tokens in/out | Est. cost USD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | S1/Aggressor | 17/0/3 | ko:20 | 2.55 | 9.80 | 0/20/0 | 17/3 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S1/Sentinel | 12/3/5 | time_up_win:3, double_ko_draw:2, ko:14, time_up_draw:1 | 2.15 | 12.95 | 0/20/0 | 12/8 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S1/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 4.50 | 9.20 | 0/20/0 | 18/2 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S1/Adapter | 16/0/4 | time_up_win:1, ko:19 | 2.45 | 12.90 | 0/20/0 | 16/4 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Aggressor | 11/2/7 | ko:17, double_ko_draw:2, time_up_win:1 | 0.25 | 10.70 | 20/0/0 | 11/9 | 9/0/8/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Sentinel | 11/2/7 | ko:13, time_up_win:5, time_up_draw:2 | 0.80 | 15.10 | 20/0/0 | 11/9 | 9/0/8/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Opportunist | 17/2/1 | ko:18, double_ko_draw:2 | 3.50 | 8.05 | 20/0/0 | 17/3 | 3/0/2/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S2/Adapter | 12/4/4 | ko:16, time_up_draw:1, double_ko_draw:3 | 1.20 | 12.05 | 20/0/0 | 12/8 | 8/0/7/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Aggressor | 15/1/4 | ko:18, time_up_win:1, time_up_draw:1 | 1.65 | 9.85 | 0/20/0 | 15/5 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Sentinel | 14/1/5 | ko:15, time_up_win:4, double_ko_draw:1 | 2.35 | 13.85 | 0/20/0 | 14/6 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Opportunist | 19/0/1 | ko:20 | 4.30 | 8.55 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | S3/Adapter | 17/2/1 | ko:18, time_up_draw:1, double_ko_draw:1 | 3.20 | 11.75 | 0/20/0 | 17/3 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Aggressor | 16/1/3 | ko:19, double_ko_draw:1 | 2.85 | 7.90 | 20/0/0 | 16/4 | 4/7/3/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Sentinel | 17/1/2 | ko:14, time_up_win:5, double_ko_draw:1 | 4.10 | 13.75 | 20/0/0 | 17/3 | 3/8/3/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 4.15 | 6.65 | 20/0/0 | 18/2 | 2/7/1/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline | X1/Adapter | 16/1/3 | ko:19, time_up_draw:1 | 3.20 | 11.65 | 20/0/0 | 16/4 | 4/7/3/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Aggressor | 16/3/1 | ko:17, double_ko_draw:3 | 4.15 | 8.75 | 0/20/0 | 16/4 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Sentinel | 16/0/4 | ko:19, time_up_win:1 | 3.70 | 12.15 | 0/20/0 | 16/4 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Opportunist | 19/0/1 | ko:20 | 5.95 | 8.50 | 0/20/0 | 19/1 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S1/Adapter | 19/0/1 | ko:20 | 3.95 | 10.25 | 0/20/0 | 19/1 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Aggressor | 14/0/6 | ko:20 | 0.75 | 9.05 | 20/0/0 | 14/6 | 6/1/6/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Sentinel | 12/1/7 | ko:16, time_up_win:3, time_up_draw:1 | 1.20 | 13.50 | 20/0/0 | 12/8 | 8/0/7/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Opportunist | 19/0/1 | ko:20 | 4.20 | 7.90 | 20/0/0 | 19/1 | 1/1/1/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2/Adapter | 17/0/3 | ko:20 | 2.30 | 9.60 | 20/0/0 | 17/3 | 3/1/3/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Aggressor | 16/2/2 | ko:18, double_ko_draw:2 | 2.30 | 8.25 | 0/20/0 | 16/4 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Sentinel | 17/1/2 | ko:17, time_up_win:2, double_ko_draw:1 | 5.30 | 13.20 | 0/20/0 | 17/3 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 5.15 | 7.75 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3/Adapter | 18/0/2 | ko:20 | 4.55 | 10.00 | 0/20/0 | 18/2 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Aggressor | 17/1/2 | ko:19, double_ko_draw:1 | 3.10 | 7.45 | 20/0/0 | 17/3 | 3/7/2/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Sentinel | 17/0/3 | ko:19, time_up_win:1 | 5.65 | 12.90 | 20/0/0 | 17/3 | 3/7/2/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 5.70 | 6.90 | 20/0/0 | 19/1 | 1/7/0/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1/Adapter | 18/0/2 | ko:19, time_up_win:1 | 4.45 | 9.80 | 20/0/0 | 18/2 | 2/8/2/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S1/Aggressor | 18/1/1 | ko:19, double_ko_draw:1 | 3.55 | 9.25 | 0/20/0 | 18/2 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S1/Sentinel | 14/2/4 | time_up_win:2, ko:16, double_ko_draw:1, time_up_draw:1 | 3.15 | 13.85 | 0/20/0 | 14/6 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S1/Opportunist | 18/1/1 | ko:18, time_up_win:1, double_ko_draw:1 | 4.45 | 9.65 | 0/20/0 | 18/2 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S1/Adapter | 17/1/2 | time_up_win:2, ko:17, double_ko_draw:1 | 2.55 | 12.70 | 0/20/0 | 17/3 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S2/Aggressor | 11/2/7 | ko:17, double_ko_draw:2, time_up_win:1 | 0.90 | 10.45 | 20/0/0 | 11/9 | 9/0/8/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S2/Sentinel | 16/1/3 | ko:16, time_up_win:3, time_up_draw:1 | 1.95 | 15.10 | 20/0/0 | 16/4 | 4/1/4/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S2/Opportunist | 15/2/3 | ko:18, double_ko_draw:2 | 2.60 | 8.40 | 20/0/0 | 15/5 | 5/0/4/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S2/Adapter | 12/1/7 | ko:19, double_ko_draw:1 | 0.00 | 11.60 | 20/0/0 | 12/8 | 8/1/8/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S3/Aggressor | 15/1/4 | ko:18, time_up_win:1, time_up_draw:1 | 1.80 | 9.85 | 0/20/0 | 15/5 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S3/Sentinel | 15/3/2 | ko:13, time_up_win:4, double_ko_draw:2, time_up_draw:1 | 2.80 | 13.60 | 0/20/0 | 15/5 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S3/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 5.15 | 8.40 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | S3/Adapter | 18/1/1 | ko:19, double_ko_draw:1 | 3.45 | 11.45 | 0/20/0 | 18/2 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | X1/Aggressor | 17/0/3 | ko:20 | 3.25 | 7.80 | 20/0/0 | 17/3 | 3/7/2/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | X1/Sentinel | 16/1/3 | ko:17, time_up_win:2, double_ko_draw:1 | 3.95 | 13.85 | 20/0/0 | 16/4 | 4/7/3/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | X1/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 4.50 | 6.40 | 20/0/0 | 19/1 | 1/8/1/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-agnostic | X1/Adapter | 17/1/2 | ko:19, time_up_draw:1 | 3.45 | 11.60 | 20/0/0 | 17/3 | 3/7/2/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Aggressor | 17/0/3 | ko:20 | 2.55 | 9.80 | 0/20/0 | 17/3 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Sentinel | 12/3/5 | time_up_win:3, double_ko_draw:2, ko:14, time_up_draw:1 | 2.15 | 12.95 | 0/20/0 | 12/8 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 4.50 | 9.20 | 0/20/0 | 18/2 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S1/Adapter | 16/0/4 | time_up_win:1, ko:19 | 2.45 | 12.90 | 0/20/0 | 16/4 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Aggressor | 11/2/7 | ko:17, double_ko_draw:2, time_up_win:1 | 0.25 | 10.70 | 20/0/0 | 11/9 | 9/0/8/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Sentinel | 11/2/7 | ko:13, time_up_win:5, time_up_draw:2 | 0.80 | 15.10 | 20/0/0 | 11/9 | 9/0/8/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Opportunist | 17/2/1 | ko:18, double_ko_draw:2 | 3.50 | 8.05 | 20/0/0 | 17/3 | 3/0/2/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S2/Adapter | 12/4/4 | ko:16, time_up_draw:1, double_ko_draw:3 | 1.20 | 12.05 | 20/0/0 | 12/8 | 8/0/7/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Aggressor | 15/1/4 | ko:18, time_up_win:1, time_up_draw:1 | 1.65 | 9.85 | 0/20/0 | 15/5 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Sentinel | 14/1/5 | ko:15, time_up_win:4, double_ko_draw:1 | 2.35 | 13.85 | 0/20/0 | 14/6 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Opportunist | 19/0/1 | ko:20 | 4.30 | 8.55 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | S3/Adapter | 17/2/1 | ko:18, time_up_draw:1, double_ko_draw:1 | 3.20 | 11.75 | 0/20/0 | 17/3 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Aggressor | 16/1/3 | ko:19, double_ko_draw:1 | 2.85 | 7.90 | 0/20/0 | 16/4 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Sentinel | 17/1/2 | ko:14, time_up_win:5, double_ko_draw:1 | 4.10 | 13.75 | 0/20/0 | 17/3 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Opportunist | 18/1/1 | ko:19, double_ko_draw:1 | 4.15 | 6.65 | 0/20/0 | 18/2 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-weighted | X1/Adapter | 16/1/3 | ko:19, time_up_draw:1 | 3.20 | 11.65 | 0/20/0 | 16/4 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Aggressor | 6/1/13 | ko:16, time_up_win:3, time_up_draw:1 | -2.25 | 13.20 | 0/20/0 | 6/14 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Sentinel | 11/1/8 | time_up_draw:1, ko:10, time_up_win:9 | 0.60 | 16.05 | 0/20/0 | 11/9 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Opportunist | 5/0/15 | ko:17, time_up_win:3 | -2.25 | 13.40 | 0/20/0 | 5/15 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S1/Adapter | 4/1/15 | ko:16, double_ko_draw:1, time_up_win:3 | -4.15 | 14.05 | 0/20/0 | 4/16 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Aggressor | 3/1/16 | ko:17, double_ko_draw:1, time_up_win:2 | -3.05 | 10.80 | 20/0/0 | 3/17 | 17/0/16/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Sentinel | 8/2/10 | ko:13, time_up_win:5, double_ko_draw:2 | -1.00 | 15.25 | 20/0/0 | 8/12 | 12/0/11/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Opportunist | 5/1/14 | ko:18, double_ko_draw:1, time_up_win:1 | -3.00 | 10.30 | 20/0/0 | 5/15 | 15/0/14/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S2/Adapter | 5/1/14 | ko:18, time_up_draw:1, time_up_win:1 | -4.20 | 11.05 | 20/0/0 | 5/15 | 15/1/15/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Aggressor | 5/1/14 | ko:13, time_up_win:6, time_up_draw:1 | -2.60 | 13.45 | 0/20/0 | 5/15 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Sentinel | 14/1/5 | time_up_win:14, ko:5, time_up_draw:1 | 1.90 | 16.80 | 0/20/0 | 14/6 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Opportunist | 6/1/13 | ko:17, time_up_win:2, time_up_draw:1 | -2.55 | 11.65 | 0/20/0 | 6/14 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | S3/Adapter | 4/0/16 | ko:16, time_up_win:4 | -4.80 | 12.40 | 0/20/0 | 4/16 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Aggressor | 6/3/11 | ko:15, double_ko_draw:1, time_up_win:2, time_up_draw:2 | -2.15 | 13.70 | 20/0/0 | 6/14 | 14/1/7/1 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Sentinel | 9/1/10 | time_up_win:10, ko:9, time_up_draw:1 | -0.55 | 16.05 | 20/0/0 | 9/11 | 11/4/7/4 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Opportunist | 7/1/12 | ko:14, time_up_draw:1, time_up_win:5 | -1.05 | 13.40 | 20/0/0 | 7/13 | 13/1/6/1 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| random | X1/Adapter | 5/1/14 | time_up_win:7, ko:12, time_up_draw:1 | -2.80 | 15.10 | 20/0/0 | 5/15 | 15/0/7/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Aggressor | 17/2/1 | ko:18, double_ko_draw:2 | 3.45 | 7.70 | 0/20/0 | 17/3 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Sentinel | 6/0/14 | ko:20 | -3.20 | 11.30 | 0/20/0 | 6/14 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Opportunist | 20/0/0 | ko:20 | 5.55 | 7.20 | 0/20/0 | 20/0 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S1/Adapter | 2/2/16 | time_up_win:7, double_ko_draw:1, ko:11, time_up_draw:1 | -3.65 | 16.10 | 0/20/0 | 2/18 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Aggressor | 10/7/3 | double_ko_draw:7, ko:13 | 1.45 | 6.75 | 20/0/0 | 10/10 | 10/0/9/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Sentinel | 4/1/15 | ko:19, double_ko_draw:1 | -2.90 | 11.25 | 20/0/0 | 4/16 | 16/0/15/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Opportunist | 18/0/2 | ko:20 | 3.05 | 6.50 | 20/0/0 | 18/2 | 2/1/2/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S2/Adapter | 0/0/20 | ko:19, time_up_win:1 | -5.85 | 12.55 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Aggressor | 17/1/2 | ko:19, double_ko_draw:1 | 3.60 | 6.95 | 0/20/0 | 17/3 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Sentinel | 4/1/15 | ko:18, time_up_win:1, double_ko_draw:1 | -4.50 | 12.05 | 0/20/0 | 4/16 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 5.65 | 6.75 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | S3/Adapter | 1/0/19 | ko:11, time_up_win:9 | -5.00 | 15.90 | 0/20/0 | 1/19 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Aggressor | 18/1/1 | ko:19, double_ko_draw:1 | 4.10 | 6.80 | 20/0/0 | 18/2 | 2/7/1/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Sentinel | 3/0/17 | ko:20 | -4.00 | 11.60 | 20/0/0 | 3/17 | 17/2/11/2 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Opportunist | 20/0/0 | ko:20 | 6.25 | 6.30 | 20/0/0 | 20/0 | 0/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-strike | X1/Adapter | 4/2/14 | time_up_win:7, ko:11, time_up_draw:2 | -3.30 | 15.50 | 20/0/0 | 4/16 | 16/2/10/2 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Aggressor | 1/0/19 | ko:20 | -7.10 | 8.90 | 0/20/0 | 1/19 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Sentinel | 20/0/0 | ko:20 | 6.50 | 13.90 | 0/20/0 | 20/0 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Opportunist | 16/0/4 | ko:20 | 2.30 | 10.75 | 0/20/0 | 16/4 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S1/Adapter | 5/0/15 | ko:20 | -7.35 | 7.70 | 0/20/0 | 5/15 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Aggressor | 0/0/20 | ko:20 | -9.00 | 6.15 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Sentinel | 20/0/0 | ko:19, time_up_win:1 | 5.10 | 13.20 | 20/0/0 | 20/0 | 0/1/0/1 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Opportunist | 11/0/9 | ko:20 | -1.00 | 10.00 | 20/0/0 | 11/9 | 9/0/8/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S2/Adapter | 1/0/19 | ko:20 | -8.50 | 5.70 | 20/0/0 | 1/19 | 19/0/18/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Aggressor | 1/0/19 | ko:20 | -6.70 | 8.80 | 0/20/0 | 1/19 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Sentinel | 19/0/1 | ko:20 | 7.25 | 12.85 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Opportunist | 12/0/8 | ko:20 | 0.45 | 10.85 | 0/20/0 | 12/8 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | S3/Adapter | 5/0/15 | ko:20 | -6.10 | 8.05 | 0/20/0 | 5/15 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Aggressor | 2/0/18 | ko:20 | -6.10 | 8.70 | 20/0/0 | 2/18 | 18/1/11/1 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Sentinel | 20/0/0 | ko:19, time_up_win:1 | 7.70 | 12.60 | 20/0/0 | 20/0 | 0/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Opportunist | 18/0/2 | ko:20 | 3.55 | 11.10 | 20/0/0 | 18/2 | 2/6/0/6 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-bash | X1/Adapter | 7/2/11 | ko:18, double_ko_draw:2 | -4.40 | 8.60 | 20/0/0 | 7/13 | 13/2/7/2 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Aggressor | 0/0/20 | ko:18, time_up_win:2 | -9.15 | 14.15 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Sentinel | 4/0/16 | time_up_win:20 | -2.00 | 18.00 | 0/20/0 | 4/16 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Opportunist | 0/0/20 | ko:18, time_up_win:2 | -9.75 | 13.20 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S1/Adapter | 0/0/20 | ko:20 | -10.90 | 11.05 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Aggressor | 0/0/20 | ko:20 | -9.70 | 12.30 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Sentinel | 0/1/19 | time_up_win:17, ko:2, time_up_draw:1 | -4.75 | 17.45 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Opportunist | 0/0/20 | ko:20 | -10.45 | 11.55 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S2/Adapter | 0/0/20 | ko:20 | -11.00 | 8.80 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Aggressor | 0/0/20 | ko:20 | -9.80 | 13.50 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Sentinel | 7/1/12 | time_up_win:18, time_up_draw:1, ko:1 | -1.45 | 17.85 | 0/20/0 | 7/13 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Opportunist | 0/0/20 | ko:20 | -10.30 | 12.75 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | S3/Adapter | 0/0/20 | ko:20 | -10.95 | 10.10 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Aggressor | 0/0/20 | ko:19, time_up_win:1 | -9.45 | 14.25 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Sentinel | 4/4/12 | time_up_draw:4, time_up_win:15, ko:1 | -1.85 | 18.00 | 20/0/0 | 4/16 | 16/1/9/1 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Opportunist | 0/0/20 | ko:19, time_up_win:1 | -10.10 | 13.00 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-guard | X1/Adapter | 0/0/20 | ko:20 | -10.85 | 9.95 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
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
| always-sidestep | S1/Aggressor | 0/2/18 | time_up_win:17, ko:1, time_up_draw:2 | -3.60 | 17.70 | 0/20/0 | 0/20 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S1/Sentinel | 5/4/11 | time_up_win:16, time_up_draw:4 | -0.85 | 18.00 | 0/20/0 | 5/15 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S1/Opportunist | 16/2/2 | time_up_win:18, time_up_draw:2 | 2.35 | 18.00 | 0/20/0 | 16/4 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S1/Adapter | 1/0/19 | time_up_win:20 | -3.10 | 18.00 | 0/20/0 | 1/19 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S2/Aggressor | 0/0/20 | time_up_win:15, ko:5 | -7.90 | 17.30 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S2/Sentinel | 0/0/20 | time_up_win:20 | -4.00 | 18.00 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S2/Opportunist | 6/3/11 | time_up_draw:3, time_up_win:17 | -0.95 | 18.00 | 20/0/0 | 6/14 | 14/0/13/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S2/Adapter | 0/0/20 | time_up_win:17, ko:3 | -7.90 | 17.90 | 20/0/0 | 0/20 | 20/0/19/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S3/Aggressor | 0/1/19 | time_up_win:18, ko:1, time_up_draw:1 | -5.40 | 17.90 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S3/Sentinel | 7/10/3 | time_up_draw:10, time_up_win:10 | 0.15 | 18.00 | 0/20/0 | 7/13 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S3/Opportunist | 17/3/0 | time_up_win:17, time_up_draw:3 | 3.10 | 18.00 | 0/20/0 | 17/3 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | S3/Adapter | 0/0/20 | time_up_win:20 | -4.65 | 18.00 | 0/20/0 | 0/20 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | X1/Aggressor | 0/4/16 | time_up_win:15, time_up_draw:4, ko:1 | -5.35 | 17.80 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | X1/Sentinel | 7/0/13 | time_up_win:20 | -0.85 | 18.00 | 20/0/0 | 7/13 | 13/3/8/3 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | X1/Opportunist | 18/2/0 | time_up_win:18, time_up_draw:2 | 3.15 | 18.00 | 20/0/0 | 18/2 | 2/7/1/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| always-sidestep | X1/Adapter | 0/1/19 | time_up_win:19, time_up_draw:1 | -3.30 | 18.00 | 20/0/0 | 0/20 | 20/0/12/0 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Aggressor | 6/6/8 | ko:14, double_ko_draw:6 | -0.05 | 8.85 | 0/20/0 | 6/14 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Sentinel | 17/0/3 | ko:19, time_up_win:1 | 4.00 | 14.85 | 0/20/0 | 17/3 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Opportunist | 19/1/0 | ko:19, double_ko_draw:1 | 4.85 | 9.40 | 0/20/0 | 19/1 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S1/Adapter | 5/0/15 | time_up_win:7, ko:13 | -2.45 | 15.55 | 0/20/0 | 5/15 | 20/0/10/0 | 121/202 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Aggressor | 4/4/12 | ko:16, double_ko_draw:4 | -0.90 | 6.75 | 20/0/0 | 4/16 | 16/0/15/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Sentinel | 7/3/10 | ko:17, time_up_draw:3 | -1.10 | 13.35 | 20/0/0 | 7/13 | 13/0/12/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Opportunist | 15/0/5 | ko:20 | 2.30 | 8.05 | 20/0/0 | 15/5 | 5/0/4/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S2/Adapter | 6/1/13 | ko:19, double_ko_draw:1 | -3.10 | 12.15 | 20/0/0 | 6/14 | 14/0/13/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Aggressor | 9/4/7 | ko:16, double_ko_draw:4 | -0.10 | 7.95 | 0/20/0 | 9/11 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Sentinel | 16/1/3 | time_up_win:3, ko:16, double_ko_draw:1 | 4.80 | 14.75 | 0/20/0 | 16/4 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Opportunist | 19/0/1 | ko:20 | 5.20 | 7.80 | 0/20/0 | 19/1 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | S3/Adapter | 6/0/14 | time_up_win:7, ko:13 | -1.80 | 15.15 | 0/20/0 | 6/14 | 20/0/0/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Aggressor | 10/6/4 | ko:14, double_ko_draw:6 | 1.25 | 7.80 | 20/0/0 | 10/10 | 10/4/6/4 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Sentinel | 18/1/1 | ko:17, time_up_win:2, time_up_draw:1 | 4.50 | 14.05 | 20/0/0 | 18/2 | 2/7/1/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Opportunist | 20/0/0 | ko:20 | 6.10 | 7.20 | 20/0/0 | 20/0 | 0/8/0/8 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| strike-bash | X1/Adapter | 6/1/13 | time_up_win:9, double_ko_draw:1, ko:10 | -1.60 | 15.95 | 20/0/0 | 6/14 | 14/5/11/5 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
