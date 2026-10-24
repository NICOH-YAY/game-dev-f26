# Independent review handoff: 2026-10-24

Rule: GUARD blocking STRIKE deals 1 riposte damage to striker in addition to existing extra parry stamina loss. Evidence label `design`: explicit Nicoh Creative Director decision, 2026-10-24; rationale punish repeated strikes. Existing pushes unchanged; riposte is separate HP subtraction. Map row added before tests/engine.

Red-before-green: updated 25-pair STRIKE/GUARD and GUARD/STRIKE cells, existing 16-pair subset, and new riposte KO/observe/refusal test failed before engine edit (expected 11 vs actual 12 HP; KO expected 0 vs actual 1). After edit these pass. New pending/resolved observation snapshot records approved behavior; existing golden snapshots unchanged. Boundary effect: resolved public HP includes riposte; pending tell distribution, hidden action and legal actions unchanged. Refused action is immutable.

S2: new unseen-context guard-evidence test failed before prior edit (ratio 1 vs expected 5), then passed. Local counts retain Laplace storage; prior pools global counts plus local observations. Once-per-exchange attribution and hidden-state poison tests retained. Controlled S2 old/new prior with identical riposte: 7/20 -> 11/20. Historical pre-riposte 5/20 remains in report. No terminal sign defect found; HP handicap intentional.

Balance: current full matrix (a) FAIL only S2, (b) PASS. Acceptance checks moved from tests/regression/balance.test.ts to experiments/balance.mjs by Nicoh's conditional instruction; full matrix reports failures with exit 1. Existing CI workflow unchanged outside authorized directory. Read src/sim/rules.ts, src/agents/index.ts, src/runner/prompt.ts, src/game.ts, tests/agents.test.ts, tests/footing.test.ts, tests/game.test.ts, docs/rule-source-map.md, DESIGN/IMPLEMENTATION/BUGLOG and experiments/balance.mjs.

Assumptions: no push from riposte because existing push rules cover damaging strikes and unbeaten bashes; no numeric changes otherwise. Pooled local evidence is intentionally emphasized atop marginal global evidence. This is not a proof of persona-model correctness or balance. Student owns approval.

## Independent read-only review result
Independent `rules_review` agent, following `.claude/agents/rules-reviewer.md`: **No findings**. Read this handoff, rule-source-map, DESIGN, IMPLEMENTATION, BUGLOG; rules.ts, agents/index.ts, game.ts, prompt.ts, episode.ts, cli.ts; agents/footing/game tests and footing snapshot; balance.mjs, suite.json and package.json. No approval or merge decision issued. Implementation agent records the independent result here without approving its own change.

Final validation: npm test 78/78 PASS (8 files); typecheck PASS; eval 3,520 episodes PASS execution; npm balance 3,520 episodes PASS execution, exit 1 for unmet criterion (a), criterion (b) PASS. Hosted CI not invoked; existing workflow commands pass locally.
