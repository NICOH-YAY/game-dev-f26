# Observed development bugs

## 2026-10-24 ? offline evaluation launcher failed on this Windows Node 24 environment

Observed command: `npm run eval -- --suite experiments/suite.json --players baseline,random,always-strike --trials 20`.
Before any episode, tsx called `os.userInfo()` and Node raised `uv_os_get_passwd returned ENOMEM`.
This was a real environment compatibility failure, not a game-rule failure or human playtest.
Fix: compile with TypeScript and launch plain Node; remove tsx. Regression: `tests/regression/node24-cli.test.ts`
compiles and runs four offline episodes using the same launcher, and checks the live guard.

## 2026-10-24 ? held-out Adapter never adapted to STRIKE trades

Observed in the first offline 20-trial evaluation: X1 and S1 had identical results for every baseline.
Inspection showed punishment counted only BASH losing to STRIKE or GUARD losing to BASH,
while Adapter opened with STRIKE. Thus repeated damage in STRIKE trades never changed its preference.
Pinned test `tests/agents.test.ts` ("observed regression: Adapter changes preference...")
failed before the fix: zero differing decisions across 100 seeds, expected more than 50.
Fix: count exchanges in which observed own HP decreases; after two, counter the opponent's
last observed action. Regenerated suite results after fixing. This is development evidence, not human play.

## 2026-10-24 ? review found tells sampled after the decision

Claude observed that resolve() sampled the tell from the just-resolved action,
already revealed exactly in previous. This genuine observed rule bug disabled
the intended information mechanic. Pinned regression:
`tests/tells.test.ts`, "review regression: pending tell exists before player chooses; early commit immutable".
Before the engine change it failed: early STRIKE was accepted rather than
await_opponent_commit. The frequency test also failed (no pending tells).
Fix: accepted player-1 commitment samples only player-0's pending tell; player 0
then chooses; resolution clears it. Both runners use this order. Frequency and
hidden-field boundary tests pass. No human playtest is claimed.

## 2026-10-24 ? reviewed baseline ignored the tell

The root averaged habit counts without a tell likelihood. The new Bayes regression
in tests/agents.test.ts failed before implementation (missing actionPosterior).
Root probabilities now multiply learned habits by the pending tell likelihood;
time-up leaves score the actual HP winner and stamina weight declines near time-up.
The 400-episode rerun still misses the S2 target; see TEST-RESULTS.md. No balance
changes or claim that depth 3 dominates all floors is made.

## 2026-10-24 approved footing revision
- Fixed missing parry drain, spatial clash point, corner penalties and evasion; tests/footing.test.ts covers all 25 payoffs, cancellation, wall clamp, escape and refused zero-stamina SIDESTEP.
- Fixed S1/X1 evidence equivalence via public per-card reliability; exact posterior regression added.
- Updated deterministic snapshots and CLI cross-product row-count regression (4 -> 16 rows for one arm/trial).
- OPEN: always-strike remains dominant: canonical S1 16/20 wins. tests/regression/always-strike.test.ts deliberately asserts requested <=10/20 threshold and fails. BALANCE.md records all failures and an unapproved numeric proposal.

- Fixed stale player prompt (four actions and previous-turn tells); new prompt regression failed before correction.

## 2026-10-24 approved reactive revision
- Replaced last-action/HP-loss Adapter trigger with six-resolved-action modal counter; Sentinel now reacts to recent STRIKE frequency. New tests failed first (Sentinel .6315 < .70, Adapter STRIKE instead of GUARD). Persona boundary/determinism test remains passing.
- Removed duplicated cross-situation duel seeds; new distinct-range test failed first on missing bases. Separate testimony seed input preserves independent evidence sampling.
- OPEN: unchanged always-strike regression now reports 19/20, still above <=10. Full 3200-episode evidence and unapplied policy proposal are in BALANCE-REACTIVE.md. No combat numbers changed; no model calls or human play evidence claimed.

The historical Adapter damage-trigger regression is superseded by the approved resolved-action modal rule; its retained test now explicitly names the new trigger.

## 2026-10-24 Nicoh revises acceptance criteria; online baseline pass

The old canonical always-STRIKE observations (16/20 after footing, 19/20 after reactive revision) remain historical evidence above. Their universal <=10 target is superseded, so they are no longer an OPEN Aggressor requirement. Nicoh explicitly allows exploiting the persistent personas because learning their habits is the memory experiment. No historical evidence was removed. The old always-strike.test.ts is replaced by balance.test.ts encoding declared-suite dominance (ties allowed against single-action bots, strict > random) and Adapter-only <=50% for all five single-action bots in every situation. See BALANCE-FINAL.md for rationale, full new run, six failing acceptance tests, and unapplied proposals. Online contextual Laplace counts now feed depth-3 search; boundary and update tests pass. No combat/persona changes or live calls.

## 2026-10-24 observed S2 learning regression: sparse contexts forget marginal evidence
Historical full matrix: contextual baseline S2/Sentinel 5/20 versus random 7/20 and global ablation 12/20 (preserved in BALANCE-FINAL). Inspection found unseen contexts returned independent uniform counts even after repeated observed GUARD; short 18-exchange games split evidence across previous-action/stamina/corner contexts. The regression test `S2 regression: unseen contexts retain globally observed guard evidence without hypothetical learning` failed before the fix: guard/strike ratio 1, expected 5 after four resolved GUARD observations. Existing saved-context attribution and once-only update tests remain intact.

Fix: pooled global counts plus local observed increments; local storage remains independent and training occurs only on resolved actions. Controlled 20-seed S2 comparison, BOTH arms using approved riposte: old sparse prior 7 wins, corrected pooled prior 11 wins. Winner sequences (0 champion, 1 opponent, null draw): sparse `[1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,null,0,0,0,1]`; pooled `[0,1,1,0,0,1,null,0,0,0,1,1,0,0,0,1,0,null,0,1]`. Same frozen suite seeds, fresh controllers, depth 3 and opponent policy; only prior selection changed in the diagnostic arm. This isolates a contribution from sparse evidence loss; it does not establish that all losses were caused by it.

Checked alternatives: S2 starts 9 versus 12 HP as declared (intentional); time-up leaf uses sign(own HP - opponent HP), matching engine winner. Sentinel's reactive policy is only approximated by public contexts; remaining model mismatch and short search horizon remain limitations. No numeric or persona tuning. No model calls or human-play claims.

## 2026-10-24 implementation audit: posterior aggregation and held-out integrity

Observed report bug: src/runner/report.ts read rows[0] posterior for an entire player/situation group. New tests/audit.test.ts regression used 1/4 and 3/4; before the fix it printed 1/4 and failed the expected `0.500000 [1/4, 3/4]`. Now the report averages all available probabilities and lists exact per-episode fractions plus missing count. No combat or observation rule changed.

X1 had been observed during balance tuning; it must not be claimed as clean held-out evidence. X2 was preregistered 2026-10-24 with unused ranges. CLI and balance explicitly exclude it. Integrity scans existing result files for reserved seeds; a CLI regression confirms no X2 rows. Mimic policy test failed first (.0935 RECOVER rate rather than >.69) before its .70 repeat/Sentinel-mixture implementation. Unit tests use synthetic observations and non-suite seeds, not X2 episodes. Config validation regression failed on missing config module before implementation. Follow-up full test run exposed an old four-situation identity assertion; updated it to include the newly preregistered fifth entry without executing it.

Independent review of this pass is pending in a different session. No approval, live or human result is implied.


## 2026-10-24 renderer QA repairs

- Runner traces omitted observations and post-step public facts. New runner
  regression failed on missing `observation.own_stamina`; rows now contain
  player-0 observation copies, post-transition observation and allowlisted
  terminal metadata. The leak assertion reuses the controller leak-test field
  list and checks recursively, including terminal rows. Golden trace updated.
  Five offline samples regenerated; no evaluation claims, X2 or model calls.
- Human resolution did not render the new HP, action label or disabled controls
  until its 1.5-second timer completed. It now publishes the resolved observation
  and label together immediately; repeated Enter keydowns are ignored. The
  Aggressor seed-42 session regression confirms one STRIKE/STRIKE exchange gives
  [9,9], exchange 1, a repeated uncommitted action is rejected, and next-opponent
  commits leave HP unchanged. This regression passed before the UI fix: the
  exact reported [8,9] first-exchange result is NOT reproduced and its arithmetic
  cause remains unconfirmed. No extra damage is applied by animation mapping.
- Own-stamina symbols were literal question marks. New pips test failed before
  the formatter existed; exact own stamina now uses ASCII filled/empty pips.
  Opponent display remains its public band.
- Castle GLBs referenced absent `assets/Textures/colormap.png`. Restored the
  original Kenney GLB-format colormap at that URI and added credit.
- Charset already existed. UI used non-ASCII separators/glyphs unsupported by
  the pixel font; replaced them with ASCII. Browser source and HTML verified
  UTF-8 without BOM. Replay starts automatically with Pause and Step available;
  sparse legacy traces still show unknown values rather than invented facts.
- Raised hemisphere intensity 2 -> 2.7, lightened ground bounce, moved duel camera
  from z=19 to z=10 (about 37% viewport height for a 2.6-unit character at wide
  aspect), and track clash position to keep wall exchanges framed. Pixel pass
  and disabled antialiasing retained. Visual browser re-QA remains independent.

Validation: npm test: 94/94; npm run typecheck: passed; npm run web:build:
passed (existing large-chunk advisory). Independent review remains pending in
another session; no gate approval, commits, pushes or model calls.
