/// <reference types="vite/client" />
import './style.css';
import { reset, tick, plant, release, respawn, raycast, DT, C, course, type State, type Vec } from '../../src/sim/index.js';
import { turnView } from './controls.js';
import { TowerScene } from './scene.js';
import { FpsWindow, MAX_FRAME_DT, qualityStep, simulationFrame, type Resolution } from './performance.js';
const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = el<HTMLCanvasElement>('game'), overlay = el('overlay');
const gpuMessage = 'Your browser is rendering 3D without the GPU. Enable hardware acceleration (Brave/Chrome: Settings > System > Use graphics acceleration when available, then relaunch) or try another browser.';
function showGpuBanner() { el('gpu-banner').textContent = gpuMessage; el('gpu-banner').hidden = false; }
let scene: TowerScene;
try { scene = new TowerScene(canvas); }
catch (error) { showGpuBanner(); el<HTMLButtonElement>('start').disabled = true; throw error; }
canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); showGpuBanner(); menu(); });
const fpsWindow = new FpsWindow();
let qualityChecked = 0, lowFpsSince: number | null = null;
const resolutionOption = el<HTMLSelectElement>('resolution');
resolutionOption.onchange = () => {
    scene.setResolution(resolutionOption.value as Resolution);
    fpsWindow.reset(); lowFpsSince = null; qualityChecked = performance.now();
};
let state: State = reset(), started = false, paused = true, yaw = 0, pitch = -.9, sensitivity = 1, holding = false, acc = 0, last = performance.now(), bestHeight = 0, bestTime = 0, toastUntil = 0;
let manualSteps = false;
let hadPointerLock = false, rightDragging = false, dragX = 0, dragY = 0;
const keys = new Set<string>();
try {
    const value = JSON.parse(localStorage.getItem('vaulting-ambition-3d') ?? '{}');
    bestHeight = Number.isFinite(value.height) ? Math.max(0, value.height) : 0;
    bestTime = Number.isFinite(value.time) ? Math.max(0, value.time) : 0;
}
catch { }
const save = () => { try {
    localStorage.setItem('vaulting-ambition-3d', JSON.stringify({ height: bestHeight, time: bestTime }));
}
catch { } };
const look = (): Vec => ({ x: -Math.sin(yaw) * Math.cos(pitch), y: Math.sin(pitch), z: -Math.cos(yaw) * Math.cos(pitch) });
const toast = (s: string) => { el('toast').textContent = s; toastUntil = performance.now() + 3000; };
let audio: AudioContext | undefined;
function sound(launch: boolean) {
    try {
        audio ??= new AudioContext();
        void audio.resume();
        const gain = audio.createGain(), filter = audio.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(launch ? 1800 : 300, audio.currentTime);
        filter.frequency.exponentialRampToValueAtTime(80, audio.currentTime + .3);
        const buffer = audio.createBuffer(1, Math.floor(audio.sampleRate * .35), audio.sampleRate), samples = buffer.getChannelData(0);
        // Deterministic synthesized rush: no downloaded sounds or random sim state.
        for (let i = 0; i < samples.length; i++)
            samples[i] = Math.sin(i * 1.73) * Math.sin(i * .137) * Math.cos(i * .931);
        const source = audio.createBufferSource();
        source.buffer = buffer;
        gain.gain.setValueAtTime(launch ? .18 : .12, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .32);
        source.connect(filter).connect(gain).connect(audio.destination);
        source.start();
    }
    catch { }
}
function cancel() { rightDragging = false; holding = false; state = { ...state, plant: null, bend: 0 }; keys.clear(); acc = 0; }
function menu() { paused = true; save(); cancel(); overlay.hidden = false; el('heading').textContent = state.won ? 'CROWN CLAIMED' : 'PAUSED'; el('start').textContent = state.won ? 'CLIMB AGAIN' : 'CLICK TO RESUME'; el('title').hidden = true; }
function resume() {
    started = true;
    paused = false;
    overlay.hidden = true;
    el('title').hidden = true;
    last = performance.now();
    acc = 0;
    void lock();
}
async function lock() {
    try { await canvas.requestPointerLock?.(); }
    catch { /* The game remains playable using fallback look. */ }
}
el('start').onclick = () => {
    if (!started || state.won) { state = reset(); yaw = 0; pitch = -.9; }
    resume();
};
document.addEventListener('pointerlockchange', () => {
    rightDragging = false;
    const locked = document.pointerLockElement === canvas;
    if (!locked && hadPointerLock && started && !paused) menu();
    else if (locked && paused) document.exitPointerLock?.();
    hadPointerLock = locked;
});
document.addEventListener('pointerlockerror', () => {
    rightDragging = false;
    if (!paused) toast('Mouse lock unavailable / Hold right mouse and drag to look');
});
document.addEventListener('mousemove', e => {
    if (paused) return;
    const locked = document.pointerLockElement === canvas;
    if (!locked && !rightDragging) return;
    const dx = locked ? e.movementX : e.clientX - dragX;
    const dy = locked ? e.movementY : e.clientY - dragY;
    dragX = e.clientX; dragY = e.clientY;
    yaw -= dx * .002 * sensitivity;
    pitch = Math.max(-1.52, Math.min(1.52, pitch - dy * .002 * sensitivity));
});
canvas.addEventListener('mousedown', e => {
    if (e.button === 2 && !paused) {
        e.preventDefault(); rightDragging = true; dragX = e.clientX; dragY = e.clientY;
    }
});
document.addEventListener('mouseup', e => { if (e.button === 2) rightDragging = false; });
canvas.addEventListener('mousedown', e => { if (e.button === 0 && !paused) {
    holding = true;
    state = plant(state, look());
} });
document.addEventListener('mouseup', e => { if (e.button !== 0)
    return; holding = false; if (paused || !state.plant)
    return; state = release(state, look()); scene.launch(); sound(true); });
window.addEventListener('keydown', e => {
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'KeyR', 'KeyF', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape'].includes(e.code)) e.preventDefault();
    if (e.code === 'F3') { e.preventDefault(); if (!e.repeat) el('fps').hidden = !el('fps').hidden; return; }
    if (e.code === 'Escape') {
        if (started && !paused) { menu(); document.exitPointerLock?.(); }
        return;
    }
    if (!paused) keys.add(e.code);
});
window.addEventListener('keyup', e => keys.delete(e.code));
document.addEventListener('visibilitychange', () => { fpsWindow.reset(); lowFpsSince = null; if (document.hidden && started) {
    document.exitPointerLock?.();
    menu();
} });
window.addEventListener('blur', () => { if (started) {
    document.exitPointerLock?.();
    menu();
} });
el<HTMLInputElement>('sensitivity').oninput = e => { sensitivity = Number((e.target as HTMLInputElement).value); el('sensvalue').textContent = sensitivity.toFixed(1); };
el('checkpoint').onclick = () => { started = true; state = respawn(state); cancel(); toast('Returned to checkpoint'); resume(); };
el('bottom').onclick = () => { state = reset(); yaw = 0; pitch = -.9; cancel(); resume(); };
canvas.addEventListener('contextmenu', e => e.preventDefault());
const format = (t: number) => `${Math.floor(t / 60).toString().padStart(2, '0')}:${(t % 60).toFixed(2).padStart(5, '0')}`;
function advance(dt: number) {
    if (!paused) {
        const timing = simulationFrame(acc, dt);
        acc = timing.remainder;
        for (let step = 0; step < timing.steps; step++) {
            ({ yaw, pitch } = turnView(yaw, pitch, keys, DT));
            const prev = state;
            const forward = Number(keys.has('KeyW')) - Number(keys.has('KeyS')), side = Number(keys.has('KeyD')) - Number(keys.has('KeyA'));
            let nudge = { x: -Math.sin(yaw) * forward + Math.cos(yaw) * side, y: 0, z: -Math.cos(yaw) * forward - Math.sin(yaw) * side };
            const n = Math.hypot(nudge.x, nudge.z);
            if (n > 1)
                nudge = { x: nudge.x / n, y: 0, z: nudge.z / n };
            if (holding && !state.plant)
                state = plant(state, look());
            state = tick(state, nudge);
            if (state.landings > prev.landings) {
                scene.land(state.p);
                sound(false);
            }
            if (state.saved && !prev.saved)
                toast('CHECKPOINT SAVED / Pause to return here');
            if (state.won) {
                if (!bestTime || state.time < bestTime)
                    bestTime = state.time;
                save();
                document.exitPointerLock?.();
                menu();
                el('message').textContent = `Summit in ${format(state.time)} / ${state.vaults} vaults`;
                break;
            }
        }
        if (state.bestHeight > bestHeight) {
            bestHeight = state.bestHeight;
        }
    }
}
function frame(now: number) {
    const elapsed = Math.max(0, (now - last) / 1000);
    const dt = Math.min(elapsed, MAX_FRAME_DT);
    last = now;
    if (!manualSteps) advance(elapsed);
    if (!document.hidden) {
        const fps = fpsWindow.sample(now);
        if (fps !== null) {
            el('fps').textContent = `${fps.toFixed(0)} FPS / ${scene.resolution} / F3`;
            if (now - qualityChecked >= 1000) {
                qualityChecked = now;
                const next = qualityStep(scene.resolution, fps);
                if (next !== scene.resolution) {
                    scene.setResolution(next); resolutionOption.value = next;
                    toast(`Resolution lowered to ${next} for performance`);
                    fpsWindow.reset(); lowFpsSince = null;
                } else if (scene.resolution === '320x180' && fps < 15) {
                    lowFpsSince ??= now;
                    if (now - lowFpsSince >= 3000) showGpuBanner();
                } else lowFpsSince = null;
            }
        }
    } else { fpsWindow.reset(); lowFpsSince = null; }
    const hit = raycast(state.p, look());
    el('lookmode').textContent = document.pointerLockElement === canvas ? 'LOOK: Mouse / Esc: pause' : 'LOOK: Hold right mouse + drag / Q E or left/right arrows: turn / R F or up/down arrows: pitch / Esc: pause';
    el('crosshair').classList.toggle('reach', !!hit);
    el('bend').style.width = `${state.bend * 100}%`;
    el('timer').textContent = format(state.time);
    el('stage').textContent = [...course.stages].reverse().find(s => state.p.y >= s.y)?.name.toUpperCase() ?? 'GATE';
    el('stats').textContent = `HEIGHT ${Math.max(0, state.p.y - C.radius).toFixed(1)}m / 33m\nBEST ${bestHeight.toFixed(1)}m / TIME ${bestTime ? format(bestTime) : '--'}\nVAULTS ${state.vaults} / CHECKPOINT ${state.saved ? 'SAVED' : '--'}`;
    el('hint').textContent = state.plant ? 'PLANTED / Hold to bend / Look to steer / Release to launch' : hit ? 'IN REACH / Hold left mouse to plant' : 'Aim at a nearby surface / Look down to vault';
    if (now > toastUntil)
        el('toast').textContent = '';
    scene.render(state, yaw, pitch, hit?.point ?? null, dt);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

if (import.meta.env.DEV) {
    const debug = {
        getState: () => structuredClone({ ...state, yaw, pitch, paused }),
        setView: (newYaw: number, newPitch: number) => {
            if (!Number.isFinite(newYaw) || !Number.isFinite(newPitch)) return;
            yaw = newYaw; pitch = Math.max(-1.52, Math.min(1.52, newPitch));
        },
        plant: () => { if (!paused) { holding = true; state = plant(state, look()); } },
        release: () => { holding = false; if (!paused && state.plant) state = release(state, look()); },
        // First step takes over the clock from RAF; step(0) enables manual QA timing.
        step: (ms: number) => {
            if (!Number.isFinite(ms) || ms < 0) return;
            if (!manualSteps) { manualSteps = true; acc = 0; }
            advance(ms / 1000);
        },
    };
    (window as Window & { __va?: typeof debug }).__va = debug;
}
