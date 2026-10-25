import { reset, legal_actions, step, type State, type Action } from './index.js';
import { tower, type Level } from './level.js';
// Development-only full-map search. Never supplied to a player controller.
export function searchTower(level: Level = tower) {
    const queue: {
        s: State;
        actions: Action[];
    }[] = [{ s: reset(level), actions: [] }];
    const visited = new Set<string>();
    for (let i = 0; i < queue.length && i < 30000; i++) {
        const { s, actions } = queue[i];
        if (s.won)
            return { actions, visited: i, sections: level.sections.filter(section => s.best >= section.y).map(x => x.name) };
        for (const action of legal_actions(s)) {
            const next = step(s, action, level);
            const key = `${next.support}:${Math.round(next.x * 5)}:${next.won}`;
            if (visited.has(key))
                continue;
            visited.add(key);
            queue.push({ s: next, actions: [...actions, action] });
        }
    }
    throw Error(`No crown route found (${queue.length} states)`);
}
