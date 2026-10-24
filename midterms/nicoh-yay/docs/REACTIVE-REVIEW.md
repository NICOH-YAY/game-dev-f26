# Independent review handoff, 2026-10-24

Independent rules-reviewer found no persona hidden-state reads or combat-number changes. Findings addressed: Opportunist RECOVER probability now respects corner priority; historical Adapter regression renamed for resolved STRIKE; added direct tests for Sentinel retaliation/corner priority, Aggressor second-parry switch and Adapter six-action eviction. No gate approval claimed.

Rule evidence: Nicoh approved design, rationale and locators in rule-source-map.md. Tests failed before implementation as recorded in BUGLOG.md. Player interface unchanged; persona ignores tell and hidden fields, verified with throwing accessors. Existing refused-action tests retained. Assumptions and complete balance evidence are in BALANCE-REACTIVE.md. Full eval rerun after review correction; no tuning based on results.
