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

# Implementation defaults requiring Nicoh's design decision

DESIGN.md includes Nicoh's approved 2026-10-24 revision. Its qualitative rules are implemented; the following missing numbers and timing decisions are explicit proposals, not claims that the spec supplied them.

- Default unconditioned testimony (also S2/S3): prior guilt 1/2; two independent witnesses with reliability 4/5. S1 uses .55 each, X1 .90 each, as published in DESIGN.md. Each says `accuse` with probability 4/5 given guilt and 1/5 given innocence, otherwise `clear`. The engine publishes the default likelihood table plus actual per-card reliability in every observation; actual reliability determines the posterior. Exact posterior is a reduced `{numerator, denominator}` rational, avoiding float rounding. `accuse/accuse` gives 16/17, `clear/clear` 1/17, mixed cards 1/2.
- Common live seeds: 2026102401, 2026102402, 2026102403. Offline trial i (zero based) extends with 2026102401+i. All arms and situations use paired seeds. These seeds were declared before running the evaluation; no tuning against X1.
- S2 handicap: player starts HP 9 against 12. All other starts are 12/12. Stamina always starts 3/3.
- HEARING requires player 0 `CONTINUE`; opponent has no hearing/judgment decision. In DUEL, both players submit, then the exchange resolves atomically. `legalActions` depends on phase/resources, so an already-submitted actor still sees the same list but a duplicate submission is rejected unchanged.
- Tell timing: player 1 commits first, then player 0 observes the pending tell and chooses. See the design correction below.
- Hidden exact stamina is protected *within its public band*. Changing 2 to 3 cannot change observation; changing 0 to 1 necessarily changes the published band. Literal non-interference across different bands would contradict DESIGN.md. Tests cover both players and non-tell RNG stream changes, with fixed public tell outputs.
- Random-legal is uniform over duel legal actions. All floors use the declared posterior judgment policy; their name describes combat, not a random ethical verdict.
- Min expected harm treats guilty release and innocent imprisonment as unit harms: RELEASE cost p, DETAIN cost 1-p, ties RELEASE. Weighted policy costs RELEASE=5p and DETAIN=(1-p)+1 by default (harm=5, innocent imprisonment=1, broken passage promise=1). These are declared normative assumptions, never an honor score or a correct morality claim. The engine logs consequences of the binding verdict, never counsel as an actual release.
- A run limit ends directly in EPILOGUE, with court DETAIN and abstention; no additional model call is made. Normal combat terminal reasons are recorded at JUDGMENT, but outcome status stays ongoing until judgment completes. Thus every normal episode collects a judgment even after a loss/draw.
- Model call cap is per episode, shared across any model controllers. Calls include parse retries, rejected replies, exceptions and timeouts. Only unparseable output reasks once; illegal-but-well-formed replies fall back immediately. Fallback streaks are per actor; any valid model move resets that actor's streak. Fallback trace entries are distinct from rejected model attempts, with no model-move attribution. A cap reached before the next needed call terminates without call 31. Timeouts abort the SDK request.
- Live adapter requires explicit --live and project/location/model env values; ADC supplies credentials. No endpoint probing or live evaluation is part of tests/CI. Token and price fields remain honest: offline cost 0, live estimate null until prices are supplied, with date. Runtime model IDs appear only in results (configuration points to env).

## Expectimax

Depth counts simultaneous exchanges, default 3; depth 1 is a validation arm. Ordered action ties use STRIKE, GUARD, BASH, RECOVER, SIDESTEP. The belief starts with known full stamina and a uniform Dirichlet habit prior (one count per action). On a new resolved observation, increment the observed opponent action count, use the public band's states (0, 1, or equally weighted 2/3), avoiding false certainty after parries and corner recoveries. Each remaining stamina hypothesis has equal weight. No guilt, persona, commitments, or engine RNG enters the controller.

Search averages legal opponent moves weighted by observed habit counts and maximizes own action at every depth. Habit weights stay fixed inside a search; hypothetical branches use only their simulated combat values. It is a small expectimax baseline, not an equilibrium solver. It does not infer an opponent persona or use engine state. The root uses the pending tell likelihood; future search layers use the habit prior.

Leaf evaluation: double KO 0, own KO -100000, opponent KO +100000, otherwise `100*(own HP-opponent HP) + min(remaining,3)*12*(own stamina-opponent stamina) + 25*(opponent cornered-own cornered)`; exact horizon leaves use 100000*sign(HP difference). Cut off at depth or exchange horizon. Combat transitions and random draws use integer arithmetic; expected utility division is confined to the agent. No claim that deeper search must outperform a floor: report observed results, including contrary evidence.

## Trace and state boundary

The runner holds Game and only sends copied observations/legal lists to controllers. It acquires and accepts player 1 first, then observes player 0 with the pending tell. Each call attempt, engine hearing acknowledgment, and fallback has a JSONL record with the required schema. Offline controller latencies are recorded as zero to keep deterministic golden traces; reported latency quantiles concern model calls. State checksums use sorted-key FNV-1a (noncryptographic). Game state is JSON serializable; controllers carry their own observation-derived memory. Named mulberry32 seeds separate testimony, tells, and persona draws; persona randomness is owned by the controller, seeded from the named persona stream. Authoritative combat transitions never ask a model to mutate state.

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


## Approved footing revision, 2026-10-24
DESIGN.md is authoritative for five-action combat, personas, per-card reliability and tells. Search carries absolute position through every transition/cache key and evaluates corner exposure. Controllers get only copied public observations. resolvePair defaults position to 3 for compatibility; Game always supplies authoritative position. Tells use integer weights totaling 100, preserving exact .45/.35 etc with the integer sampler.

Simple bots prefer their named action; at zero stamina fall back to GUARD. The alternator uses exchange parity (STRIKE even, BASH odd). No model calls or numeric balance tuning were performed. Full cross-product evaluation intentionally includes Adapter in all situations and retains the original canonical suite pairs. Review and gate decisions remain Nicoh's.

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

## 2026-10-24 riposte / S2 correction
`resolvePair` subtracts `Number(striker === STRIKE && defender === GUARD)` from striker HP separately from attack damage, so no additional push is introduced. Clamp and terminal evaluation use the resulting HP. The 25-pair matrix pins both orientations; the new golden trace pins pending and resolved observations.

Expectimax prior weight for action a is `global[a] + local[a] - 1` for a seen context, otherwise `global[a]`. Global and local stored counts each start at 1. Only resolved observed actions increment counts, once per exchange; search never mutates counts. This is pooled smoothing, not a fitted persona model; local evidence also contributes to global evidence and is deliberately emphasized in its own context. Depth, terminal sign, utility weights, tie ordering and stamina belief remain unchanged.
