---
name: balance-check
description: Run and interpret the frozen Trial by Combat offline matrix without touching final-only X2 or silently tuning rules.
---

# Balance check

From the game folder run `npm run balance`. This builds and runs 11 offline controllers x 4 personas x S1/S2/S3/X1 x 20 paired seeds (3,520 episodes). Never run X2, even baselines. Check summary completeness, zero model calls and provenance (HEAD plus working-tree status/hash, suite/config hashes, date).

(a) In S1/Aggressor, S2/Sentinel, S3/Opportunist and X1/Adapter, baseline wins must be >= each of five single-action bots and strictly > random. (b) Each single-action bot must win <=50% against Adapter in each of S1/S2/S3/X1. Draws are non-wins. These are Nicoh's 2026-10-24 revised criteria, not statistical significance tests. X2 remains a final generalization case and is outside development acceptance criteria.

Exit 1 means design criteria failed; exit 2 means execution failure. Inspect output rather than treating every nonzero exit identically. Link raw summary, comparison and criterion report; retain failures and historical evidence. Never adjust numbers, personas, seeds or criteria silently. Propose any tuning to Nicoh, then follow rule-change and rerun. Append a truthful invocation to docs/SKILL-INVOCATIONS.md; independent review remains pending.
