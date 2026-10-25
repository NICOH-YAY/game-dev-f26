import { course, type Vec, type Box } from './level.js';
export { course, validateCourse } from './level.js';
export type { Vec } from './level.js';
export const C = Object.freeze({ radius: .42, reach: 4.5, gravity: 20, maxLaunch: 14, minLaunch: 5, lookBias: .18, upBias: .22, nudge: 2.0, maxNudgeSpeed: 1.1, friction: 8, bendSeconds: .8, voidY: -16 });
export const DT = 1 / 120;
export interface State {
    p: Vec;
    v: Vec;
    grounded: boolean;
    plant: Vec | null;
    bend: number;
    checkpoint: Vec;
    saved: boolean;
    won: boolean;
    time: number;
    bestHeight: number;
    vaults: number;
    landings: number;
}
export interface Action {
    yawBucket: number;
    pitchBucket: number;
    bendBucket: number;
}
export const add = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
export const scale = (a: Vec, n: number): Vec => ({ x: a.x * n, y: a.y * n, z: a.z * n });
export const sub = (a: Vec, b: Vec) => add(a, scale(b, -1));
export const length = (a: Vec) => Math.hypot(a.x, a.y, a.z);
export const unit = (a: Vec): Vec => scale(a, 1 / (length(a) || 1));
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
export function reset(): State { return { p: { ...course.spawn }, v: { x: 0, y: 0, z: 0 }, grounded: true, plant: null, bend: 0, checkpoint: { ...course.spawn }, saved: false, won: false, time: 0, bestHeight: 0, vaults: 0, landings: 0 }; }
export function respawn(s: State, bottom = false): State { return bottom ? reset() : { ...s, p: { ...s.checkpoint }, v: { x: 0, y: 0, z: 0 }, grounded: true, plant: null, bend: 0, won: false }; }
// Camera position is sphere center; all rays and contacts use this same eye.
export function raycast(origin: Vec, dir: Vec) {
    const d = unit(dir);
    let nearest: {
        point: Vec;
        distance: number;
        box: Box;
    } | null = null;
    for (const box of course.boxes) {
        let lo = 0, hi: number = C.reach;
        for (const k of ['x', 'y', 'z'] as const) {
            if (Math.abs(d[k]) < 1e-9) {
                if (origin[k] < box.min[k] || origin[k] > box.max[k]) {
                    hi = -1;
                    break;
                }
            }
            else {
                const a = (box.min[k] - origin[k]) / d[k], b = (box.max[k] - origin[k]) / d[k];
                lo = Math.max(lo, Math.min(a, b));
                hi = Math.min(hi, Math.max(a, b));
            }
        }
        if (hi >= lo && lo > 1e-6 && (!nearest || lo < nearest.distance))
            nearest = { point: add(origin, scale(d, lo)), distance: lo, box };
    }
    return nearest;
}
export function plant(s: State, look: Vec): State { const hit = raycast(s.p, look); return hit ? { ...s, plant: { ...hit.point }, bend: 0 } : s; }
export function simulateLaunch(s: State, plantPoint: Vec, bend: number, lookDir: Vec): State {
    const away = unit(sub(s.p, plantPoint));
    const dir = unit(add(add(away, scale(unit(lookDir), C.lookBias)), { x: 0, y: C.upBias, z: 0 }));
    return { ...s, v: scale(dir, C.minLaunch + (C.maxLaunch - C.minLaunch) * clamp(bend, 0, 1)), plant: null, bend: 0, grounded: false, vaults: s.vaults + 1 };
}
export function release(s: State, look: Vec): State { return s.plant ? simulateLaunch(s, s.plant, s.bend, look) : s; }
export function tick(input: State, nudge: Vec = { x: 0, y: 0, z: 0 }): State {
    if (input.won)
        return input;
    let s: State = { ...input, p: { ...input.p }, v: { ...input.v }, time: input.time + DT };
    const wasGrounded = s.grounded;
    s.grounded = false;
    // Nudge acceleration is capped independently of vault momentum.
    for (const k of ['x', 'z'] as const) {
        const a = clamp(nudge[k], -1, 1) * C.nudge;
        if (Math.abs(s.v[k]) < C.maxNudgeSpeed || a * s.v[k] < 0)
            s.v[k] += a * DT;
        if (wasGrounded)
            s.v[k] *= Math.exp(-C.friction * DT);
    }
    s.v.y -= C.gravity * DT;
    // Four substeps plus closest-point sphere resolution prevent thin-box tunneling.
    for (let substep = 0; substep < 4; substep++) {
        s.p = add(s.p, scale(s.v, DT / 4));
        for (let pass = 0; pass < 3; pass++)
            for (const b of course.boxes) {
                if (s.p.x < b.min.x - C.radius || s.p.x > b.max.x + C.radius || s.p.y < b.min.y - C.radius || s.p.y > b.max.y + C.radius || s.p.z < b.min.z - C.radius || s.p.z > b.max.z + C.radius)
                    continue;
                const q: Vec = { x: clamp(s.p.x, b.min.x, b.max.x), y: clamp(s.p.y, b.min.y, b.max.y), z: clamp(s.p.z, b.min.z, b.max.z) };
                let delta = sub(s.p, q), dist = length(delta);
                if (dist >= C.radius)
                    continue;
                if (dist < 1e-9) {
                    const faces = ([{ k: 'x', v: b.min.x, sign: -1 }, { k: 'x', v: b.max.x, sign: 1 }, { k: 'y', v: b.min.y, sign: -1 }, { k: 'y', v: b.max.y, sign: 1 }, { k: 'z', v: b.min.z, sign: -1 }, { k: 'z', v: b.max.z, sign: 1 }] as const).map(f => ({ ...f, d: Math.abs(s.p[f.k] - f.v) })).sort((a, b) => a.d - b.d);
                    const f = faces[0];
                    delta = { x: 0, y: 0, z: 0 };
                    delta[f.k] = f.sign;
                    s.p[f.k] = f.v + f.sign * C.radius;
                    dist = C.radius;
                }
                else {
                    delta = scale(delta, 1 / dist);
                    s.p = add(s.p, scale(delta, C.radius - dist));
                }
                const vn = s.v.x * delta.x + s.v.y * delta.y + s.v.z * delta.z;
                if (vn < 0)
                    s.v = sub(s.v, scale(delta, vn));
                if (delta.y > .65) {
                    s.grounded = true;
                    if (b.checkpoint && !s.saved) {
                        s.saved = true;
                        s.checkpoint = { x: (b.min.x + b.max.x) / 2, y: b.max.y + C.radius, z: (b.min.z + b.max.z) / 2 };
                    }
                    if (b.goal)
                        s.won = true;
                }
            }
    }
    if (s.grounded && !wasGrounded)
        s.landings++;
    if (s.plant) {
        if (length(sub(s.p, s.plant)) > C.reach + .5) {
            s.plant = null;
            s.bend = 0;
        }
        else
            {
                const toward = unit(sub(s.plant, s.p));
                const push = Math.max(0, nudge.x * toward.x + nudge.z * toward.z);
                s.bend = clamp(s.bend + DT / C.bendSeconds + push * DT * .08, 0, 1);
            }
    }
    s.bestHeight = Math.max(s.bestHeight, s.p.y - C.radius);
    if (s.p.y < C.voidY)
        s = respawn(s);
    return s;
}
export function direction(yawBucket: number, pitchBucket: number): Vec { const yaw = yawBucket * Math.PI * 2 / 16, pitch = -Math.PI / 2 + (pitchBucket + .5) * Math.PI / 8; return { x: Math.sin(yaw) * Math.cos(pitch), y: Math.sin(pitch), z: -Math.cos(yaw) * Math.cos(pitch) }; }
export function legal_actions(s: State): Action[] { if (s.won || (!s.grounded && !s.plant))
    return []; const out: Action[] = []; for (let y = 0; y < 16; y++)
    for (let p = 0; p < 8; p++)
        if (raycast(s.p, direction(y, p)))
            for (let b = 0; b < 4; b++)
                out.push({ yawBucket: y, pitchBucket: p, bendBucket: b }); return out; }
export function step(s: State, a: Action): State {
    if (!a || !Number.isInteger(a.yawBucket) || !Number.isInteger(a.pitchBucket) || !Number.isInteger(a.bendBucket) || a.yawBucket < 0 || a.yawBucket >= 16 || a.pitchBucket < 0 || a.pitchBucket >= 8 || a.bendBucket < 0 || a.bendBucket >= 4 || s.won || (!s.grounded && !s.plant))
        return s;
    const look = direction(a.yawBucket, a.pitchBucket), hit = raycast(s.p, look);
    if (!hit)
        return s;
    let next = simulateLaunch(s, hit.point, (a.bendBucket + 1) / 4, look);
    // A discrete action charges for its prescribed duration, then advances until landing.
    next.time += C.bendSeconds * (a.bendBucket + 1) / 4;
    for (let i = 0; i < 360; i++) {
        next = tick(next);
        if (next.grounded || next.won)
            break;
    }
    return next;
}
export function observe(s: State) { return { position: { ...s.p }, velocity: { ...s.v }, grounded: s.grounded, attached: s.plant ? { ...s.plant } : null, bend: s.bend, time: s.time, height: s.p.y - C.radius, checkpoint: s.saved, won: s.won, viewRays: Array.from({ length: 128 }, (_, i) => { const yawBucket = Math.floor(i / 8), pitchBucket = i % 8; const hit = raycast(s.p, direction(yawBucket, pitchBucket)); return { yawBucket, pitchBucket, hit: hit ? { point: { ...hit.point }, distance: hit.distance } : null }; }) }; }
export function outcome(s: State) { return s.won ? 'won' : 'playing'; }
