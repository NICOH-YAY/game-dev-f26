import { runtime } from "./config.js";
import { performance } from "node:perf_hooks";
import { Game, type Observation, type Player, type Scenario } from "../game.js";
import type { Controller } from "../agents/index.js";
import { stableHash } from "../sim/random.js";
import { buildPrompt, type Arm, type HistoryItem } from "./prompt.js";
import type { ModelController, ModelReply } from "./model.js";
export type Trace = {
  episode_id: string;
  step: number;
  phase: string;
  actor: Player;
  source: string;
  obs_hash: string;
  legal_hash: string;
  raw_reply: string | null;
  parsed: { action: string; intent?: string } | null;
  valid: boolean;
  latency_ms: number;
  tok_in: number;
  tok_out: number;
  error: string | null;
};
export type EpisodeOptions = {
  seed: number;
  scenario?: Scenario;
  controller: Controller | ModelController;
  opponent: Controller | ModelController;
  episodeId?: string;
  timeoutMs?: number;
  callCap?: number;
  arm?: Arm;
};
function isModel(c: Controller | ModelController): c is ModelController {
  return "kind" in c && c.kind === "model";
}
function parse(text: string): { action: string; intent: string } | null {
  try {
    const p: unknown = JSON.parse(text);
    if (!p || typeof p !== "object") return null;
    const x = p as Record<string, unknown>;
    if (
      typeof x.action !== "string" ||
      typeof x.intent !== "string" ||
      x.intent.trim().split(/\s+/).filter(Boolean).length > 12 ||
      Object.keys(x).some((k) => !["action", "intent"].includes(k))
    )
      return null;
    return { action: x.action, intent: x.intent };
  } catch {
    return null;
  }
}
export async function runEpisode(options: EpisodeOptions) {
  const game = new Game();
  game.reset(options.seed, options.scenario);
  const trace: Trace[] = [],
    history: [HistoryItem[], HistoryItem[]] = [[], []],
    streak = [0, 0];
  const stats = {
    calls: 0,
    illegal: 0,
    fallbacks: 0,
    model_moves: 0,
    tok_in: 0,
    tok_out: 0,
    latencies: [] as number[],
  };
  const episode_id = options.episodeId ?? `trial-by-combat-${options.seed}`;
  const log = (
    actor: Player,
    source: string,
    obs: Observation,
    legal: string[],
    raw_reply: string | null,
    parsed: Trace["parsed"],
    valid: boolean,
    error: string | null,
    latency_ms = 0,
    tok_in = 0,
    tok_out = 0,
  ) =>
    trace.push({
      episode_id,
      step: trace.length,
      phase: obs.phase,
      actor,
      source,
      obs_hash: stableHash(obs),
      legal_hash: stableHash(legal),
      raw_reply,
      parsed,
      valid,
      latency_ms,
      tok_in,
      tok_out,
      error,
    });
  const acquire = async (
    actor: Player,
    obs: Observation,
    legal: string[],
    controller: Controller | ModelController,
  ): Promise<string | null> => {
    if (!isModel(controller)) {
      try {
        const action = controller.choose(structuredClone(obs), [...legal]);
        const valid = legal.includes(action);
        log(
          actor,
          "controller",
          obs,
          legal,
          action,
          { action },
          valid,
          valid ? null : "illegal",
        );
        if (valid) return action;
        stats.illegal++;
      } catch (e) {
        log(actor, "controller", obs, legal, null, null, false, String(e));
      }
      game.terminate("error", actor);
      return null;
    }
    let reason = "unparseable";
    for (let attempt = 0; attempt <= runtime.unparseable_reasks; attempt++) {
      if (stats.calls >= (options.callCap ?? runtime.call_cap)) {
        game.terminate("model_call_cap", actor);
        return null;
      }
      stats.calls++;
      const start = performance.now(),
        abort = new AbortController();
      let timer: ReturnType<typeof setTimeout> | undefined;
      let reply: ModelReply | null = null,
        parsed: ReturnType<typeof parse> = null;
      try {
        reply = await Promise.race([
          controller.complete(
            buildPrompt(options.arm ?? "M-obs", obs, legal, history[actor]) +
              (attempt
                ? "\nYour last reply was unparseable. Return the exact JSON contract."
                : ""),
            abort.signal,
          ),
          new Promise<never>((_, reject) => {
            timer = setTimeout(() => {
              reject(new Error("timeout"));
              abort.abort();
            }, options.timeoutMs ?? runtime.timeout_ms);
          }),
        ]);
        parsed = parse(reply.text);
        reason = parsed
          ? legal.includes(parsed.action)
            ? ""
            : "illegal"
          : "unparseable";
      } catch (e) {
        reason =
          e instanceof Error && e.message === "timeout" ? "timeout" : "error";
      } finally {
        if (timer) clearTimeout(timer);
      }
      const latency = performance.now() - start;
      stats.latencies.push(latency);
      stats.tok_in += reply?.tok_in ?? 0;
      stats.tok_out += reply?.tok_out ?? 0;
      log(
        actor,
        "model",
        obs,
        legal,
        reply?.text ?? null,
        parsed,
        reason === "",
        reason || null,
        latency,
        reply?.tok_in ?? 0,
        reply?.tok_out ?? 0,
      );
      if (!reason && parsed) {
        streak[actor] = 0;
        stats.model_moves++;
        return parsed.action;
      }
      if (reason === "illegal") stats.illegal++;
      if (reason !== "unparseable" || attempt === runtime.unparseable_reasks) break;
    }
    stats.fallbacks++;
    streak[actor]++;
    const action = obs.phase === "JUDGMENT" ? "abstain" : "GUARD";
    log(
      actor,
      `fallback:${reason}`,
      obs,
      legal,
      action,
      { action },
      action === "abstain" || legal.includes(action),
      reason,
    );
    if (streak[actor] >= runtime.consecutive_fallback_limit) {
      game.terminate("invalid_forfeit", actor);
      return null;
    }
    return action;
  };
  const hearing = game.observe(0);
  log(
    0,
    "engine",
    hearing,
    game.legalActions(0),
    "CONTINUE",
    { action: "CONTINUE" },
    true,
    null,
  );
  game.step(0, "CONTINUE");
  while (game.outcome().status === "ongoing") {
    if (game.state.phase === "JUDGMENT") {
      const o = game.observe(0),
        a = await acquire(0, o, game.legalActions(0), options.controller);
      if (a === null) break;
      if (a === "abstain") game.abstain();
      else game.step(0, a);
      history[0].push({ observation: o, action: a });
      continue;
    }
    const opponentObs = game.observe(1), opponentLegal = game.legalActions(1);
    const b = await acquire(1, opponentObs, opponentLegal, options.opponent);
    if (b === null) break;
    game.step(1, b);
    const observations = [game.observe(0), opponentObs];
    const a = await acquire(0, observations[0], game.legalActions(0), options.controller);
    if (a === null) break;
    game.step(0, a);
    history[0].push({ observation: observations[0], action: a });
    history[1].push({ observation: observations[1], action: b });
  }
  return {
    episode_id,
    seed: options.seed,
    scenario: options.scenario ?? {},
    outcome: game.outcome(),
    hp_diff: game.state.hp[0] - game.state.hp[1],
    exchanges: game.state.exchange,
    final_hash: stableHash(game.state),
    stats,
    trace,
    model_ids: [options.controller, options.opponent]
      .filter(isModel)
      .map((c) => c.modelId),
  };
}
