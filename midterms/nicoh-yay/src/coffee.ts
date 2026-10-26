export function random(seed: number): [number, number] {
  const next = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return [next, next / 4294967296];
}
export const regulars = [
  {
    id: "businessman",
    name: "Martin",
    role: "The man in the suit",
    lines: [
      "“Busy morning,” he says, though his phone has not rung.",
      "“Between offices at the moment.” He smooths a worn cuff.",
      "“Don’t tell anyone. I still take the train so my family thinks I’m working.”",
    ],
  },
  {
    id: "student",
    name: "Ada",
    role: "The student with the coins",
    lines: [
      "She sorts copper coins into little stacks.",
      "“The library stays warm until ten.”",
      "“I split a room with my sister. She studies while I sleep.”",
    ],
  },
  {
    id: "nurse",
    name: "Ruth",
    role: "After the night shift",
    lines: [
      "“Something hot. I can’t feel my fingers.”",
      "“I tell people to sleep, then take another double.”",
      "“My mother is on my ward now. I don’t know how to go home.”",
    ],
  },
  {
    id: "oldman",
    name: "Emil",
    role: "Two cups, one customer",
    lines: [
      "“Two, please. Hers without sugar.”",
      "He leaves the second cup untouched on the bench.",
      "“She always said yours was too strong. I think she liked that.”",
    ],
  },
  {
    id: "cop",
    name: "Officer Bell",
    role: "The beat cop",
    lines: [
      "“I didn’t see you double-park the cart.”",
      "“My daughter used to wait up, too.”",
      "“Some days I do the paperwork slowly. It’s all I can offer.”",
    ],
  },
] as const;
export type Customer = {
  id: string;
  name: string;
  drink: string;
  keys: string[];
  patience: number;
  line: string;
  talked: boolean;
};
export type Coffee = {
  rng: number;
  fatigue: number;
  elapsed: number;
  spawn: number;
  queue: Customer[];
  index: number;
  cash: number;
  served: number;
  lost: number;
  reaction: string;
  steam: number;
  talks: string[];
  shaky: boolean;
  trust: Record<string, number>;
  day: number;
};
export function customer(c: Coffee): Customer {
  let r: number;
  [c.rng, r] = random(c.rng);
  const person = regulars[Math.floor(r * 5)];
  [c.rng, r] = random(c.rng);
  const drinks = [
    ["Espresso", "GTP L"],
    ["Latte", "GTPSL"],
    ["Americano", "GTPWL"],
  ] as const;
  const drink = drinks[Math.floor(r * drinks.length)];
  return {
    id: person.id,
    name: person.name,
    drink: drink[0],
    keys: drink[1].replace(/ /g, "").split(""),
    patience: (c.trust[person.id] ?? 40) < 30 ? 18000 : 24000,
    line: "",
    talked: false,
  };
}
export function coffee(
  seed: number,
  fatigue: number,
  trust: Record<string, number> = {},
  day = 1,
): Coffee {
  const c: Coffee = {
    rng: seed,
    fatigue,
    elapsed: 0,
    spawn: 6000,
    queue: [],
    index: 0,
    cash: 0,
    served: 0,
    lost: 0,
    reaction: "The boiler wakes up.",
    steam: 0,
    talks: [],
    shaky: false,
    trust: { ...trust },
    day,
  };
  c.queue.push(customer(c));
  return c;
}
export function tick(input: Coffee, ms: number): Coffee {
  if (!Number.isFinite(ms) || ms <= 0 || input.elapsed >= 105000) return input;
  const c = structuredClone(input);
  const dt = Math.min(ms, 105000 - c.elapsed);
  c.elapsed += dt;
  c.spawn -= dt;
  c.steam = Math.max(0, c.steam - dt);
  for (const q of c.queue) q.patience -= dt;
  while (c.queue[0]?.patience <= 0) {
    c.queue.shift();
    c.index = 0;
    c.lost++;
    c.reaction = "A customer glances at the bus and leaves.";
  }
  if (c.spawn <= 0) {
    if (c.queue.length < 4) c.queue.push(customer(c));
    c.spawn = 6500;
  }
  return c;
}
export function press(input: Coffee, key: string): Coffee {
  if (input.elapsed >= 105000 || !input.queue.length) return input;
  const c = structuredClone(input),
    q = c.queue[0];
  if (key.toUpperCase() !== q.keys[c.index]) {
    c.reaction = "The handle slips. Take a breath.";
    return tick(c, 900);
  }
  c.index++;
  c.reaction = "";
  if (key.toUpperCase() === "S" || key.toUpperCase() === "P") c.steam = 800;
  if (c.index === q.keys.length) {
    let r: number;
    [c.rng, r] = random(c.rng);
    c.cash +=
      3 +
      (q.patience > 14000 ? 1 : 0) +
      (r < 0.5 && (c.trust[q.id] ?? 40) > 25 ? 1 : 0);
    c.served++;
    c.queue.shift();
    c.index = 0;
    c.reaction = `${q.name} wraps both hands around the cup.`;
    c.shaky = false;
  } else if (c.fatigue > 55 && c.index === 2) {
    let r: number;
    [c.rng, r] = random(c.rng);
    if (r < 0.4) {
      q.keys[c.index] = q.keys[c.index] === "P" ? "T" : "P";
      c.shaky = true;
      c.reaction = "Shaky hands. Follow the changed key.";
    }
  }
  return c;
}
export function talk(
  input: Coffee,
  reply: "listen" | "kind",
  day: number,
): Coffee {
  if (!input.queue[0] || input.queue[0].talked) return input;
  const c = structuredClone(input);
  const q = c.queue[0],
    r = regulars.find((r) => r.id === q.id)!;
  q.talked = true;
  q.line =
    (c.trust[q.id] ?? 40) < 25
      ? "?Just the coffee today, please.?"
      : r.lines[Math.min(2, Math.floor((day - 1) / 2))];
  c.reaction =
    reply === "listen" ? q.line : "You tell them to take their time. " + q.line;
  c.talks.push(q.id);
  if (reply === "listen") return tick(c, 1600);
  q.patience += 2500;
  return tick(c, 2800);
}
