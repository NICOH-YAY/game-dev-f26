import { it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
it("observed regression: offline CLI runs on Node 24 without OS account lookup", () => {
  // Exercise the actual npm launcher: restoring tsx must reproduce the observed failure.
  const npmCLI = process.env.npm_execpath;
  expect(npmCLI).toBeTruthy();
  const run = spawnSync(
    process.execPath,
    [
      npmCLI!,
      "run",
      "eval",
      "--",
      "--suite",
      "experiments/suite.json",
      "--players",
      "random",
      "--trials",
      "1",
      "--out",
      ".test-results",
    ],
    { encoding: "utf8" },
  );
  expect(run.stderr).toBe("");
  expect(run.status).toBe(0);
  const rows = readFileSync(".test-results/summary.jsonl", "utf8")
    .trim()
    .split("\n")
    .map((s) => JSON.parse(s));
  expect(rows).toHaveLength(16);
  expect(rows.some(r => r.situation.startsWith("X2/"))).toBe(false);
  expect(rows.every(r => r.seed < 3127000000 || r.seed >= 3127001000)).toBe(true);
  const meta=JSON.parse(readFileSync(".test-results/provenance.json","utf8"));
  expect(meta.git_sha).toMatch(/^[0-9a-f]{40}$/);
  expect(meta.source_manifest["src/runner/config.ts"]).toMatch(/^[0-9a-f]{64}$/);
  expect(meta.suite_sha256).toMatch(/^[0-9a-f]{64}$/);
  expect(
    rows.every((r) => r.stats.calls === 0 && r.outcome.status === "terminal"),
  ).toBe(true);
  const guarded = spawnSync(
    process.execPath,
    ["dist/runner/cli.js", "--players", "M-obs", "--trials", "1"],
    { encoding: "utf8" },
  );
  expect(guarded.status).toBe(1);
  expect(guarded.stderr).toContain("require --live");
}, 20000);

