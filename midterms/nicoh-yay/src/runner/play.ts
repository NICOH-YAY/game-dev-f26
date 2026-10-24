import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { Game } from "../game.js";
import { PersonaController } from "../agents/index.js";
const g = new Game();
g.reset(Number(process.argv[2] ?? 42));
const opponent = new PersonaController("Aggressor", 42);
const io = createInterface({ input: stdin, output: stdout });
try {
  while (g.outcome().status === "ongoing") {
    if (g.state.phase === "DUEL" && g.state.pending[1] === null)
      g.step(1, opponent.choose(g.observe(1), g.legalActions(1)));
    const obs = g.observe(0),
      legal = g.legalActions(0);
    console.log(JSON.stringify(obs, null, 2));
    const reply = await io.question(legal.join("/") + "> ");
    const result = g.step(0, reply.trim().toUpperCase());
    if (!result.accepted) console.log(result.error);

  }
  console.log(JSON.stringify(g.outcome(), null, 2));
} finally {
  io.close();
}
