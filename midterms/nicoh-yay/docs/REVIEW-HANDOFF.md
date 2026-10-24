# Independent reviewer handoff ? pending

Rule label: `design`; evidence: Nicoh Creative Director approval 2026-10-24 in task. Rules and rationale are in rule-source-map.md and DESIGN.md. Changed engine: sim/rules.ts and game.ts; controllers: agents/index.ts; evidence: sim/evidence.ts; full factorial CLI: runner/cli.ts.

Test-first evidence: tests/footing.test.ts originally contained 27 cases (25 explicit pair rows, corner/resource case, legality/public position case). All 27 failed before engine edits: missing position, missing SIDESTEP and old stamina/corner payoffs. Later tests add public reliability/posteriors, position snapshots and a fixed-seed dominance regression. Legacy tests and golden hashes updated for the approved rules. The dominance acceptance test remains red (16 wins >10), matching measured balance failure; do not approve this as a completed balance goal.

Boundary: absolute public position; own/opponent corner flags; public per-witness reliability. Guilt, exact enemy stamina within band, persona, commitments and RNG remain excluded. Rejections leave state unchanged. No player file access. Existing hidden-info tests retained.

Assumptions: corner bonuses use pre-exchange footing; one successful evasion recenters once; absolute position stays unchanged in player-1 view while corner flags reverse. Suite crosses all personas without changing the declared canonical pairs. Proposal: STRIKE damage 3->2, not applied; see BALANCE.md. No commits, pushes, model calls, gate approvals or review claimed by implementation agent.

## Independent read-only review result
[blocking] docs/BALANCE.md:26: acceptance remains unmet (canonical S1 always-strike 16/20); numeric decision required.
[should fix, corrected] docs/IMPLEMENTATION.md:5: default witness reliability needed qualification; now explicitly default-only with S1/X1 exceptions.
Reviewer found no additional combat-resolution, legality, tell-table, public-position or hidden-information boundary defects. No approval granted. Files read: reviewer instructions, this handoff, map, DESIGN, IMPLEMENTATION, BALANCE, rules.ts, game.ts, evidence.ts, agents/index.ts, runner/cli.ts, runner/prompt.ts, footing.test.ts, game.test.ts, agents.test.ts.
