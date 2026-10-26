import { coffee, press, tick, type Coffee } from "./coffee.js";
/** Development controller. A fixed cadence, no wall clock and no model calls. */
export function scriptedShift(
  seed: number,
  fatigue = 0,
  interval = 450,
): Coffee {
  let c = coffee(seed, fatigue);
  while (c.elapsed < 105000) {
    const next = c.queue[0]?.keys[c.index];
    if (next) c = press(c, next);
    c = tick(c, interval);
  }
  return c;
}
