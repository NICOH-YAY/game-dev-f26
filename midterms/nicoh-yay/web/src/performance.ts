import { DT } from '../../src/sim/index.js';

export const MAX_FRAME_DT = .25;
export function simulationFrame(remainder: number, elapsed: number) {
    const total = remainder + Math.min(MAX_FRAME_DT, Math.max(0, elapsed));
    const steps = Math.min(Math.round(MAX_FRAME_DT / DT), Math.floor((total + 1e-10) / DT));
    return { steps, remainder: Math.max(0, total - steps * DT) };
}

export const resolutions = ['320x180', '480x270', '640x360', 'native'] as const;
export type Resolution = typeof resolutions[number];
export function qualityStep(resolution: Resolution, fps: number): Resolution {
    return fps < 40 ? resolutions[Math.max(0, resolutions.indexOf(resolution) - 1)] : resolution;
}
export function renderSize(resolution: Resolution, width: number, height: number) {
    const scale = resolution === 'native' ? 1 : Math.min(1, Number(resolution.split('x')[0]) / width, Number(resolution.split('x')[1]) / height);
    return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}

// Keep the interval crossing the window boundary so slow RAFs are counted accurately.
export class FpsWindow {
    private samples: number[] = [];
    sample(now: number): number | null {
        this.samples.push(now);
        while (this.samples.length > 2 && this.samples[1] <= now - 1000) this.samples.shift();
        const span = now - this.samples[0];
        return span >= 1000 ? (this.samples.length - 1) * 1000 / span : null;
    }
    reset() { this.samples = []; }
}
