import {
  dilemmas,
  callbacks,
  type Dilemma,
  type Hidden,
  type StateKey,
} from "./dilemmas.js";
import { coffee, random, type Coffee } from "./coffee.js";
export type State = {
  version: 1;
  day: number;
  phase: "morning" | "shift" | "coffee" | "evening" | "journal" | "chapter";
  rng: number;
  hidden: Hidden;
  regularsTrust: Record<string, number>;
  ledger: string[];
  history: string[];
  pending: { day: number; id: string }[];
  echoes: string[];
  journal: string[];
  archive: string[];
  dilemma: string;
  shiftIndex: number;
  coffee: Coffee;
  seen: string[];
};
const regularIds = [
  "businessman",
  "student",
  "nurse",
  "oldman",
  "cop",
] as const;
function syncTrust(s: State) {
  for (const id of regularIds) s.regularsTrust[id] = s.hidden[id];
}

export function reset(seed = 1977): State {
  const s: State = {
    version: 1,
    day: 1,
    phase: "morning",
    rng: seed >>> 0,
    hidden: {
      pickupLate: 0,
      lauraSick: 0,
      money: 12,
      lauraCloseness: 60,
      lauraSelfReliance: 10,
      lauraTrust: 65,
      melanieFatigue: 15,
      melanieNormalization: 0,
      businessman: 40,
      student: 40,
      nurse: 40,
      oldman: 40,
      cop: 40,
      rivalRelation: 40,
    },
    regularsTrust: {},
    ledger: [],
    history: [],
    pending: [],
    echoes: [],
    journal: [],
    archive: [],
    dilemma: "",
    shiftIndex: 0,
    coffee: coffee(seed, 15),
    seen: [],
  };
  syncTrust(s);
  s.coffee.trust = { ...s.regularsTrust };
  select(s, "morning");
  return s;
}
export function eligible(s: State, d: Dilemma) {
  return d.conditions.every((c) =>
    "prior" in c
      ? s.ledger.includes(c.prior) !== !!c.absent
      : (c.min === undefined || s.hidden[c.key] >= c.min) &&
        (c.max === undefined || s.hidden[c.key] <= c.max),
  );
}
function select(s: State, moment: Dilemma["moment"]) {
  let pool = dilemmas.filter(
    (d) =>
      d.moment === moment &&
      eligible(s, d) &&
      !s.seen.includes(`${s.day}:${d.id}`) &&
      (!d.chain ||
        !dilemmas.some(
          (other) =>
            other.chain === d.chain && s.seen.includes(`${s.day}:${other.id}`),
        )),
  );
  if (!pool.length)
    pool = dilemmas.filter((d) => d.moment === moment && eligible(s, d));
  const escalated = pool.filter(
    (d) =>
      d.conditions.some((c) => "prior" in c && !c.absent) &&
      !s.history.includes(d.id),
  );
  if (escalated.length) pool = escalated;
  else {
    const fresh = pool.filter((d) => !s.history.includes(d.id));
    if (fresh.length) pool = fresh;
  }
  let r: number;
  [s.rng, r] = random(s.rng);
  const d = pool[Math.floor(r * pool.length)];
  s.dilemma = d.id;
  s.seen.push(`${s.day}:${d.id}`);
}
export function chapter(s: State): string {
 const warm=["Laura draws the cart with both of them in it.","Laura saves half her cookie for Melanie.","Laura tells a long story about recess, beginning again when she forgets a name."];
 const distant=["Laura makes her own lunch and leaves Melanie?s untouched.","Laura stops saying ?guess what? after school.","Laura keeps a spare key on a string and stops asking when Melanie will be home.","Laura draws two houses; later, only one.","Laura apologizes too much for spilling a drink. She stops asking to bake together.","Laura waits by the door with the cash box ready. ?Did we make enough??"];
 const index=Math.max(0,Math.floor(s.day/5)-1);
 return s.hidden.lauraCloseness>55 && s.hidden.lauraTrust>=40 && s.hidden.lauraSelfReliance<=55 ? warm[index%warm.length] : distant[index%distant.length];
}
export function acceptedSteps(s: State, chain: string): number {
 return dilemmas.filter(d=>d.chain===chain && d.options.some(o=>o.compromise && s.ledger.includes(o.ledger))).length;
}
export function observe(s: State) {
  const d = dilemmas.find((d) => d.id === s.dilemma)!;
  const drift = !!d.chain && acceptedSteps(s, d.chain) > 0;
  const options = drift ? [...d.options].sort((a,b)=>Number(!!b.compromise)-Number(!!a.compromise)) : d.options;
  const choosing = ["morning", "shift", "evening"].includes(s.phase);
  return {
    day: s.day,
    companion: choosing && ["inspector","permit","cups"].includes(d.id)
      ? {name:"Ivo", art:"rival"}
      : choosing && /Laura/.test(d.situation)
        ? {name:"Laura", art:s.hidden.lauraCloseness>55 ? "laura" : "laura_distant"}
        : null,
    coffee:
      s.phase === "coffee"
        ? {
            queue: s.coffee.queue.map((q) => ({
              name: q.name,
              drink: q.drink,
              patience:
                q.patience > 12000 ? "waiting" : "looking toward the bus",
            })),
            recipe: [...(s.coffee.queue[0]?.keys ?? [])],
            nextKey: s.coffee.queue[0]?.keys[s.coffee.index] ?? null,
            reaction: s.coffee.reaction,
          }
        : null,
    phase: s.phase,
    title: choosing
      ? d.title
      : s.phase === "coffee"
        ? "The cart shift"
        : s.phase === "chapter"
          ? "A little taller"
          : "After the kettle cools",
    situation: choosing ? (drift ? d.drift ?? d.situation : d.situation) + (s.hidden.pickupLate > 0 && d.options.some(o=>o.minutes) ? " Laura?s pickup time has passed." : "") : s.phase === "chapter" ? chapter(s) : "",
    options: choosing
      ? options.map((o) => ({ id: o.id, text: (drift ? o.euphemism ?? o.text : o.text) + (s.hidden.pickupLate > 0 && o.minutes ? ` (${o.minutes} minutes; Laura is waiting.)` : "") }))
      : legal_actions(s).map((id) => ({
          id,
          text:
            id === "close"
              ? "Close the cart"
              : id === "continue"
                ? "Let the next day come"
                : "Return to the cart",
        })),
    echoes: [...s.echoes],
    journal: [...s.journal],
    laura:
      s.hidden.lauraTrust < 35
        ? "“It’s okay. I already did it.”"
        : s.hidden.lauraCloseness > 55
          ? "“Can I tell you something on the way?”"
          : "“You look busy. Later, then.”",
    drawing:
      s.hidden.lauraCloseness > 55
        ? "A drawing of two figures behind a cart."
        : "A school timetable covers the old drawing.",
    palette:
      s.hidden.lauraCloseness > 55
        ? "warm"
        : s.hidden.lauraCloseness > 30
          ? "fading"
          : "faint",
    cash:
      s.hidden.money <= 0
        ? "The register holds a few washers and an IOU."
        : s.hidden.money < 10
          ? "A few coins slide around the register."
          : s.hidden.money < 30
            ? "Folded notes sit beneath a little stack of coins."
            : "The register has a thick fold of notes. Tomorrow’s envelopes wait.",
    rival:
      s.hidden.rivalRelation < 30
        ? "Ivo turns his cart slightly away from yours."
        : "Ivo lifts a hand from across the road.",
    fatigue:
      s.hidden.melanieFatigue > 55
        ? "Your fingers tremble around the cup."
        : "The cup sits steady in your hands.",
  };
}
export function legal_actions(s: State): string[] {
  if (s.phase === "coffee")
    return s.coffee.elapsed >= 105000 ||
      ([35000, 70000][s.shiftIndex - 1] !== undefined &&
        s.coffee.elapsed >= [35000, 70000][s.shiftIndex - 1])
      ? ["close"]
      : [];
  if (s.phase === "journal" || s.phase === "chapter") return ["continue"];
  const card = dilemmas.find(d => d.id === s.dilemma);
  return card && eligible(s, card) ? card.options.map(o=>o.id) : [];
}
export function step(input: State, action: string): State {
  if (!legal_actions(input).includes(action)) return input;
  const s = structuredClone(input);
  if (s.phase === "chapter") {
    s.phase = "morning";
    select(s, "morning");
    return s;
  }
  if (s.phase === "journal") {
    s.day++;
    s.hidden.lauraSick = s.day % 4 === 0 ? 1 : 0;
    s.hidden.pickupLate = 0;
    s.hidden.money -= 44; // Stock, groceries, rent envelope, and utilities; debt never ends play.
    s.hidden.melanieFatigue = Math.max(0, s.hidden.melanieFatigue - 14);
    s.echoes = s.pending
      .filter((c) => c.day <= s.day)
      .map((c) => callbacks[c.id]);
    s.pending = s.pending.filter((c) => c.day > s.day);
    s.journal = [];
    s.shiftIndex = 0;
    s.coffee = coffee(s.rng, s.hidden.melanieFatigue, s.regularsTrust, s.day);
    s.seen = [];
    s.phase = s.day % 5 === 0 ? "chapter" : "morning";
    if (s.phase === "morning") select(s, "morning");
    return s;
  }
  if (s.phase === "coffee") {
    if (s.coffee.elapsed >= 105000) {
      s.hidden.money += s.coffee.cash;
      for (const id of s.coffee.talks) {
        s.hidden[id as StateKey] = Math.min(100, s.hidden[id as StateKey] + 2);
        s.regularsTrust[id] = s.hidden[id as StateKey];
      }
      s.journal.push(
        s.coffee.served
          ? "I wiped the rings from the counter. Some cups had gone cold before I could finish them."
          : "The boiler stayed warm longer than anyone waited.",
      );
      s.phase = "evening";
      select(s, "evening");
    } else {
      s.phase = "shift";
      select(s, "shift");
    }
    return s;
  }
  const d = dilemmas.find((d) => d.id === s.dilemma)!,
    o = d.options.find((o) => o.id === action)!;
  for (const [k, v] of Object.entries(o.effects)) {
    const key = k as StateKey;
    s.hidden[key] += v!;
    if (key !== "money")
      s.hidden[key] = Math.max(0, Math.min(100, s.hidden[key]));
  }
  if (s.hidden.pickupLate > 0 && o.minutes) {
    s.hidden.pickupLate += o.minutes;
    s.journal.push(`I reached Laura ${s.hidden.pickupLate} minutes after pickup.`);
  }
  syncTrust(s);
  s.ledger.push(o.ledger);
  s.history.push(d.id);
  s.journal.push(d.chain && acceptedSteps(input, d.chain) > 0 && o.compromise ? o.euphemism ?? o.journal : o.journal);
  if (o.callback)
    s.pending.push({ day: s.day + o.callback.delay, id: o.callback.id });
  if (s.phase === "morning") {
    s.echoes = [];
    s.phase = "shift";
    s.hidden.pickupLate = s.hidden.melanieFatigue > 40 ? 5 : 0;
    select(s, "shift");
  } else if (s.phase === "shift") {
    s.shiftIndex++;
    s.phase = "coffee";
    s.coffee.fatigue = s.hidden.melanieFatigue;
    s.coffee.trust = { ...s.regularsTrust };
  } else {
    s.phase = "journal";
    s.journal.push(
      s.hidden.melanieNormalization > 40
        ? "Some things take less explaining to myself now. I put the kettle on."
        : "I left tomorrow’s cup beside the sink.",
    );
    s.archive.push(`Day ${s.day}. ${s.journal.join(" ")}`);
  }
  return s;
}
export function outcome(s: State) {
  return { ongoing: true, journal: [...s.journal], days: [...s.archive] };
}
// Saves are untrusted input. Refuse incompatible snapshots as a whole.
export function restore(raw: unknown): State | null {
  try {
    if (!raw || typeof raw !== "object") return null;
    const s = raw as State,
      baseline = reset();
    const strings = (v: unknown): v is string[] =>
      Array.isArray(v) && v.every((x) => typeof x === "string");
    const finite = (v: unknown) => typeof v === "number" && Number.isFinite(v);
    if (
      s.version !== 1 ||
      !Number.isSafeInteger(s.day) ||
      s.day < 1 ||
      !Number.isInteger(s.rng) ||
      !Object.keys(baseline.hidden).every((k) =>
        finite(s.hidden[k as StateKey]),
      ) ||
      !["morning", "shift", "coffee", "evening", "journal", "chapter"].includes(
        s.phase,
      ) ||
      !dilemmas.some((d) => d.id === s.dilemma) ||
      !strings(s.ledger) ||
      !strings(s.history) ||
      !strings(s.journal) ||
      !strings(s.archive) ||
      !strings(s.echoes) ||
      !strings(s.seen) ||
      !Number.isInteger(s.shiftIndex) ||
      s.shiftIndex < 0 ||
      s.shiftIndex > 3 ||
      !Array.isArray(s.pending) ||
      s.pending.some(
        (c) => !c || !callbacks[c.id] || !Number.isSafeInteger(c.day),
      ) ||
      !s.regularsTrust ||
      !regularIds.every((id) => finite(s.regularsTrust[id]))
    )
      return null;
    const c = s.coffee;
    if (
      !c ||
      !Array.isArray(c.queue) ||
      c.queue.length > 4 ||
      ![
        "rng",
        "fatigue",
        "elapsed",
        "spawn",
        "index",
        "cash",
        "served",
        "lost",
        "steam",
        "day",
      ].every((k) => finite(c[k as keyof Coffee])) ||
      c.elapsed < 0 ||
      c.elapsed > 105000 ||
      !Number.isInteger(c.index) ||
      c.index < 0 ||
      typeof c.reaction !== "string" ||
      typeof c.shaky !== "boolean" ||
      !strings(c.talks) ||
      !c.trust ||
      !regularIds.every((id) => finite(c.trust[id])) ||
      c.queue.some(
        (q) =>
          !q ||
          !regularIds.includes(q.id as (typeof regularIds)[number]) ||
          typeof q.name !== "string" ||
          typeof q.drink !== "string" ||
          typeof q.line !== "string" ||
          typeof q.talked !== "boolean" ||
          !finite(q.patience) ||
          !strings(q.keys) ||
          q.keys.length < 1 ||
          q.keys.some((k) => !["G", "T", "P", "S", "W", "L"].includes(k)),
      ) ||
      (c.queue.length > 0 && c.index >= c.queue[0].keys.length)
    )
      return null;
    return structuredClone(s);
  } catch {
    return null;
  }
}
