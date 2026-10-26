import { describe, it, expect } from "vitest";
import {
  reset,
  observe,
  legal_actions,
  step,
  outcome,
  chapter,
  eligible,
} from "../src/sim.js";
import { dilemmas, validateData } from "../src/dilemmas.js";
import { coffee, tick, press } from "../src/coffee.js";
describe("Small Change contract", () => {
  it("validates all authored data", () => {
    expect(dilemmas.length).toBeGreaterThanOrEqual(24);
    expect(validateData()).toEqual([]);
  });
  it("copies only player knowledge", () => {
    const s = reset(7);
    const o = observe(s);
    expect(JSON.stringify(o)).not.toMatch(
      /lauraCloseness|melanieNormalization|ledger|rng|regularsTrust|effects/,
    );
    o.options.pop();
    expect(legal_actions(s).length).toBeGreaterThan(1);
  });
  it("refuses unknown and premature actions without mutation", () => {
    const s = reset(8);
    expect(step(s, "invented")).toEqual(s);
    expect(step(s, "continue")).toEqual(s);
  });
  it("same seed and choices produce same journal indefinitely", () => {
    const play = () => {
      let s = reset(42);
      for (let i = 0; i < 120; i++) {
        if (s.phase === "coffee") {
          let c = s.coffee;
          while (c.elapsed < 105000) {
            c = press(c, c.queue[0]?.keys[c.index] ?? "G");
            c = tick(c, 250);
          }
          s = step({ ...s, coffee: c }, "close");
        } else s = step(s, legal_actions(s)[0]);
      }
      return outcome(s);
    };
    expect(play()).toEqual(play());
  });
  it("escalation requires the prior compromise", () => {
    const s = reset(1);
    const d = dilemmas.find((d) => d.id === "shortchange-again")!;
    expect(eligible(s, d)).toBe(false);
    s.ledger.push("shortchange");
    expect(eligible(s, d)).toBe(true);
  });
  it("chapters reflect Laura growing differently", () => {
    const s = reset(1);
    const a = chapter(s);
    s.hidden.lauraCloseness = 0;
    s.hidden.lauraSelfReliance = 90;
    expect(chapter(s)).not.toBe(a);
  });
  it("coffee is seeded and mistakes consume time", () => {
    let a = coffee(3, 80),
      b = coffee(3, 80);
    for (let i = 0; i < 500; i++) {
      a = press(a, a.queue[0]?.keys[a.index] ?? "G");
      a = tick(a, 200);
      b = press(b, b.queue[0]?.keys[b.index] ?? "G");
      b = tick(b, 200);
    }
    expect(a).toEqual(b);
    expect(tick(press(coffee(3, 0), "?"), 100).elapsed).toBeGreaterThan(100);
  });
  it("callbacks arrive later and days never end", () => {
    let s = reset(2);
    s.pending.push({ day: 2, id: "student-coins" });
    s.phase = "journal";
    s = step(s, "continue");
    expect(observe(s).echoes.join(" ")).toContain("bus");
    expect(s.day).toBe(2);
  });
});
