import { it, expect } from "vitest";
import { reset, restore, step, observe, legal_actions } from "../src/sim.js";
import { dilemmas, validateData, type StateKey } from "../src/dilemmas.js";
import { coffee, press, tick, talk } from "../src/coffee.js";
it("rejects damaged save data and roundtrips a valid life", () => {
  const s = reset(12);
  expect(restore(JSON.parse(JSON.stringify(s)))).toEqual(s);
  const bad = structuredClone(s);
  bad.coffee.queue[0].keys = ["?"];
  expect(restore(bad)).toBeNull();
  expect(restore({ version: 1 })).toBeNull();
  expect(restore(null)).toBeNull();
});
it("rejects unknown effects, conditions, callbacks and duplicate ids", () => {
  const data = structuredClone(dilemmas);
  data[1].id = data[0].id;
  data[0].options[0].effects["unknown" as StateKey] = 3;
  data[0].conditions.push({ key: "unknown" as StateKey });
  data[0].options[0].callback = { id: "nope", delay: 1 };
  expect(validateData(data).length).toBeGreaterThanOrEqual(4);
});
it("a day has three dilemma interruptions, a journal, and a fifth-day chapter", () => {
  let s = reset(7);
  for (let day = 1; day < 5; day++) {
    s = step(s, legal_actions(s)[0]);
    for (let i = 0; i < 3; i++) {
      expect(s.phase).toBe("shift");
      s = step(s, legal_actions(s)[0]);
      expect(s.phase).toBe("coffee");
      s = { ...s, coffee: tick(s.coffee, 35000) };
      s = step(s, "close");
    }
    expect(s.phase).toBe("evening");
    s = step(s, legal_actions(s)[0]);
    expect(s.phase).toBe("journal");
    s = step(s, "continue");
  }
  expect(s.day).toBe(5);
  expect(s.phase).toBe("chapter");
  s = step(s, "continue");
  expect(s.phase).toBe("morning");
});
it("reveals no hidden numbers, and options match legal ids", () => {
  const s = reset();
  const o = observe(s);
  expect(
    Object.entries(o)
      .filter(([, v]) => typeof v === "number")
      .map(([k]) => k),
  ).toEqual(["day"]);
  expect(o.options.map((o) => o.id)).toEqual(legal_actions(s));
  o.journal.push("injected");
  expect(s.journal).toEqual([]);
});
it("regular trust changes visits and later conversation", () => {
  const a = coffee(11, 0),
    id = a.queue[0].id;
  const b = coffee(11, 0, { [id]: 5 });
  expect(b.queue[0].patience).toBeLessThan(a.queue[0].patience);
  expect(talk(b, "listen", 5).queue[0].line).toContain("Just the coffee");
  expect(talk(a, "listen", 1).queue[0].line).not.toBe(
    talk(a, "listen", 5).queue[0].line,
  );
});
it("fatigue changes keys reproducibly and correct service has no terminal score", () => {
  let found = false;
  for (let seed = 1; seed < 30; seed++) {
    let c = coffee(seed, 90);
    c = press(c, c.queue[0].keys[0]);
    c = press(c, c.queue[0].keys[1]);
    if (c.shaky) found = true;
  }
  expect(found).toBe(true);
  const c = coffee(1, 0);
  expect(press(c, "?").index).toBe(0);
  expect(tick(c, -1)).toEqual(c);
});
