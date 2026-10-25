import { tower, type Level } from './level.js';
export const DT = 1 / 120;
export const ANGLES = [25, 43, 61, 79, 101, 119, 137, 155] as const;
export const POWERS = [.4, .6, .8, 1] as const;
export interface Action {
    angleIndex: number;
    powerIndex: number;
}
export interface State {
    x: number;
    y: number;
    vx: number;
    vy: number;
    phase: 'standing' | 'runup' | 'airborne';
    angle: number;
    power: number;
    runTicks: number;
    ticks: number;
    vaults: number;
    falls: number;
    best: number;
    peak: number;
    won: boolean;
    snapped: boolean;
    falling: boolean;
    landImpact: number;
    support: string | null;
}
export function reset(level: Level = tower): State {
    return { ...level.start, vx: 0, vy: 0, phase: 'standing', angle: 61, power: 0, runTicks: 0, ticks: 0, vaults: 0, falls: 0, best: level.start.y, peak: level.start.y, won: false, snapped: false, falling: false, landImpact: 0, support: level.solids.find(b => b.y + b.h === level.start.y && level.start.x >= b.x && level.start.x <= b.x + b.w)?.id ?? null };
}
export function legal_actions(s: State): Action[] { return s.phase === 'standing' && !s.won ? ANGLES.flatMap((_, angleIndex) => POWERS.map((_, powerIndex) => ({ angleIndex, powerIndex }))) : []; }
export function launch(s: State, angle: number, power: number): State {
    if (s.phase !== 'standing' || s.won || !Number.isFinite(angle) || angle < 25 || angle > 155 || !Number.isFinite(power) || power < 0 || power > 1)
        throw Error('Illegal vault');
    return { ...s, phase: 'runup', angle, power, peak: s.y, falling: false, runTicks: 24, vaults: s.vaults + 1, snapped: power >= .9 && Math.min(angle, 180 - angle) < 35, landImpact: 0 };
}
export function tick(input: State, level: Level = tower): State {
    if (input.won)
        return { ...input };
    const s = { ...input, ticks: input.ticks + 1, landImpact: 0 };
    if (s.phase === 'standing')
        return s;
    const dir = Math.cos(s.angle * Math.PI / 180) > 0 ? 1 : -1;
    if (s.phase === 'runup') {
        // Run-up is clamped to the supporting ledge; planting always starts from solid ground.
        const support = level.solids.find(b => b.id === s.support);
        if (support)
            s.x = Math.max(support.x + .24, Math.min(support.x + support.w - .24, s.x + dir * (1 + s.power) * DT));
        if (--s.runTicks > 0)
            return s;
        s.phase = 'airborne';
        s.support = null;
        const speed = 7 + 6 * s.power;
        const radians = s.angle * Math.PI / 180;
        s.vx = s.snapped ? dir * 2.8 : Math.cos(radians) * speed;
        s.vy = s.snapped ? 2 : Math.sin(radians) * speed;
    }
    const oldX = s.x, oldY = s.y;
    const half = .23, height = 1.15;
    s.vy -= 12 * DT;
    s.x += s.vx * DT;
    s.y += s.vy * DT;
    // Swept side and ceiling tests prevent tunneling at fixed-step speeds.
    for (const b of level.solids) {
        if (oldY + height > b.y + .001 && oldY < b.y + b.h - .001) {
            if (s.vx > 0 && oldX + half <= b.x + .001 && s.x + half > b.x) {
                s.x = b.x - half;
                s.vx = -Math.abs(s.vx) * .38;
                s.vy = Math.min(s.vy, -.6);
            }
            else if (s.vx < 0 && oldX - half >= b.x + b.w - .001 && s.x - half < b.x + b.w) {
                s.x = b.x + b.w + half;
                s.vx = Math.abs(s.vx) * .38;
                s.vy = Math.min(s.vy, -.6);
            }
        }
        if (s.x + half > b.x && s.x - half < b.x + b.w && s.vy > 0 && oldY + height <= b.y && s.y + height >= b.y) {
            s.y = b.y - height;
            s.vy = -.5;
        }
    }
    if (s.vy <= 0) {
        const tops = level.solids.filter(b => s.x + half > b.x && s.x - half < b.x + b.w && oldY >= b.y + b.h - .001 && s.y <= b.y + b.h).sort((a, b) => (b.y + b.h) - (a.y + a.h));
        if (tops.length) {
            const b = tops[0];
            s.landImpact = -s.vy;
            s.y = b.y + b.h;
            s.vx = 0;
            s.vy = 0;
            s.phase = 'standing';
            s.support = b.id;
            s.falling = false;
        }
    }
    s.best = Math.max(s.best, s.y);
    s.peak = Math.max(s.peak, s.y);
    if (s.phase === 'airborne' && !s.falling && s.peak - s.y > 3) {
        s.falls++;
        s.falling = true;
    }
    // A fall outside the tower lands at the courtyard boundary rather than entering an endless void.
    if (s.y < -8) {
        s.x = level.start.x;
        s.y = level.start.y;
        s.vx = 0;
        s.vy = 0;
        s.phase = 'standing';
        s.support = reset(level).support;
        if (!s.falling)
            s.falls++;
        s.falling = false;
    }
    if (Math.abs(s.x - level.crown.x) < .9 && Math.abs(s.y - level.crown.y) < 1.3) {
        s.won = true;
        s.vx = 0;
        s.vy = 0;
    }
    return s;
}
export function predictVault(s: State, angle: number, power: number, level: Level = tower): State[] {
    let current = launch(s, angle, power);
    const states = [current];
    for (let n = 0; n < 1200 && current.phase !== 'standing' && !current.won; n++) {
        current = tick(current, level);
        states.push(current);
    }
    return states;
}
export function step(s: State, a: Action, level: Level = tower): State {
    if (!legal_actions(s).some(x => x.angleIndex === a.angleIndex && x.powerIndex === a.powerIndex))
        throw Error('Illegal discrete action');
    const trace = predictVault(s, ANGLES[a.angleIndex], POWERS[a.powerIndex], level);
    return trace[trace.length - 1];
}
export function observe(s: State, level: Level = tower) {
    return { position: { x: s.x, y: s.y }, velocity: { x: s.vx, y: s.vy }, phase: s.phase, height: s.y, best: s.best, vaults: s.vaults, falls: s.falls, time: s.ticks * DT, section: level.sections.filter(x => s.y >= x.y).at(-1)?.name ?? 'Courtyard', ledges: level.solids.filter(b => Math.abs(b.y - s.y) < 14).map(b => ({ ...b })), crown: Math.abs(level.crown.y - s.y) < 14 ? { ...level.crown } : null, actions: legal_actions(s), outcome: outcome(s) };
}
export function outcome(s: State) { return s.won ? 'won' as const : 'playing' as const; }
