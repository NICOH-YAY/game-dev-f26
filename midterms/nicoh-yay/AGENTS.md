# Trial by Combat coding agents

Work only inside `midterms/nicoh-yay/`. Preserve student work; keep changes explainable. Do not commit, push, merge, approve gates, or change deadlines for Nicoh. Nicoh remains Executive Producer and Creative Director. Never self-approve; hand changes to an independent reviewer in a different session.

Before changing rules, observations, outcomes or rule-related reports, follow [.agents/skills/rule-change/SKILL.md](.agents/skills/rule-change/SKILL.md). Use [.agents/skills/balance-check/SKILL.md](.agents/skills/balance-check/SKILL.md) for the offline matrix. Log actual invocations only.

Game code owns state. Controllers receive copied observations and legal actions, never Game, private state, persona IDs, pending actions or guilt. Never touch the hidden-information boundary without non-interference and rejected-action tests. Keep development tools separate from the player interface.

Run from this folder: `npm ci`, `npm test`, `npm run typecheck`. After rule changes run `npm run balance`; design-target failure is evidence, not permission to tune silently. Never run X2 during development, including baselines. X2 is reserved for one final evaluation; changing that restriction requires Nicoh's explicit final-evaluation instruction and independent review.

No live calls without both `--live` and Nicoh's explicit approval. Never substitute mocks for live evidence. Never include secrets or personal playtester data. Students write personal interpretation, team narrative and limitations. Do not fabricate live trials, peer tests, skill invocations or provenance.
