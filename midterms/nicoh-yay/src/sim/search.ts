import { reset, legal_actions, step, type Action, type State } from './index.js';
// Development-only beam search. Uses only legal actions; never imported by the browser.
export function searchCourse(target: 'checkpoint' | 'goal', budget = 24, width = 60) {
    let beam: {
        s: State;
        actions: Action[];
    }[] = [{ s: reset(), actions: [] }];
    const seen = new Set<string>();
    let expanded = 0;
    for (let depth = 0; depth < budget; depth++) {
        const next: typeof beam = [];
        for (const node of beam)
            for (const a of legal_actions(node.s)) {
                const s = step(node.s, a);
                expanded++;
                const actions = [...node.actions, a];
                if (target === 'goal' ? s.won : s.saved)
                    return { reached: true, actions, expanded, state: s };
                const key = [s.p.x, s.p.y, s.p.z].map(v => Math.round(v * 2)).join(',');
                if (seen.has(key))
                    continue;
                seen.add(key);
                next.push({ s, actions });
            }
        next.sort((a, b) => b.s.p.y - a.s.p.y);
        beam = next.slice(0, width);
        if (!beam.length)
            break;
    }
    return { reached: false, actions: [] as Action[], expanded, state: reset() };
}
export function searchCheckpoint() { return searchCourse('checkpoint', 12, 60); }
