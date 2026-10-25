import { reset, observe, legal_actions, step, outcome, type Action } from './sim/index.js';
// A controller receives only this object. Authoritative state stays in the closure.
export function createPlayerInterface() {
    let state = reset();
    return {
        reset() { state = reset(); return observe(state); },
        observe() { return observe(state); },
        legal_actions() { return legal_actions(state); },
        step(action: Action) { state = step(state, action); return observe(state); },
        outcome() { return outcome(state); }
    };
}
