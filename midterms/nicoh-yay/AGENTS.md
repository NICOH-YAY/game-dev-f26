# Vaulting Ambition implementation
Work only in this folder and the named midterm CI workflow. Nicoh is Creative Director and Executive Producer. No commits, pushes, merges, gate approvals, or model calls without explicit authorization. Claude reviews independently afterward.

Game code owns state. Keep the deterministic sim separate from rendering and development search. Player controllers receive copied observations and legal actions. Refused actions must leave state unchanged.

Follow the repository rule-change workflow for further rule changes: map the design evidence, test first, implement, verify, hand off. The old Trial by Combat skills/matrix are superseded by Nicoh's replacement request; old work remains on nicoh-yay/trial-by-combat. For this prototype run npm test, npm run typecheck, npm run web:build. Reachability search is development evidence, not a human playtest or a model evaluation. Do not fabricate either.
