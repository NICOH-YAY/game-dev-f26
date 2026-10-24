# Trial by Combat comparison

Raw counts; paired seeds; no significance claims. Judgment counts are choices; counsel is advisory. Ledger counts use binding verdicts. Model-call latency only (offline = 0). Price placeholders dated 2026-10-24.

| Player | Situation | W/D/L | Terminal reasons | HP diff avg | Exchanges avg | RELEASE/DETAIN/abstain | Binding/counsel | Passage/protection/innocent/harm | p_guilt | Illegal | Fallbacks | Calls | Latency p50/p95 ms | Tokens in/out | Est. cost USD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline-depth1 | S1 | 12/8/0 | ko:12, double_ko_draw:8 | 1.95 | 7.50 | 20/0/0 | 12/8 | 8/6/5/6 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S2 | 11/1/8 | time_up_win:11, ko:8, time_up_draw:1 | -0.05 | 15.60 | 20/0/0 | 11/9 | 9/0/9/0 | 1/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | S3 | 13/7/0 | ko:13, double_ko_draw:7 | 3.25 | 7.70 | 0/20/0 | 13/7 | 20/0/2/0 | 16/17 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
| baseline-depth1 | X1 | 18/2/0 | ko:18, double_ko_draw:2 | 5.25 | 7.35 | 20/0/0 | 18/2 | 2/7/0/7 | 1/2 | 0 | 0 | 0 | 0.0/0.0 | 0/0 | 0 (offline) |
