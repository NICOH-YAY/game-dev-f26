import { it, expect } from "vitest";
import { combatLegal, resolvePair } from "../src/sim/rules.js";
import { Game } from "../src/game.js";
const actions = ["STRIKE","GUARD","BASH","RECOVER","SIDESTEP"] as const;
// Independent explicit matrix: [damage to P0, damage to P1, stamina P0, stamina P1, position].
const rows = [
 [[3,3,1,1,3],[1,0,0,3,3],[0,3,1,1,4],[0,3,1,3,4],[0,0,0,1,3]],
 [[0,1,3,0,3],[0,0,3,3,3],[2,0,3,1,2],[0,0,3,3,3],[0,0,3,1,3]],
 [[3,0,1,1,2],[0,2,1,3,4],[2,2,1,1,3],[0,2,1,3,4],[0,0,1,1,3]],
 [[3,0,3,1,2],[0,0,3,3,3],[2,0,3,1,2],[0,0,3,3,3],[0,0,3,1,3]],
 [[0,0,1,0,3],[0,0,1,3,3],[0,0,1,1,3],[0,0,1,3,3],[0,0,1,1,3]]
];
for (const [i,a] of actions.entries()) for (const [j,b] of actions.entries())
 it(`${a}/${b} payoff, stamina and pushes`,()=>{
  const r=resolvePair([12,12],[2,2],a,b,3), e=rows[i][j];
  expect([...r.hp,...r.stamina,r.position]).toEqual([12-e[0],12-e[1],...e.slice(2)]);
 });
it("corner wall slam, restricted recovery, escape, clamp and trade cancellation",()=>{
 expect(resolvePair([12,12],[1,1],"RECOVER","BASH",0)).toEqual({hp:[9,12],stamina:[2,0],position:0});
 expect(resolvePair([12,12],[1,1],"SIDESTEP","STRIKE",0)).toEqual({hp:[12,12],stamina:[0,0],position:1});
 expect(resolvePair([12,12],[2,2],"BASH","BASH",6).position).toBe(6);
 expect(resolvePair([12,12],[2,2],"BASH","GUARD",6).hp).toEqual([12,9]);
 expect(resolvePair([12,12],[1,1],"STRIKE","GUARD").stamina[0]).toBe(0);
});
it("sidestep legality and public absolute position / relative corners",()=>{
 expect(combatLegal(1)).toContain("SIDESTEP"); expect(combatLegal(0)).toEqual(["GUARD","RECOVER"]);
 const g=new Game(); expect(g.observe(0).position).toBe(3); g.state.position=0;
 expect(g.observe(0).cornered).toEqual([true,false]); expect(g.observe(1).cornered).toEqual([false,true]);
 g.step(0,"CONTINUE"); g.state.stamina[0]=0; g.step(1,"GUARD");
 const before=structuredClone(g.state); expect(g.step(0,"SIDESTEP").accepted).toBe(false); expect(g.state).toEqual(before);
});

it("position golden observations",()=>{
 const g=new Game(); g.reset(123); g.step(0,"CONTINUE");
 const trace=[g.observe(0)];
 for(const [a,b] of [["STRIKE","RECOVER"],["BASH","GUARD"],["SIDESTEP","STRIKE"]]) {
  g.step(1,b);g.step(0,a);trace.push(g.observe(0));
 }
 expect(trace).toMatchSnapshot();
});
it("S1 mildly accusing and X1 conflicting testimony have distinct exact posteriors",async()=>{
 const {posterior}=await import("../src/sim/evidence.js");
 const g=new Game();g.reset(1,{evidence:"ambiguous"});const a=g.observe(0);
 g.reset(1,{evidence:"conflicting"});const b=g.observe(0);
 expect(a.testimony).toEqual(["accuse","accuse"]);expect(a.testimony_reliability).toEqual([.55,.55]);
 expect(b.testimony).toEqual(["clear","accuse"]);expect(b.testimony_reliability).toEqual([.9,.9]);
 expect(posterior(a.testimony,a.testimony_reliability)).toEqual({numerator:121,denominator:202});
 expect(posterior(b.testimony,b.testimony_reliability)).toEqual({numerator:1,denominator:2});
});

it("player prompt publishes the approved actions and pending tell timing",async()=>{
 const {buildPrompt}=await import("../src/runner/prompt.js");const g=new Game();
 const rules=JSON.parse(buildPrompt("M-obs",g.observe(0),[],[])).rules;
 expect(rules.GUARD).toContain("1 riposte damage");expect(rules.SIDESTEP).toContain("evades");expect(rules.tell_timing).toContain("pending");
});

it("riposte can KO the striker without moving footing; refused strike remains immutable",()=>{
 const g=new Game();g.step(0,"CONTINUE");g.state.hp=[1,12];
 g.step(1,"GUARD");g.step(0,"STRIKE");
 expect(g.state.hp).toEqual([0,12]);expect(g.state.position).toBe(3);
 expect(g.state.phase).toBe("JUDGMENT");
 expect(g.observe(0).hp).toEqual([0,12]);
 const before=structuredClone(g.state);expect(g.step(0,"STRIKE").accepted).toBe(false);expect(g.state).toEqual(before);
});

it("riposte observation golden trace",()=>{
 const g=new Game();g.reset(123);g.step(0,"CONTINUE");
 g.step(1,"GUARD");const pending=g.observe(0);g.step(0,"STRIKE");
 expect({pending,resolved:g.observe(0)}).toMatchSnapshot();
});
