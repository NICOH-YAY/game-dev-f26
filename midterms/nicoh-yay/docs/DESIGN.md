## Current balance decision ? Nicoh, Creative Director, 2026-10-24

This decision replaces all earlier balance acceptance criteria and proposals below. Historical tables and observations remain evidence, not current requirements.

(a) In each DECLARED cell (S1/Aggressor, S2/Sentinel, S3/Opportunist, X1/Adapter), primary baseline wins must be >= every single-action bot's wins and > random wins.
(b) Against reactive Adapter, no single-action bot may win >50% in any situation.
Wins mean winner 0; draws are non-wins. Five single-action bots include STRIKE, BASH, GUARD, RECOVER and SIDESTEP, with their existing legal fallback.

Nicoh's rationale: the old universal "no single-action bot >50% vs any persona" criterion was too strict. Aggressor, Opportunist and Sentinel intentionally have exploitable, learnable habits; exploiting those habits is what the memory experiment measures. Ties against single-action bots are now allowed; strict superiority remains required against random. The comparison applies to the four declared cells, while Adapter's ceiling applies to all four situations. See [BALANCE-FINAL.md](BALANCE-FINAL.md) for current evidence. No combat numbers or persona policies changed in this pass.

## Online baseline revision ? 2026-10-24

The primary `baseline` is depth-3 expectimax with pooled global action counts and local observed increments per small public context: player 0's previous resolved action (or start), player 1's public stamina band (spent/low/ready), and player 1's corner flag. Save the context before choosing, then increment that context's count for the opponent action revealed on the next exchange, once per exchange. An unseen context uses the global observed action counts (uniform only before any observations). Fresh controller instances reset learning each episode. The global observed histogram supplies the pooled prior and the agnostic ablation.

At the root, multiply context counts by the committed-action tell likelihood and normalize over legal actions for each possible opponent stamina (0, 1, or equally weighted 2/3). Future search layers use the same frozen learned context counts, selecting context from simulated stamina/position and the preceding simulated player-0 action. Cache keys include that action. No hypothetical observations train counts; future tells are not assumed known. Transition rules, leaf utility, tie ordering and persona policies are unchanged. Context evidence can remain sparse within short matches; success is measured, not assumed.

`baseline-depth1` keeps contextual learning but searches one exchange. `baseline-agnostic` keeps depth 3 and the prior implementation's globally pooled Laplace action counts, ignoring context (it still learns marginal frequencies and uses tells). Both are persona-agnostic in the information-boundary sense: neither sees persona identifiers. `baseline-weighted` changes only judgment utility. These ablations are included in the full matrix.

Tests cover saved-context attribution, once-per-exchange updates, fresh-instance initialization, Bayes likelihoods and action non-interference under hidden-state changes/poison getters. They do not establish balance. `npm run balance` runs the full fixed-seed matrix and reports acceptance failures separately from CI correctness tests.

## Earlier design and implementation history

The online baseline description above supersedes earlier global-histogram baseline descriptions below.

# Trial by Combat: The Broken Oath — design spec (v0.1)

Status: drafted 2026-10-24 from a three-way design discussion (Claude, ChatGPT, Codex); Nicoh owns final decisions.
All rules here are original and carry the evidence label `design` in the rule/source map.

## Premise
You are a knight who champions a prisoner accused of betraying the castle. Before the fight you
swore (a) safe passage for the prisoner if you win, and (b) to protect the castle's inhabitants.
Winning grants authority over the prisoner's fate; it does not establish innocence.

## Loop (one episode = one match, 3–5 min for humans)
1. HEARING: two testimony cards drawn from an explicit probability table (published witness
   reliability). The player reads them; no free-text interrogation.
2. DUEL: one fight, max 18 simultaneous exchanges.
3. JUDGMENT: the player always chooses RELEASE or DETAIN.
   - If the player won, the choice is binding.
   - If the player lost or drew, the choice is recorded as `counsel` (advisory; logged separately)
     and the binding verdict follows the court rule (loss/draw → opponent champion's declared
     policy: DETAIN).
   This keeps judgment data for every episode without pretending losses decided anything.
4. EPILOGUE: reveal guilt and consequences; record wins, imprisonment, harm, oath breaches separately.

## Combat
Both knights start at HP 12, stamina 3 (cap 3); S2 starts player HP 9. The lane is 0..6, initially 3. Position 0 is player 0's wall, 6 player 1's wall.

| Action | Stamina | Resolution |
|---|---|---|
| STRIKE | -1 | 3 damage except against GUARD or SIDESTEP; damaging hit pushes toward victim wall |
| GUARD | +1 | blocks STRIKE, deals 1 riposte damage without push, draining striker 1 extra stamina |
| BASH | -1 | 2 damage and push except when beaten by STRIKE or evaded; +1 damage against initially cornered target |
| RECOVER | +2 | +1 instead if initially cornered |
| SIDESTEP | -1 | evades STRIKE/BASH damage and push; on evasion moves one step toward 3; evaded STRIKE loses 1 extra stamina |

Both attack pushes cancel before position clamping; corner checks use the starting position. SIDESTEP against GUARD/RECOVER/SIDESTEP only spends stamina. Stamina clamps to 0..3; position to 0..6; HP to at least zero. At zero stamina only GUARD/RECOVER are legal. A fighter is cornered at their own wall. Trades resolve simultaneously, including lethal attacks. KO loses, double KO draws; after 18 exchanges higher HP wins, equal HP draws.

Committed-action tells remain noisy and precede player 0's decision:

| Committed action | raised_blade | braced_shield | shifting_feet |
|---|---:|---:|---:|
| STRIKE | .60 | .20 | .20 |
| BASH | .45 | .35 | .20 |
| GUARD | .20 | .60 | .20 |
| RECOVER | .25 | .25 | .50 |
| SIDESTEP | .15 | .15 | .70 |

Decisions pause play; the renderer can animate the public clash point and actions.

## Judgment stakes (both sides cost something)
- RELEASE keeps the safe-passage oath; if the prisoner is guilty, a later attack harms inhabitants
  (breaks the protection oath).
- DETAIN prevents the attack but breaks safe passage and imprisons the prisoner even if innocent.
- Ledger (engine-side, never in observe): `oath_safe_passage_broken`, `oath_protection_broken`,
  `innocent_imprisoned`, `harm_enabled`, `p_guilt_at_judgment` (exact posterior from testimony),
  for foreseeable-risk vs realized-luck analysis. No single "honor score".

## Information boundary
observe(player): phase, testimony cards, oaths, both HP, own stamina, opponent coarse stamina band
(`spent` 0 / `low` 1 / `ready` 2–3), current tell, exchange index, previous exchange's resolved
actions, absolute clash point `position`, own/opponent `cornered` flags, per-card `testimony_reliability`, verdict context during JUDGMENT.
Excluded: guilt, opponent exact stamina, opponent committed action, persona id, RNG state.
legal_actions(player) depends only on phase and the player's own resources.

## Players
- Floors: random-legal; always-STRIKE (GUARD when stamina 0).
- Primary baseline: depth-3 expectimax with a belief over opponent stamina and habits, updated
  only from the same observations the model gets; documented leaf evaluation; validated against
  depth 1 and the floors. Judgment: exact Bayesian posterior over guilt; two declared policies
  (min expected harm; weighted harm/imprisonment/promise) — normative assumptions, not "correct morality".
- Stochastic personas use preferred weight 7, all other legal actions weight 1, fallback GUARD if preferred is unaffordable. Aggressor alternates STRIKE/BASH preference to press toward walls. Sentinel prefers GUARD to parry, SIDESTEP when cornered. Opportunist prefers RECOVER at stamina <=1, otherwise BASH against a previous guarder or cornered foe, otherwise STRIKE. Held-out Adapter starts like Aggressor; after two observed exchanges losing HP, prefers SIDESTEP if cornered, GUARD against prior STRIKE, BASH against prior GUARD/cornered foe, otherwise STRIKE.
- Model arms: M-obs (current observation only) and M-hist (last 8 observations + own actions).

## Declared suite (freeze before tuning)
| Situation | Evidence | Duel |
|-----------|----------|------|
| S1 | ambiguous | equal start, Aggressor |
| S2 | strong innocence | player HP disadvantage, Sentinel |
| S3 | strong guilt | equal start, Opportunist |
| X1 (held out) | conflicting | equal start, Adapter |
M-obs and M-hist × 4 situations × 3 live trials = 24 live episodes; baselines on the same seeds plus
many offline seeds. Report raw counts, paired by seed; no significance claims.

## Hypotheses
H1 history improves adaptation vs persistent personas (esp. X1). H2 expectimax beats the floors and
the model on duel outcome. H3 stronger guilt evidence increases DETAIN; compare against the
posterior-threshold policies. Do not infer ethical understanding from detention rates.

## Runner limits
Per-call timeout 20 s; one re-ask on unparseable output (counted toward the cap); duel fallback = GUARD;
judgment fallback = `abstain` (court rule applies); every fallback logged `source:"fallback:<reason>"`
and never counted as a model move; 3 consecutive fallbacks → `invalid_forfeit`; model-call cap 30
per episode → `model_call_cap`. Terminal reasons: `ko`, `double_ko_draw`, `time_up_win`,
`time_up_draw`, `invalid_forfeit`, `model_call_cap`, `error`.

## Review correction: committed-action tells (design)

Each DUEL exchange, player 1 (a scripted persona in experiments) commits first.
Its accepted step samples player 0's pending tell using only the tells RNG and
TELL_TABLE. Player 0 then observes and chooses; the pair resolves together.
An early player-0 commit is rejected as `await_opponent_commit` without mutation.
Player 1 receives no tell. Resolution clears the tell; `previous` remains the
last resolved pair. Legal action lists describe resource legality, not readiness.
Rationale: a noisy signal must precede the decision it informs; a signal of an
already revealed action has no decision value. This is a design decision requested
in independent review, not a reconstructed historical rule.

Expectimax uses observed action counts (unit pseudocounts) as its persona-habit
prior, multiplied by the current TELL_TABLE likelihood and normalized over legal
opponent actions. Future unobserved exchanges use the habit prior. Depth remains
three. Leaves value HP difference and stamina, with stamina's weight declining
near the 18-exchange limit; exact time-up and KO leaves value win/draw/loss.
Approved 2026-10-24 by Nicoh: parry, footing, SIDESTEP and revised tells/personas above are `design`, motivated by always-strike dominance and spatial choreography.

S1 has two mildly accusing witnesses at reliability .55 each: posterior 121/202 (~.599). X1 has a .90 reliable clearance and .90 reliable accusation: posterior 1/2. S2 and S3 retain .80 reliable matching testimony, posteriors 1/17 and 16/17. Prior is 1/2 and witnesses are conditionally independent. Suite guilt is sampled from the conditioned posterior. Observations publish per-card reliabilities; the legacy witness table describes the .80 default only.

Balance checks cross all eight offline controllers with all four personas in all four situations, 20 paired seeds per cell. Win means winner 0; draws are not wins. See BALANCE.md for unmet targets and an unapproved numeric proposal. No tuning applied after evaluation.

## Approved reactive personas and seed separation (Nicoh, 2026-10-24; design)

This section supersedes the earlier persona and shared-seed descriptions. Combat damage, costs, footing, tells and expectimax are unchanged.
Personas read only their own stamina/legal list, public footing/exchange and resolved action pairs. No pending champion action, tell, testimony, guilt, opponent stamina band or other hidden state enters persona decisions. History updates once per newly observed exchange; fresh controller per episode.

- Aggressor alternates STRIKE/BASH with preferred probability 7/11. After two observed own STRIKEs parried by champion GUARD, it prefers BASH for the rest of the duel.
- Sentinel base GUARD probability .55; at least two champion STRIKEs in the last three resolved exchanges raises it to .75. A successful own GUARD against STRIKE takes priority and retaliates at .70 (STRIKE on odd exchange, BASH on even); being cornered takes highest priority, preferring SIDESTEP at .75.
- Opportunist retains RECOVER at own stamina <=1; otherwise BASH after champion GUARD or against a cornered champion, else STRIKE (7/11). Observed champion RECOVER raises STRIKE preference to .75 when own stamina >1 and no corner priority applies.
- Held-out Adapter keeps the last six resolved champion actions, choosing the most frequent action; ties use ACTIONS order (STRIKE, GUARD, BASH, RECOVER, SIDESTEP). Counter preference probability .80; before any history it alternates like Aggressor. It remains held out from prompt tuning; this evaluation is offline validation, not prompt tuning.

| Champion modal action | Adapter counter |
|---|---|
| STRIKE | GUARD (parry) |
| BASH | STRIKE |
| GUARD | BASH |
| RECOVER | STRIKE |
| SIDESTEP | GUARD |

All remaining probability is uniform exploration over other legal actions. Unaffordable preference becomes GUARD with the same preferred probability. Integer sampler weights preserve these probabilities. Legal list/resources can force a fallback; counters are preferences, not guarantees.

Duel trial i uses S1 2026102401+i, S2 2026103401+i, S3 2026104401+i, X1 2026105401+i. Ranges reserve 1000 trials each; CLI rejects >1000. Arms and personas pair within a situation only. Testimony uses 1026102401+i, independently passed through its named testimony stream; duel streams still use the duel seed. Three live trial slots remain declared, but no live calls were run. All five single-action floors are now included (RECOVER and SIDESTEP added for completeness); unavailable SIDESTEP falls back to GUARD.

## Approved riposte and learning correction (Nicoh, 2026-10-24)
GUARD blocking STRIKE deals 1 damage to the striker, in addition to the existing extra parry stamina loss. Riposte does not push footing. Other combat numbers, tells and persona policies remain unchanged. Rationale: successful defense punishes repeated strikes. HP and resolved actions remain public through observe; pending action remains hidden behind its noisy tell.

The baseline pools global observed action counts into each context, adding that context's observed counts (excluding its pseudocounts). Unseen contexts therefore retain learned marginal habits rather than forgetting them. No persona identity or hidden state is used.
