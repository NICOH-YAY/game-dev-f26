# Handoff to Claude — independent review pending

## Rules, labels, evidence

Small Change fully replaces the dropped Vaulting Ambition within this folder. The prior game remains on `nicoh-yay/vaulting-ambition`. The source map’s design row added before implementation was: “Endless morning, three shift interruptions, evening, journal; chapter each fifth day | design: Nicoh brief”. The completed map covers the remaining rules, with file/line references. All new rules are **design**; the narrowly scoped **code** evidence covers Melanie/Laura/custody and barista work in Hofmeier’s source. No source claim was promoted to observed.

The resulting loop continues indefinitely, including through debt and empty shifts. Twenty-four data-driven dilemmas have hidden effects, first-person journal lines, escalation prerequisites, and optional delayed callbacks. Five new regulars reveal personal details across days; their trust affects service. Ivo’s relationship changes street text and callbacks. Laura’s trust, closeness, and self-reliance change home text and chapter selection. Pure seeded coffee operations supply recipes, patience, time costs, fatigue key changes and cash. The UI is DOM/CSS only. Original Cart Life music, sprites and font are excluded; Hofmeier’s full source license is shipped.

## Tests and red-before-green record

`tests/small-change.test.ts` was written before `src/sim.ts`, `src/coffee.ts`, and `src/dilemmas.ts`. Its first run failed because `../src/sim.js` did not exist (Vitest import failure, no assertions executed). This establishes the implementation was absent, but is **not** a claim that every individual assertion was observed failing. The final suite contains 15 passing tests across contract, integration and automated DOM files, including refused actions, state copies, deterministic journals/service, data references, escalation, delayed callbacks, chapter dependence, full day timing, malformed saves and reset. The later integration/DOM tests strengthened coverage after implementation; they are not claimed as separate red-before-green traces.

## Player boundary

`observe` constructs copied player knowledge, qualitative cash/relationship cues, visible recipes and reactions. It omits hidden values, effects, ledger, RNG and scheduled future events. Legal dilemma action ids equal the ids in the shown options. Unknown or premature actions return the input unchanged. The host still owns `State`; future player integrations must pass only observe/legal_actions output, not State or file access. The five pure functions are exported from `src/player_interface.ts`. `src/scripted_controller.ts` is a development coffee controller, not a live/model evaluation.

## Verification and assumptions

See TEST-RESULTS.md. The final npm ci, all 15 tests, typecheck and static relative-base build pass. The retained CI workflow is byte-for-byte unchanged. No commits, staging, pushes, merges, model calls, deployment, gate approvals, or review approval occurred. A browser surface was unavailable, so no screenshot/layout inspection or human playtest is claimed. All PNG art remains a CSS placeholder pending Claude’s Higgsfield images. Review the gray-area writing and economy with Nicoh; numeric tuning, instant text journals, scripted callbacks and the three-band palette are design choices, not reconstructed Cart Life rules. Human tests should assess whether dilemmas feel gray, consequences are legible without grading, the work feels tactile, and the classroom device stays responsive.

Root Python checks were attempted per repository instructions and fail for environment reasons documented in TEST-RESULTS.md; no unrelated repository files were changed to bypass them. Claude should independently review this diff using `.claude/agents/rules-reviewer.md`. This file is an implementation handoff, not a review result.


## Second pass ? implementation complete, Claude review pending

**Rule/evidence:** The new source-map row was added before implementation, labeled **assumed** from Nicoh?s second-pass brief. It remains assumed; the cards themselves are authored design. All recalled research is **citation to verify** in DILEMMA-SOURCES.md, including replication cautions for fatigue framing. Final inventory: **40 cards**, merging overlapping first-pass cards with the research set. Relationship-specific effects and journals are retained/reworked; no moral verdict, numerical morality display, score or ending is added.

**Chains:** stock = stretch milk ? skip temperature log ? sell yesterday?s pastries as fresh (?rotate stock?) ? relabel dates. Till = exact-change routine ? miscount ? round tips ? skim on slow days. Only acceptance unlocks the next stage; distinct accepted ledger entries serve as hidden counters. Accepting exact change is a neutral routine, not a moral judgment. Drift is local to the chain: accepted players see compromise options first, honest options last, euphemistic situation/option/journal wording. Refusers keep plain wording. The final stock callback says she had stopped checking. No score accompanies it.

**Tests/red evidence:** research.test.ts was run before implementation: four failures demonstrated missing foundations, absent complete chains, missing Laura growth variants, and missing pickup scenario. Existing callback/reachability assertions passed then; those tests were strengthened afterward to prove actual selector selection and actual scheduling/delivery for every referenced echo. Final suite: **24 passing tests / 4 files**, typecheck and web build pass. The shell uses npm.cmd because npm.ps1 execution is disabled. No browser screenshot or human playtest is claimed.

**Boundary:** observation contains only prose, art identities, options and existing observable activity. Hidden accepted counters, foundation tags, illness, pickup lateness, and all relationship numbers remain internal. Visible helping labels disclose actual additional minutes; the journal reports arrival. Unknown actions and unearned escalation actions leave state unchanged. Every card has a resolvable echo that can be scheduled and delivered. At least one warm and distant Laura vignette is selectable; six distant and three warm moments cycle across chapters.

**Presentation:** supplied title/street art and dialogue portraits are wired; companion portraits include Laura and Ivo, nurse art appears in service. Distant Laura art follows qualitative relationship state. Placeholder slots deliberately use CSS fallback; load errors retain labeled silhouettes/scenery. No art generation, model calls, network calls, staging, commits or pushes were performed.

**Assumptions for review:** monetary/relationship deltas remain design tuning. Illness appears every fourth morning and tired mornings can start late pickup pressure. These are scheduling choices, not research findings. Citations need human verification; desktop/mobile visual inspection and human experience evidence remain TODO. Review this pass independently; implementation is not approval.
