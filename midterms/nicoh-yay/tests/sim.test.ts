import { createHash } from 'node:crypto';
import { describe, it, expect } from 'vitest';
import { reset, tick, simulateLaunch, raycast, legal_actions, step, observe, respawn, direction, C, plant, release, outcome, course, validateCourse } from '../src/sim/index.js';
import { searchCheckpoint, searchCourse } from '../src/sim/search.js';
describe('first person pole simulation', () => {
    it('is deterministic', () => { const run = () => { let s = reset(); for (let i = 0; i < 600; i++) {
        if (i % 120 === 0)
            s = plant(s, { x: .1, y: -1, z: .1 });
        if (i % 120 === 96)
            s = release(s, { x: .2, y: 0, z: -1 });
        s = tick(s, { x: 0.2, y: 0, z: 0 });
    } return createHash('sha256').update(JSON.stringify(s)).digest('hex'); }; expect(run()).toBe(run()); });
    it('launches away from floor and wall with capped speed', () => { const s = reset(); for (const p of [{ x: 0, y: 0, z: 0 }, { x: 2, y: s.p.y, z: 0 }]) {
        const v = simulateLaunch(s, p, 1, { x: 0, y: 0, z: -1 }).v;
        expect(Math.hypot(v.x, v.y, v.z)).toBeCloseTo(C.maxLaunch);
        expect((s.p.x - p.x) * v.x + (s.p.y - p.y) * v.y).toBeGreaterThan(0);
    } });
    it('matches the launch equation at low bend and clamps overcharge', () => {
        const state = reset();
        const floor = { x: 0, y: 0, z: 0 };
        const low = simulateLaunch(state, floor, 0, { x: 0, y: 0, z: -1 });
        const normalizer = Math.hypot(1 + C.upBias, C.lookBias);
        expect(low.v.y).toBeCloseTo(C.minLaunch * (1 + C.upBias) / normalizer);
        expect(low.v.z).toBeCloseTo(-C.minLaunch * C.lookBias / normalizer);
        const wall = simulateLaunch(state, { x: 2, y: state.p.y, z: 0 }, 0, { x: 1, y: 0, z: 0 });
        const wallNormalizer = Math.hypot(1 - C.lookBias, C.upBias);
        expect(wall.v.x).toBeCloseTo(-C.minLaunch * (1 - C.lookBias) / wallNormalizer);
        expect(wall.v.y).toBeCloseTo(C.minLaunch * C.upBias / wallNormalizer);
        expect(simulateLaunch(state, floor, 5, { x: 0, y: 1, z: 0 }).v.y).toBe(C.maxLaunch);
        expect(state.vaults).toBe(0);
    });
    it('gives a charging bonus only when nudging toward the plant', () => {
        const attached = plant(reset(), { x: 1, y: -.2, z: 0 });
        expect(attached.plant).not.toBeNull();
        const forward = tick(attached, { x: 1, y: 0, z: 0 });
        const backward = tick(attached, { x: -1, y: 0, z: 0 });
        expect(forward.bend).toBeGreaterThan(backward.bend);
    });
    it('resolves floor collision', () => { let s = reset(); s.p.y = 3; for (let i = 0; i < 300; i++)
        s = tick(s); expect(s.p.y).toBeCloseTo(C.radius); expect(s.grounded).toBe(true); });
    it('saves one checkpoint and respawns there', () => { let s = reset(); const b = course.boxes.find(b => b.checkpoint)!; s.p = { x: b.min.x + 1, y: b.max.y + C.radius, z: b.min.z + 1 }; s = tick(s); expect(s.checkpoint.y).toBeGreaterThan(1); s = respawn(s); expect(s.p).toEqual(s.checkpoint); expect(respawn(s, true).p).toEqual(reset().p); });
    it('exposes only in reach rays, copies observations, refuses without mutation', () => { const s = reset(); const before = JSON.stringify(s); for (const a of legal_actions(s)) {
        expect(raycast(s.p, direction(a.yawBucket, a.pitchBucket))!.distance).toBeLessThanOrEqual(C.reach);
    } const o = observe(s); o.position.x = 999; expect(JSON.stringify(s)).toBe(before); expect(step(s, { yawBucket: 99, pitchBucket: 0, bendBucket: 0 })).toEqual(s); });
    it('validates course data', () => { expect(validateCourse(course)).toBe(true); expect(validateCourse({ boxes: [] })).toBe(false); expect(validateCourse(null)).toBe(false); expect(validateCourse({...course, boxes:[null]})).toBe(false); expect(validateCourse({...course, stages:[null,null,null,null,null]})).toBe(false); });
    it('beam search reaches checkpoint using only legal actions', () => { const result = searchCheckpoint(); expect(result.reached).toBe(true); let s = reset(); for (const a of result.actions) {
        expect(legal_actions(s)).toContainEqual(a);
        s = step(s, a);
    } expect(s.saved).toBe(true); console.log('Checkpoint search evidence', JSON.stringify({ expanded: result.expanded, actions: result.actions, height: s.p.y })); }, 60000);
    it('bends while holding and permits a midair replant', () => { let s = reset(); s = plant(s, { x: 0, y: -1, z: 0 }); expect(s.plant).not.toBeNull(); for (let i = 0; i < 96; i++)
        s = tick(s); expect(s.bend).toBeCloseTo(1); s = release(s, { x: 0, y: 0, z: -1 }); expect(s.v.y).toBeGreaterThan(12); s = tick(s); expect(s.grounded).toBe(false); s = plant(s, { x: 0, y: -1, z: 0 }); expect(s.plant).not.toBeNull(); expect(legal_actions(s).length).toBeGreaterThan(0); });
    it('slides against walls and cannot tunnel through a ceiling', () => { let s = reset(); s.p = { x: -4.5, y: 1, z: 0 }; s.v = { x: -14, y: 0, z: 2 }; for (let i = 0; i < 20; i++)
        s = tick(s); expect(s.p.x).toBeGreaterThanOrEqual(-5.5 + C.radius - 1e-6); expect(s.p.z).toBeGreaterThan(0); const b = course.boxes[2]; s = reset(); s.p = { x: (b.min.x + b.max.x) / 2, y: b.min.y - C.radius - .05, z: (b.min.z + b.max.z) / 2 }; s.v = { x: 0, y: 14, z: 0 }; for (let i = 0; i < 4; i++)
        s = tick(s); expect(s.p.y).toBeLessThanOrEqual(b.min.y - C.radius + 1e-6); expect(s.v.y).toBeLessThanOrEqual(0); });
    it('void respawns with elapsed time retained and goal wins only on contact', () => { let s = reset(); s.p.y = C.voidY - 1; s.time = 20; s = tick(s); expect(s.p).toEqual(s.checkpoint); expect(s.time).toBeGreaterThan(20); expect(outcome(s)).toBe('playing'); const b = course.boxes.find(b => b.goal)!; s.p = { x: b.min.x + .5, y: b.max.y + C.radius, z: b.min.z + .5 }; s = tick(s); expect(outcome(s)).toBe('won'); expect(tick(s)).toEqual(s); expect(outcome(respawn(s))).toBe('playing'); });
    it('keeps air movement much weaker than a vault', () => { let s = reset(); s.p = { x: 20, y: 20, z: 20 }; for (let i = 0; i < 60; i++)
        s = tick(s, { x: 1, y: 0, z: 0 }); expect(s.v.x).toBeLessThan(C.maxLaunch * .1); });
    it('rejects malformed and out of reach actions without advancing time', () => { const s = reset(); for (const a of [{ yawBucket: 0, pitchBucket: 7, bendBucket: 0 }, { yawBucket: 0, pitchBucket: 0, bendBucket: 4 }, { yawBucket: .5, pitchBucket: 0, bendBucket: 0 }])
        expect(step(s, a)).toBe(s); });
    it('searches full course within a bounded development budget', () => { const result = searchCourse('goal', 24, 60); let s = reset(); for (const a of result.actions) {
        expect(legal_actions(s)).toContainEqual(a);
        s = step(s, a);
    } expect(s.won).toBe(true); console.log('Summit search evidence', JSON.stringify({ reached: result.reached, expanded: result.expanded, actions: result.actions })); expect(result.reached).toBe(true); }, 60000);
});
