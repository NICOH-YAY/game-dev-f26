import './style.css';
import { reset, tick, launch, DT, observe, type State } from '../../src/sim/index.js';
import { TowerScene } from './scene.js';
const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = el<HTMLCanvasElement>('game');
const overlay = el('overlay');
const start = el<HTMLButtonElement>('start');
let state: State = reset();
let mode: 'title' | 'playing' | 'victory' = 'title';
let angle = 61, charging = false, chargeTime = 0, power = 0;
let accumulator = 0, last = performance.now(), toastTime = 0, best = 0, lastSaved = 0;
const keys = new Set<string>();
try {
    const stored = Number(localStorage.getItem('vaulting-ambition-best'));
    if (Number.isFinite(stored) && stored > 0)
        best = stored;
}
catch { /* Storage may be blocked. */ }
const scene = new TowerScene(canvas);
const art = new Image();
art.onload = () => { el('overlay').style.background = 'linear-gradient(90deg,#101a2bf5,#101a2bb0 50%,#101a2b55)'; el('overlay').style.isolation = 'isolate'; (document.querySelector('.title-art') as HTMLElement).style.backgroundImage = `url("${art.src}")`; };
art.src = `${import.meta.env.BASE_URL}art/title.png`;
function begin() { state = reset(); mode = 'playing'; overlay.hidden = true; el('controls').hidden = false; charging = false; chargeTime = 0; power = 0; accumulator = 0; keys.clear(); toast('COURTYARD ? AIM HIGH'); }
start.addEventListener('click', begin);
function toast(message: string) { el('toast').textContent = message; toastTime = 2.4; }
function charge() { if (mode === 'playing' && state.phase === 'standing' && !charging) {
    charging = true;
    chargeTime = 0;
    power = 0;
} }
function release() { if (!charging)
    return; charging = false; if (mode === 'playing' && state.phase === 'standing') {
    state = launch(state, angle, power);
    if (state.snapped)
        toast('SNAP! TOO BOLD.');
} }
canvas.addEventListener('pointermove', e => { if (mode === 'playing' && state.phase === 'standing')
    angle = scene.pointerAngle(e.clientX, e.clientY, state); });
canvas.addEventListener('pointerdown', e => { if (e.button === 0) {
    canvas.setPointerCapture(e.pointerId);
    charge();
} });
canvas.addEventListener('pointerup', e => { if (e.button === 0)
    release(); });
canvas.addEventListener('pointercancel', () => { charging = false; power = 0; });
canvas.addEventListener('contextmenu', e => e.preventDefault());
window.addEventListener('keydown', e => {
    if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code))
        e.preventDefault();
    if (e.repeat)
        return;
    if (e.code === 'KeyR' && mode === 'playing') {
        charging = false;
        keys.clear();
        if (window.confirm('Restart at the courtyard? Your current climb and timer will reset.'))
            begin();
        last = performance.now();
        accumulator = 0;
        return;
    }
    if ((e.code === 'Enter' || e.code === 'Space') && mode !== 'playing') {
        begin();
        return;
    }
    keys.add(e.code);
    if (e.code === 'Space')
        charge();
});
window.addEventListener('keyup', e => { keys.delete(e.code); if (e.code === 'Space')
    release(); });
window.addEventListener('blur', () => { keys.clear(); charging = false; power = 0; accumulator = 0; });
document.addEventListener('visibilitychange', () => { last = performance.now(); accumulator = 0; charging = false; keys.clear(); });
const time = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
function win() { mode = 'victory'; charging = false; overlay.hidden = false; el('controls').hidden = true; el('message').innerHTML = `Crown claimed. Ambition vindicated.<br>${time(state.ticks * DT)} ? ${state.vaults} vaults ? ${state.falls} falls`; start.textContent = 'CLIMB AGAIN ?'; (document.querySelector('.eyebrow') as HTMLElement).textContent = 'THE CROWN IS YOURS'; toast(''); }
function frame(now: number) {
    const dt = document.hidden ? 0 : Math.min((now - last) / 1000, .1);
    last = now;
    if (mode === 'playing') {
        if (state.phase === 'standing') {
            if (keys.has('KeyA') || keys.has('ArrowLeft'))
                angle = Math.min(155, angle + dt * 65);
            if (keys.has('KeyD') || keys.has('ArrowRight'))
                angle = Math.max(25, angle - dt * 65);
        }
        if (charging) {
            chargeTime += dt;
            power = chargeTime < 1.05 ? chargeTime / 1.05 : .6 + .4 * Math.cos((chargeTime - 1.05) * 4.6);
        }
        accumulator += dt;
        while (accumulator >= DT) {
            const oldSection = observe(state).section;
            state = tick(state);
            accumulator -= DT;
            if (state.landImpact > 0) {
                scene.landing(state);
                if (state.landImpact > 12)
                    toast('A LONG WAY DOWN. STILL IN IT.');
            }
            if (observe(state).section !== oldSection && state.y > 0)
                toast(observe(state).section.toUpperCase());
            if (state.won) {
                win();
                break;
            }
        }
    }
    best = Math.max(best, state.best);
    if (best > lastSaved + .1) {
        try {
            localStorage.setItem('vaulting-ambition-best', String(best));
            lastSaved = best;
        }
        catch {
            lastSaved = best;
        }
    }
    const o = observe(state);
    el('section').textContent = o.section.toUpperCase();
    el('height').textContent = `HEIGHT ${Math.max(0, Math.floor(state.y))}m / BEST ${Math.floor(best)}m`;
    el('stats').textContent = `${time(state.ticks * DT)} ? ${state.vaults} VAULTS ? ${state.falls} FALLS`;
    el('angle').textContent = `${Math.round(angle)}?`;
    el('power').style.width = `${power * 100}%`;
    el('power').style.background = power >= .9 ? '#df8674' : '#dbb86d';
    el('powerLabel').textContent = state.phase === 'runup' ? 'PLANTING' : state.phase === 'airborne' ? (state.snapped ? 'SNAPPED' : 'COMMITTED') : charging ? `${Math.round(power * 100)}%` : 'READY';
    toastTime -= dt;
    if (toastTime <= 0)
        el('toast').textContent = '';
    scene.render(state, angle, dt);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
