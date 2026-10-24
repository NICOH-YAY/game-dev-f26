# Independent review log: Claude (Anthropic), 2026-10-24

Reviewer: Claude Code (Claude Opus 5.5), a different assistant from the implementation agent (OpenAI Codex CLI 0.163.0-alpha.11.2).
Access: read-only review of code, tests and evaluation output; the reviewer re-ran `npm test`, `npm run typecheck`
and read the balance tables independently. The reviewer wrote no engine, agent or test code.
Instruction to approve: none. Gate and merge decisions stay with Nicoh.

Note on other "review" files in this folder (`REVIEW-HANDOFF.md`, `REACTIVE-REVIEW.md`, `RIPOSTE-REVIEW-HANDOFF.md`):
those reviews were run by a reviewer agent launched inside the same Codex session that built the code. Treat them as
internal checks, not independent review.

| # | Finding | Evidence | Severity | Resolution |
|---|---------|----------|----------|------------|
| R1 | Tells were sampled after resolution from the action then shown exactly in `previous`, so they carried no information | `src/game.ts` resolve(), tells loop before `resolvePair` (build 1) | Rule bug: blocks core mechanic | Fixed: player 1 commits first, player 0 sees tell of the pending action; regression pinned (BUGLOG) |
| R2 | Depth-3 baseline did not beat always-strike (S2 7/5/8 vs 12/4/4), failing rubric 4b | baseline table, build 1 | Credibility | Baseline made tell-aware, then history-learning |
| R3 | Strike-spam dominance traced to GUARD dealing no damage when countering STRIKE; tuning personas cannot fix it | balance matrices, builds 3–4 (Adapter countered correctly yet lost 14/20) | Design | Nicoh approved riposte (1 dmg) after parry; criterion (b) now passes |
| R4 | S1, S3 and X1 produced identical duel results (shared duel seeds), so trials were duplicates | identical rows in footing matrix | Experiment validity | Fixed: per-situation seed ranges plus a test |
| R5 | Learning baseline scored 5/20 in S2, below random (7/20), suggesting a bug | BALANCE-FINAL (pre-fix) | Bug | Codex root cause: sparse contexts reverted to uniform; pooled global evidence; S2 7→11/20 |
| R6 | Old balance criterion ("no single-action bot >50% vs any persona") contradicted the design intent of exploitable persona habits | persona specs vs criterion | Criterion | Nicoh approved revised criteria (a) and (b) |
| R7 | Implementation-agent docs labeled same-session reviews "independent" | docs/*REVIEW*.md | Evidence labeling (rubric 3d) | Clarified in this file; Nicoh to reflect it in AGENT-TEAM.md |

Open after this review: criterion (a) still fails in S2/Sentinel (always-BASH 20/20 vs baseline 11/20). It is reported
by `npm run balance` as an unmet design target and is not hidden. The CI-gated tests (rules, limits, leak,
determinism, regressions) pass locally (78/78); hosted CI has not been run yet.
