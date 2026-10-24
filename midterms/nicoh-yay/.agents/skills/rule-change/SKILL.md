---
name: rule-change
description: Change Trial by Combat rules, information interfaces or rule reports with mapped design evidence, failing tests and independent review.
---

# Rule change

1. Read scoped AGENTS.md and DESIGN.md. Add/update the rule-source-map row first: rule ID, `design` label, spec heading, one-line rationale including rejected alternative, implementation symbol and exact test locator. Obtain Nicoh's decision for design changes; distinguish proposals.
2. Write a focused failing test before implementation; run it and retain the actual failure in the handoff. Include refused-action and non-interference tests for boundary effects. Never execute X2 episodes or reserved seeds.
3. Change only the relevant engine/controller/report. Controllers receive observations, never authoritative state. Preserve the boundary.
4. Run `npm test` and `npm run typecheck`. For a bug add a regression and docs/BUGLOG.md entry, including trigger, before/after behavior and evidence.
5. Invoke balance-check and rerun the non-X2 matrix. Record unmet criteria; never tune silently or change acceptance criteria to manufacture a pass.
6. Append a truthful invocation row to docs/SKILL-INVOCATIONS.md. Handoff to an independent reviewer in a different session: mapped rule, test and prior failure, code changes, boundary effects, results, assumptions and pending decisions. Do not review or approve your own change. Nicoh owns gate decisions.
