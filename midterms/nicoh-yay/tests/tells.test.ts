import { it, expect } from "vitest";
import { Game } from "../src/game.js";
import { ACTIONS, TELLS, TELL_TABLE } from "../src/sim/rules.js";
import { stableHash } from "../src/sim/random.js";
const duel = (seed = 1) => { const g = new Game(); g.reset(seed); g.step(0, "CONTINUE"); return g; };
it("review regression: pending tell exists before player chooses; early commit immutable", () => {
 const g = duel(), hash = stableHash(g.state);
 expect(g.step(0, "STRIKE")).toEqual({accepted:false,error:"await_opponent_commit"});
 expect(stableHash(g.state)).toBe(hash);
 expect(g.step(1,"STRIKE")).toEqual({accepted:true,resolved:false});
 expect(TELLS).toContain(g.observe(0).tell);
 expect(g.observe(1).tell).toBeNull();
 expect(g.observe(0).previous).toBeNull();
 expect(g.state.exchange).toBe(0);
 g.step(0,"GUARD");
 expect(g.observe(0).tell).toBeNull();
 expect(g.observe(0).previous).toEqual({own:"GUARD",opponent:"STRIKE"});
});
it("pending action changes only tell; hidden fields are byte-identical; frequencies match table", () => {
 const counts = ACTIONS.map(() => [0,0,0]);
 for (let seed=0;seed<6000;seed++) {
  let publicView: string | undefined;
  ACTIONS.forEach((action,j) => {
   const g=duel(seed); g.step(1,action);
   const obs=g.observe(0), legal=JSON.stringify(g.legalActions(0));
   counts[j][TELLS.indexOf(obs.tell as typeof TELLS[number])]++;
   const {tell,...rest}=obs;
   if(publicView===undefined) publicView=JSON.stringify(rest);
   expect(JSON.stringify(rest)).toBe(publicView);
   g.state.guilt=!g.state.guilt; g.state.stamina[1]=2;
   g.state.persona="Adapter"; g.state.rng.persona^=seed; g.state.rng.testimony^=seed;
   expect(JSON.stringify(g.observe(0))).toBe(JSON.stringify(obs));
   expect(JSON.stringify(g.legalActions(0))).toBe(legal);
  });
 }
 ACTIONS.forEach((a,j)=>counts[j].forEach((n,k)=>expect(Math.abs(n/6000-TELL_TABLE[a][k]/100)).toBeLessThan(.025)));
});
