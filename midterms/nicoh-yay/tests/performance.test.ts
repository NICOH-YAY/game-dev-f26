import { describe, expect, it } from 'vitest';
import { DT, plant, reset, tick } from '../src/sim/index.js';
import { FpsWindow, qualityStep, renderSize, simulationFrame } from '../web/src/performance.js';

describe('frame timing', () => {
    for (const fps of [120, 60, 20, 10, 4]) it(`advances one real second at ${fps} FPS`, () => {
        let remainder = 0, ticks = 0;
        for (let i = 0; i < fps; i++) {
            const frame = simulationFrame(remainder, 1 / fps);
            ticks += frame.steps; remainder = frame.remainder;
        }
        expect(ticks * DT).toBeCloseTo(1);
        expect(remainder).toBeCloseTo(0);
    });
    it('charges bend using real elapsed time at 10 FPS', () => {
        let state = plant(reset(), { x: 0, y: -1, z: 0 });
        let remainder = 0;
        expect(state.plant).not.toBeNull();
        for (let i = 0; i < 8; i++) {
            const frame = simulationFrame(remainder, .1);
            remainder = frame.remainder;
            for (let j = 0; j < frame.steps; j++) state = tick(state);
        }
        expect(state.time).toBeCloseTo(.8);
        expect(state.bend).toBeCloseTo(1);
    });
    it('caps stalls at 250 ms / 30 ticks', () => {
        expect(simulationFrame(0, .5).steps).toBe(30);
        expect(simulationFrame(0, 10).steps).toBe(30);
    });
    it('retains fractional ticks', () => {
        const first = simulationFrame(0, DT / 2);
        expect(first.steps).toBe(0);
        expect(simulationFrame(first.remainder, DT / 2).steps).toBe(1);
    });
});
describe('quality', () => {
    it('steps down one level only below 40 FPS and stops at minimum', () => {
        expect(qualityStep('native', 39)).toBe('640x360');
        expect(qualityStep('640x360', 20)).toBe('480x270');
        expect(qualityStep('480x270', 2)).toBe('320x180');
        expect(qualityStep('320x180', 2)).toBe('320x180');
        expect(qualityStep('480x270', 40)).toBe('480x270');
    });
    it('fits the drawing budget while preserving viewport aspect', () => {
        expect(renderSize('480x270', 2560, 1277)).toEqual({ width: 480, height: 239 });
        expect(renderSize('native', 2560, 1277)).toEqual({ width: 2560, height: 1277 });
    });
    it('measures a rolling second including slow frames', () => {
        const fps = new FpsWindow();
        expect(fps.sample(0)).toBeNull();
        expect(fps.sample(500)).toBeNull();
        expect(fps.sample(1000)).toBe(2);
        expect(fps.sample(1500)).toBe(2);
    });
});
