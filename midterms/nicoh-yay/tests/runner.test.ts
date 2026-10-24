import { HIDDEN_FIELDS } from "./hidden-fields.js";
import { it, expect } from "vitest";
import { runEpisode } from "../src/runner/episode.js";
import { MockModel } from "../src/runner/model.js";
import { AlwaysStrike } from "../src/agents/index.js";
import { buildPrompt } from "../src/runner/prompt.js";
import { Game } from "../src/game.js";
const good = '{"action":"GUARD","intent":"wait"}';
it("garbage reasks once, illegal replies fall back and three consecutive fallbacks forfeit", async () => {
  const r = await runEpisode({
    seed: 1,
    controller: new MockModel([
      "garbage",
      "garbage",
      '{"action":"NO","intent":"test"}',
      '{"action":"NO","intent":"test"}',
    ]),
    opponent: new AlwaysStrike(),
  });
  expect(r.outcome.reason).toBe("invalid_forfeit");
  expect(r.stats.calls).toBe(4);
  expect(r.stats.fallbacks).toBe(3);
  expect(r.stats.model_moves).toBe(0);
  expect(r.trace.filter((t) => t.source.startsWith("fallback:"))).toHaveLength(
    3,
  );
});
it("timeouts fall back without model move attribution", async () => {
  const r = await runEpisode({
    seed: 1,
    controller: new MockModel(["timeout", "timeout", "timeout"]),
    opponent: new AlwaysStrike(),
    timeoutMs: 2,
  });
  expect(r.outcome.reason).toBe("invalid_forfeit");
  expect(r.trace.filter((t) => t.source === "fallback:timeout")).toHaveLength(
    3,
  );
  expect(r.stats.model_moves).toBe(0);
});
it("cap 30 counts reasks and terminates before call 31", async () => {
  const replies = Array.from({ length: 40 }, (_, i) =>
    i % 2 ? "garbage" : good,
  );
  const r = await runEpisode({
    seed: 1,
    controller: new MockModel(replies),
    opponent: { choose: () => "GUARD" },
  });
  expect(r.stats.calls).toBe(30);
  expect(r.outcome.reason).toBe("model_call_cap");
});
it("judgment fallback abstains and court detains", async () => {
  const r = await runEpisode({
    seed: 1,
    controller: new MockModel([...Array(18).fill(good), '{"action":"NO"}']),
    opponent: { choose: () => "GUARD" },
  });
  expect(r.outcome.judgment?.choice).toBe("abstain");
  expect(r.outcome.judgment?.verdict).toBe("DETAIN");
  expect(r.trace.at(-1)?.source).toBe("fallback:illegal");
});
it("valid reply resets fallback streak; one reask can succeed", async () => {
  const r = await runEpisode({
    seed: 2,
    controller: new MockModel([
      "garbage",
      good,
      '{"action":"NO"}',
      good,
      '{"action":"NO"}',
      good,
      ...Array(20).fill(good),
    ]),
    opponent: { choose: () => "GUARD" },
  });
  expect(r.outcome.reason).toBe("time_up_draw");
  expect(r.stats.model_moves).toBeGreaterThan(0);
});
it("trace contract and offline reproducibility", async () => {
  const run = () =>
    runEpisode({
      seed: 42,
      controller: new AlwaysStrike(),
      opponent: new AlwaysStrike(),
    });
  const a = await run(),
    b = await run();
  expect(a.final_hash).toBe(b.final_hash);
  expect(a.trace[0]).toEqual(
    expect.objectContaining({
      episode_id: expect.any(String),
      step: 0,
      phase: "HEARING",
      actor: 0,
      source: "engine",
      obs_hash: expect.any(String),
      legal_hash: expect.any(String),
      raw_reply: "CONTINUE",
      parsed: { action: "CONTINUE" },
      valid: true,
      latency_ms: 0,
      tok_in: 0,
      tok_out: 0,
      error: null,
    }),
  );
  expect(a.stats.calls).toBe(0);
});
it("M-obs contains no history; M-hist caps at 8", () => {
  const g = new Game(),
    o = g.observe(0),
    h = Array.from({ length: 20 }, () => ({ observation: o, action: "GUARD" }));
  expect(
    JSON.parse(buildPrompt("M-obs", o, ["CONTINUE"], h)).history,
  ).toBeUndefined();
  expect(
    JSON.parse(buildPrompt("M-hist", o, ["CONTINUE"], h)).history,
  ).toHaveLength(8);
});
it("Vertex refuses before constructing SDK without explicit live flag", async () => {
  const { VertexGemini } = await import("../src/runner/model.js");
  expect(() => new VertexGemini(false)).toThrow("--live");
});

it("golden offline JSONL trace and terminal outcome", async () => {
  const r = await runEpisode({
    seed: 42,
    controller: new AlwaysStrike(),
    opponent: new AlwaysStrike(),
  });
  expect({
    trace: r.trace,
    outcome: r.outcome,
    final_hash: r.final_hash,
  }).toMatchSnapshot();
});
it("exceptional model replies are labeled fallback:error", async () => {
  const r = await runEpisode({
    seed: 1,
    controller: new MockModel(["error", "error", "error"]),
    opponent: new AlwaysStrike(),
  });
  expect(r.outcome.reason).toBe("invalid_forfeit");
  expect(r.trace.filter((t) => t.source === "fallback:error")).toHaveLength(3);
});
it("token usage is accumulated for every call including rejected replies", async () => {
  const r = await runEpisode({
    seed: 1,
    controller: {
      kind: "model",
      modelId: "mock-tokens",
      complete: async () => ({ text: "garbage", tok_in: 7, tok_out: 3 }),
    },
    opponent: new AlwaysStrike(),
  });
  expect(r.stats.calls).toBe(6);
  expect(r.stats.tok_in).toBe(42);
  expect(r.stats.tok_out).toBe(18);
  expect(r.stats.model_moves).toBe(0);
});

it("offline controller failure is terminal error, never a silent fallback", async () => {
  const r = await runEpisode({
    seed: 1,
    controller: { choose: () => "ILLEGAL" },
    opponent: new AlwaysStrike(),
  });
  expect(r.outcome.reason).toBe("error");
  expect(r.stats.fallbacks).toBe(0);
  expect(r.stats.illegal).toBe(1);
});

it('records player-zero facts and public post-step state without hidden fields',async()=>{
 const r=await runEpisode({seed:42,controller:new AlwaysStrike(),opponent:new AlwaysStrike()});
 const hidden=HIDDEN_FIELDS;
 function check(x:unknown){if(x && typeof x==='object')for(const [k,v] of Object.entries(x)){expect(hidden).not.toContain(k);check(v);}}
 for(const row of r.trace){expect(row).toHaveProperty('observation.own_stamina');expect(row).toHaveProperty('after.hp');expect(row).toHaveProperty('terminal.status');check(row);}
 const clash=r.trace.find(t=>t.actor===0&&t.phase==='DUEL')!;
 expect(clash.observation.hp).toEqual([12,12]);expect(clash.after.hp).toEqual([9,9]);
 expect(clash.after.previous).toEqual({own:'STRIKE',opponent:'STRIKE'});
 expect(r.trace.at(-1)?.terminal.status).toBe('terminal');
});
