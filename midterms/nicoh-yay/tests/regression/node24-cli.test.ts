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

