import { createHash } from 'node:crypto';
import { createPlayerInterface } from '../src/player_interface.js';
import { describe, it, expect } from 'vitest';
import { reset, tick, launch, predictVault, legal_actions, observe, step, outcome, DT, type State } from '../src/sim/index.js';
import { parseTower, tower } from '../src/sim/level.js';
import { searchTower } from '../src/sim/search.js';
const hash = (x: unknown) => createHash('sha256').update(JSON.stringify(x)).digest('hex');
describe('deterministic vault rules', () => {
    it('same inputs produce the same trajectory hash', () => {
        expect(hash(predictVault(reset(), 55, .78))).toBe(hash(predictVault(reset(), 55, .78)));
    });
    it('prediction matches individual fixed steps', () => {
        const prediction = predictVault(reset(), 55, .78);
        let s = launch(reset(), 55, .78);
        const trace = [s];
        for (let n = 0; n < 1200 && s.phase !== 'standing' && !s.won; n++) {
            s = tick(s);
            trace.push(s);
        }
        expect(trace).toEqual(prediction);
    });
    it('lands on a ledge top and stands', () => {
        let s: State = { ...reset(), x: 0, y: 2, vx: 0, vy: -2, phase: 'airborne' as const };
        for (let n = 0; n < 200 && s.phase !== 'standing'; n++)
            s = tick(s);
        expect(s.phase).toBe('standing');
        expect(s.y).toBe(0);
        expect(s.vy).toBe(0);
    });
    it('bounces off wall sides and falls', () => {
        const level = { ...tower, solids: [{ id: 'wall', x: 1, y: 0, w: 1, h: 8 }] };
        const s = tick({ ...reset(), x: .74, y: 2, vx: 8, vy: 0, phase: 'airborne' }, level);
        expect(s.vx).toBeLessThan(0);
        expect(s.vy).toBeLessThan(0);
        expect(s.phase).toBe('airborne');
    });
    it('snaps only for high power and shallow angle', () => {
        expect(launch(reset(), 25, 1).snapped).toBe(true);
        expect(launch(reset(), 55, 1).snapped).toBe(false);
        expect(launch(reset(), 25, .75).snapped).toBe(false);
    });
    it('exposes 32 standing actions, none in flight; refuses without mutation', () => {
        const s = reset();
        expect(legal_actions(s)).toHaveLength(32);
        const air = launch(s, 55, .75);
        expect(legal_actions(air)).toEqual([]);
        expect(() => step(air, { angleIndex: 0, powerIndex: 0 })).toThrow();
        expect(() => step(s, { angleIndex: 8, powerIndex: 0 })).toThrow();
        expect(s).toEqual(reset());
        expect(observe(s)).not.toHaveProperty('solids');
        expect(outcome(s)).toBe('playing');
        expect(DT).toBe(1 / 120);
    });
    it('observation is copied and limited to visible geometry', () => {
        const s = reset();
        const o = observe(s);
        o.position.x = 999;
        o.ledges.length = 0;
        expect(s.x).toBe(0);
        expect(observe(s).ledges.length).toBeGreaterThan(0);
        expect(observe(s).ledges.every(b => Math.abs(b.y - s.y) < 14)).toBe(true);
        const remote = {...tower, solids: [...tower.solids, {id:'unseen', x:0, y:100, w:4, h:1}]};
        expect(observe(s, remote)).toEqual(observe(s));
    });
    it('owns interface state and rejects invalid actions without advancing time', () => {
        const game = createPlayerInterface();
        const before = game.observe();
        expect(() => game.step({ angleIndex: -1, powerIndex: 0 })).toThrow();
        expect(game.observe()).toEqual(before);
        const visible = game.observe();
        visible.position.x = 400;
        visible.actions.length = 0;
        expect(game.observe()).toEqual(before);
        expect(game.legal_actions()).toHaveLength(32);
        game.step({ angleIndex: 2, powerIndex: 2 });
        expect(game.observe().vaults).toBe(1);
        expect(game.reset()).toEqual(before);
    });
    it('run-up lasts 24 ticks and commits to ballistic motion without altering input', () => {
        const initial = reset();
        let s = launch(initial, 61, .8);
        const original = { ...s };
        for (let i = 0; i < 23; i++)
            s = tick(s);
        expect(s.phase).toBe('runup');
        s = tick(s);
        expect(s.phase).toBe('airborne');
        expect(s.vy).toBeGreaterThan(0);
        expect(initial.vaults).toBe(0);
        expect(original.runTicks).toBe(24);
        expect(() => launch(s, 79, .8)).toThrow();
    });
    it('counts a long fall once per flight and catches a lower ledge', () => {
        let s: State = { ...reset(), x: -8, y: 8, phase: 'airborne', vy: -1, peak: 8, best: 8 };
        for (let i = 0; i < 500 && s.phase !== 'standing'; i++)
            s = tick(s);
        expect(s.phase).toBe('standing');
        expect(s.falls).toBe(1);
        expect(s.y).toBe(0);
        // Starting a lower vault must not count as falling just because a previous best was higher.
        const next = tick(launch({ ...reset(), best: 30 }, 61, .8));
        expect(next.falls).toBe(0);
    });
    it('rejects malformed chunks', () => {
        for (const input of [[], [{ name: 'bad', baseY: 0, rows: ['S?C', '###'] }], [{ name: 'bad', baseY: 0, rows: ['S.C', '##'] }], [{ name: 'bad', baseY: 0, rows: ['...', '###'] }], [{ name: 'bad', baseY: 0, rows: ['SSC', '###'] }], [{ name: 'bad', baseY: 0, rows: ['S.C', '...'] }]])
            expect(() => parseTower(input)).toThrow();
    });
    it('reaches the crown by searching the 32 actions from the actual start', () => {
        const solution = searchTower();
        expect(solution.actions.length).toBeGreaterThan(3);
        let s = reset();
        for (const a of solution.actions)
            s = step(s, a);
        expect(outcome(s)).toBe('won');
        expect(legal_actions(s)).toEqual([]);
        expect(solution.sections).toEqual(['Courtyard', 'Battlements', 'Belfry']);
    }, 30000);
});
