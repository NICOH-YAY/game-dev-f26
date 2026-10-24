import { readFileSync } from "node:fs";
export type Runtime = {
 provider: string; model_env: string; project_env: string; location_env: string;
 live_requires: string; timeout_ms: number; call_cap: number; unparseable_reasks: number;
 consecutive_fallback_limit: number; arms: string[]; history_length: number;
};
export function validateRuntime(value: unknown): Runtime {
 if (!value || typeof value !== "object") throw new Error("Invalid runtime config");
 const r = value as Record<string, unknown>;
 for (const key of ["timeout_ms","call_cap","unparseable_reasks","consecutive_fallback_limit","history_length"]) {
  const n=r[key];
  if(typeof n!=="number" || !Number.isSafeInteger(n) || n < (key==="unparseable_reasks"?0:1)) throw new Error(`Invalid runtime ${key}`);
 }
 for(const key of ["provider","model_env","project_env","location_env","live_requires"])
  if(typeof r[key]!=="string" || !r[key]) throw new Error(`Invalid runtime ${key}`);
 if(r.provider!=="vertex" || r.live_requires!=="--live" || !Array.isArray(r.arms) || r.arms.join(",")!=="M-obs,M-hist") throw new Error("Unsupported runtime provider/arms/live gate");
 return Object.freeze(r) as Runtime;
}
export const runtime = validateRuntime(JSON.parse(readFileSync(new URL("../../agent-config.json",import.meta.url),"utf8")).runtime);
