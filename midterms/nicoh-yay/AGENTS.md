# Small Change implementation
Work only in this folder and the named midterm CI workflow. Nicoh is Creative Director and Executive Producer. No commits, pushes, merges, gate approvals, or model calls. Claude reviews independently afterward.

Small Change replaces Vaulting Ambition (preserved on nicoh-yay/vaulting-ambition). This is a 2D DOM/CSS game: no Three.js, WebGL, external AI services, or runtime network dependency. Source evidence is in docs/SOURCE-EVIDENCE.txt; authored rules are design, not claims about Cart Life.

Game code owns state. Player controllers receive copied observations and legal option ids. Refused actions leave state unchanged. Add dilemmas as data in src/dilemmas.ts; follow docs/DILEMMAS.md. Follow the repository rule-change workflow for engine changes: evidence map, failing test first, implementation, verification, independent review. Run npm test, npm run typecheck, npm run web:build. Never claim automated traces are human playtest evidence.
