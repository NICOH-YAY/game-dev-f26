export function turnView(yaw: number, pitch: number, keys: ReadonlySet<string>, dt: number) {
    const pressed = (...codes: string[]) => Number(codes.some(code => keys.has(code)));
    return {
        yaw: yaw + (pressed('ArrowLeft', 'KeyQ') - pressed('ArrowRight', 'KeyE')) * dt * 1.5,
        pitch: Math.max(-1.52, Math.min(1.52, pitch + (pressed('ArrowUp', 'KeyR') - pressed('ArrowDown', 'KeyF')) * dt * 1.5)),
    };
}
