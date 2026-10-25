import { describe, expect, it } from 'vitest';
import { turnView } from '../web/src/controls.js';

describe('fallback look controls', () => {
    it('turns with arrows or Q/E and pitches with R/F', () => {
        expect(turnView(0, 0, new Set(['ArrowLeft', 'KeyR']), 1)).toEqual({ yaw: 1.5, pitch: 1.5 });
        expect(turnView(0, 0, new Set(['KeyE', 'ArrowDown']), 1)).toEqual({ yaw: -1.5, pitch: -1.5 });
        expect(turnView(0, 0, new Set(['KeyQ', 'KeyF']), 1)).toEqual({ yaw: 1.5, pitch: -1.5 });
    });
    it('clamps pitch and cancels opposing directions', () => {
        expect(turnView(2, 1.5, new Set(['KeyR']), 1)).toEqual({ yaw: 2, pitch: 1.52 });
        expect(turnView(2, -1.5, new Set(['KeyF']), 1).pitch).toBe(-1.52);
        expect(turnView(2, 0, new Set(['KeyQ', 'KeyE', 'ArrowUp', 'ArrowDown']), 1)).toEqual({ yaw: 2, pitch: 0 });
    });
});
