import "./style.css";
import {
  reset,
  observe,
  step,
  restore,
  legal_actions,
  type State,
} from "../../src/sim.js";
import { press, tick, talk, regulars } from "../../src/coffee.js";
const root = document.querySelector<HTMLDivElement>("#app")!;
const SAVE = "small-change-v1";
let state: State = reset();
let started = false,
  paused = false,
  muted = true,
  resetting = false,
  saveNotice = "";
let last = performance.now(),
  paint = 0;
let audio: AudioContext | undefined;
try {
  const raw = localStorage.getItem(SAVE);
  if (raw) {
    const loaded = restore(JSON.parse(raw));
    if (loaded) state = loaded;
    else
      saveNotice = "The saved life could not be read. A new morning is ready.";
  }
} catch {
  saveNotice = "Saving is unavailable. You can still play this session.";
}
function save() {
  try {
    localStorage.setItem(SAVE, JSON.stringify(state));
  } catch {
    saveNotice =
      "Progress is kept for this session; browser storage is unavailable.";
  }
}
function esc(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
const suppliedArt = new Set(["title","melanie","laura","laura_distant","cart_street","rival","regular_nurse","regular_businessman","regular_student","regular_oldman","regular_cop","apartment"]);
const assetStatus = new Map<string, boolean>();
function art(name: string, label: string, cls = "") {
  return `<div class="art ${cls}" role="img" aria-label="${esc(label)}"><div class="silhouette"><i></i><b></b><span>${esc(label)}</span></div>${!suppliedArt.has(name) || assetStatus.get(name) === false ? "" : `<img src="./art/${name}.png" alt="" data-art="${name}">`}</div>`;
}
function wireArt() {
  root.querySelectorAll<HTMLImageElement>("[data-art]").forEach((img) => {
    img.onload = () => {
      assetStatus.set(img.dataset.art!, true);
      img.parentElement?.classList.add("loaded");
    };
    img.onerror = () => {
      assetStatus.set(img.dataset.art!, false);
      img.hidden = true;
      img.parentElement?.classList.remove("loaded");
    };
    if (img.complete && img.naturalWidth)
      img.parentElement?.classList.add("loaded");
  });
}
function sound() {
  if (muted) return;
  try {
    audio ??= new AudioContext();
    void audio.resume();
    const o = audio.createOscillator(),
      g = audio.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(900, audio.currentTime);
    o.frequency.exponentialRampToValueAtTime(300, audio.currentTime + 0.08);
    g.gain.setValueAtTime(0.04, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.12);
    o.connect(g);
    g.connect(audio.destination);
    o.start();
    o.stop(audio.currentTime + 0.13);
  } catch {
    muted = true;
  }
}
function act(id: string) {
  state = step(state, id);
  save();
  render();
  root.querySelector<HTMLElement>("#scene-title")?.focus();
}
function key(k: string) {
  if (!started || paused || state.phase !== "coffee" || resetting) return;
  const before = state.coffee.served;
  state = { ...state, coffee: press(state.coffee, k) };
  if (state.coffee.served > before) sound();
  render();
  const el = root.querySelector(`[data-key="${k.toUpperCase()}"]`);
  el?.classList.add("pressed");
  setTimeout(() => el?.classList.remove("pressed"), 120);
  save();
}
const keyNames: Record<string, string> = {
  G: "grind",
  T: "tamp",
  P: "pull",
  S: "steam",
  W: "water",
  L: "lid",
};
function coffeeView() {
  const c = state.coffee,
    q = c.queue[0];
  return `<div class="shift-heading"><span>THE LUNCH CROWD</span><span>${c.elapsed < 35000 ? "Opening cups" : c.elapsed < 70000 ? "Between buses" : "The last stretch"}</span></div><div class="queue">${c.queue.map((q, i) => `<div class="customer ${i === 0 ? "current" : ""}">${art("regular_" + q.id, q.name)}<span>${q.name}</span><div class="patience" role="meter" aria-label="${q.name} patience" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.max(0, Math.min(100, Math.round(q.patience / 240)))}"><i style="width:${Math.max(0, Math.min(100, q.patience / 240))}%"></i></div></div>`).join("")}</div><div class="recipe"><div class="cup ${c.steam ? "steaming" : ""}"><i>≋</i>▰</div><div><p class="eyebrow">${q ? esc(q.name) + " · " + esc(q.drink) : "A moment to wipe the counter"}</p><div class="keys">${q ? q.keys.map((k, i) => `<button data-key="${k}" class="key ${i < c.index ? "done" : ""} ${i === c.index ? "next" : ""}" ${i !== c.index ? 'tabindex="-1"' : ""} aria-label="${keyNames[k]}">${k}<small>${keyNames[k]}</small></button>`).join("") : ""}</div><p class="hint">Type the sequence, or tap the lit key. A slipped key takes a moment to recover.</p>${c.shaky ? '<p class="warm">Your hand shook. Read the changed recipe.</p>' : ""}</div></div><p class="reaction" role="status">${esc(c.reaction || "The machine hums. Shoes scrape the pavement.")}</p>${q && !q.talked ? `<div class="smalltalk"><span>${esc(regulars.find((r) => r.id === q.id)!.role)}</span><button data-talk="listen">“How has your morning been?”</button><button data-talk="kind">“No hurry. Take a breath.”</button><small>Talking takes a little time.</small></div>` : q?.line ? `<blockquote>${esc(q.line)}</blockquote>` : ""}`;
}
function render() {
  const o = observe(state);
  document.documentElement.style.setProperty(
    "--warm",
    `${{ warm: 80, fading: 35, faint: 5 }[o.palette]}%`,
  );
  if (!started) {
    root.innerHTML = `<main class="title-screen"><div class="title-art">${art("title", "A cart beneath an apartment window")}</div><div class="title-copy"><p class="eyebrow">A LIFE IN THE SPACES BETWEEN</p><h1>Small<br><em>Change</em></h1><p>Since the separation, Melanie has a coffee cart,<br>a daughter named Laura, and another morning to get through.</p><button class="primary" id="start">${state.day > 1 || state.history.length ? "Return to your life" : "Open the curtains"} <span>↗</span></button><p class="intro-note">Serve coffee. Make room. Live with the little things.<br>There is no final day, score, or perfect way through.</p><p class="credit">An adaptation of <a href="https://github.com/historicalsource/cartlife_src">Cart Life</a> (2011)<br>by <strong>Richard Hofmeier</strong> · Creative Director: Nicoh</p>${saveNotice ? `<p role="status">${esc(saveNotice)}</p>` : ""}</div></main>`;
    root.querySelector("#start")!.addEventListener("click", () => {
      started = true;
      last = performance.now();
      render();
    });
    wireArt();
    return;
  }
  const home = ["morning", "evening", "chapter", "journal"].includes(
    state.phase,
  );
  root.innerHTML = `<div class="shell"><header><a class="wordmark" href="#" id="home">Small Change<span>A CART LIFE ADAPTATION</span></a><div class="header-right"><span>DAY ${state.day} / ${state.phase === "coffee" || state.phase === "shift" ? "CART SHIFT" : state.phase.toUpperCase()}</span><button id="pause">${paused ? "Resume" : "Pause"}</button><button id="sound" aria-pressed="${!muted}">Sound ${muted ? "off" : "on"}</button><button id="new">New life</button></div></header><main class="game"><section class="world ${home ? "home" : "street"}" aria-label="${home ? "The apartment" : "The cart street"}">${art(home ? "apartment" : "cart_street", home ? "Home, before and after work" : "Two carts, one street", "background")}<div class="skyline"><i></i><i></i><i></i><i></i></div><div class="window"><div></div><div></div></div>${home ? `<div class="fridge"><span>${o.palette === "warm" ? "♡" : "▤"}</span></div><div class="table"></div>${art(o.palette !== "warm" ? "laura_distant" : "laura", "Laura", "laura")}<div class="ambient"><span>ON THE FRIDGE</span><p>${esc(o.drawing)}</p></div>` : `<div class="awning">COFFEE · HOT & FRESH</div><div class="cart"><span>SMALL CHANGE</span><i>◉</i><i>◉</i></div>${art("rival", "Ivo", "rival")}<div class="rival-cart">IVO’S</div><div class="ambient"><span>ACROSS THE STREET</span><p>${esc(o.rival)}</p></div>`}${art("melanie", "Melanie", "melanie")}<div class="world-caption">${home ? art(o.palette === "warm" ? "laura" : "laura_distant", "Laura", "portrait") : ""}<span>${home ? esc(o.laura) : esc(o.fatigue)}</span></div><div class="grain"></div></section><section class="panel" aria-label="Current scene"><p class="eyebrow">${home ? "THE APARTMENT" : "AT THE CORNER"} · DAY ${state.day}</p><h2 id="scene-title" tabindex="-1">${esc(o.title)}</h2>${paused ? '<div class="pause-note"><p>The street can wait.</p><button id="resume">Resume your day</button></div>' : state.phase === "coffee" ? coffeeView() : state.phase === "journal" ? `<div class="journal">${o.journal.map((l) => `<p>${esc(l)}</p>`).join("")}<p class="signature">— Melanie</p></div><button data-action="continue" class="primary">Put the kettle away →</button>` : `${o.echoes.length ? `<aside class="echoes">${o.echoes.map((l) => `<p>${esc(l)}</p>`).join("")}</aside>` : ""}<div class="dialogue"><div class="dialogue-portraits">${art("melanie", "Melanie", "portrait")}${o.companion ? art(o.companion.art, o.companion.name, "portrait") : ""}</div><div><p class="speaker">Melanie${o.companion ? " / " + esc(o.companion.name) : ""}</p><p class="situation">${esc(o.situation)}</p></div></div><div class="choices">${o.options.map((a, i) => `<button data-action="${a.id}"><span class="option-num">0${i + 1}</span><span>${esc(a.text)}</span><span>↗</span></button>`).join("")}</div>`}<footer class="register"><span>IN THE REGISTER</span><p>${esc(o.cash)}</p></footer></section></main><div class="bottom"><span>Melanie’s journal is saved after each choice.</span><span>Adapted from Richard Hofmeier’s Cart Life · <a href="./LICENSE-CARTLIFE.md">License & notice</a></span></div>${saveNotice ? `<p role="status">${esc(saveNotice)}</p>` : ""}${resetting ? '<div class="modal"><div role="dialog" aria-modal="true" aria-labelledby="reset-title"><h2 id="reset-title">A different morning?</h2><p>This replaces the saved life on this browser.</p><button id="cancel-reset">Keep this life</button><button id="confirm-reset">Begin a new life</button></div></div>' : ""}</div>`;
  root
    .querySelectorAll<HTMLButtonElement>("[data-action]")
    .forEach((b) => (b.onclick = () => act(b.dataset.action!)));
  root
    .querySelectorAll<HTMLButtonElement>("[data-key]")
    .forEach((b) => (b.onclick = () => key(b.dataset.key!)));
  root.querySelectorAll<HTMLButtonElement>("[data-talk]").forEach(
    (b) =>
      (b.onclick = () => {
        state = {
          ...state,
          coffee: talk(
            state.coffee,
            b.dataset.talk as "listen" | "kind",
            state.day,
          ),
        };
        save();
        render();
      }),
  );
  root.querySelector("#pause")!.addEventListener("click", () => {
    paused = !paused;
    last = performance.now();
    render();
  });
  root.querySelector("#resume")?.addEventListener("click", () => {
    paused = false;
    last = performance.now();
    render();
  });
  root.querySelector("#sound")!.addEventListener("click", () => {
    muted = !muted;
    if (!muted) sound();
    render();
  });
  root.querySelector("#new")!.addEventListener("click", () => {
    resetting = true;
    render();
    root.querySelector<HTMLElement>("#cancel-reset")?.focus();
  });
  root.querySelector("#cancel-reset")?.addEventListener("click", () => {
    resetting = false;
    render();
  });
  root.querySelector("#confirm-reset")?.addEventListener("click", () => {
    state = reset();
    resetting = false;
    paused = false;
    save();
    render();
  });
  root.querySelector("#home")!.addEventListener("click", (e) => {
    e.preventDefault();
    started = false;
    render();
  });
  wireArt();
}
// Preserve focus and animations between customer arrivals.
let queueStamp = "";
function refreshCoffee() {
  const c = state.coffee,
    stamp =
      c.rng +
      ":" +
      c.queue.map((q) => q.id + q.talked).join(",") +
      ":" +
      c.index;
  if (stamp !== queueStamp) {
    queueStamp = stamp;
    render();
    return;
  }
  root.querySelectorAll<HTMLElement>(".patience").forEach((meter, i) => {
    const value = Math.max(0, Math.min(100, (c.queue[i]?.patience ?? 0) / 240));
    meter.setAttribute("aria-valuenow", String(Math.round(value)));
    const bar = meter.firstElementChild as HTMLElement | null;
    if (bar) bar.style.width = value + "%";
  });
  root.querySelector(".cup")?.classList.toggle("steaming", c.steam > 0);
  const reaction = root.querySelector(".reaction");
  if (reaction)
    reaction.textContent =
      c.reaction || "The machine hums. Shoes scrape the pavement.";
}
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
  if (e.key === "Escape") {
    paused = !paused;
    last = performance.now();
    render();
    return;
  }
  if (state.phase === "coffee" && /^[gtpswl]$/i.test(e.key)) {
    e.preventDefault();
    key(e.key);
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && started) {
    paused = true;
    render();
  }
  last = performance.now();
});
setInterval(() => {
  const now = performance.now(),
    dt = Math.min(250, now - last);
  last = now;
  if (!started || paused || resetting || state.phase !== "coffee") return;
  state = { ...state, coffee: tick(state.coffee, dt) };
  if (legal_actions(state).includes("close")) {
    act("close");
    return;
  }
  paint += dt;
  if (paint > 200) {
    paint = 0;
    refreshCoffee();
  }
}, 100);
window.addEventListener("pagehide", save);
render();
