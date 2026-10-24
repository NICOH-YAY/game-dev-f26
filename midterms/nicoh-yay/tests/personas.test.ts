import {it,expect} from "vitest";
import {readFileSync} from "node:fs";
import {Game,type Persona} from "../src/game.js";
import {PersonaController} from "../src/agents/index.js";
import {ACTIONS,type CombatAction} from "../src/sim/rules.js";
function choice(persona:Persona,seed:number,history:CombatAction[]) {
 const c=new PersonaController(persona,seed),g=new Game(); g.step(0,"CONTINUE");
 c.choose(g.observe(1),ACTIONS);
 let result="";
 history.forEach((a,i)=>{g.state.exchange=i+1;g.state.previous=[a,"STRIKE"];result=c.choose(g.observe(1),ACTIONS);});
 return result;
}
it("personas deterministic from seed and resolved history; ignore forbidden fields",()=>{
 for(const p of ["Aggressor","Sentinel","Opportunist","Adapter"] as const) {
  const a=new PersonaController(p,42),b=new PersonaController(p,42),g=new Game();g.step(0,"CONTINUE");
  for(let i=0;i<8;i++) {
   g.state.exchange=i;g.state.previous=i?["STRIKE","GUARD"]:null;
   const clean=g.observe(1),poison=structuredClone(clean);
   for(const key of ["tell","pending","guilt","rng","opponent_stamina_band","testimony"])
    Object.defineProperty(poison,key,{get(){throw new Error("forbidden read: "+key);}});
   expect(a.choose(clean,ACTIONS)).toBe(b.choose(poison,ACTIONS));
  }
 }
});
it("Sentinel parry rate rises substantially after two of last three strikes",()=>{
 let base=0,reactive=0;
 for(let seed=0;seed<2000;seed++) {
 base+=Number(choice("Sentinel",seed,["RECOVER","RECOVER","RECOVER"])==="GUARD");
 reactive+=Number(choice("Sentinel",seed,["STRIKE","RECOVER","STRIKE"])==="GUARD");
 }
 expect(reactive/2000).toBeGreaterThan(.70);expect((reactive-base)/2000).toBeGreaterThan(.15);
});
it("Adapter modal response counters the six-action window mode rather than last action",()=>{
 for(const [action,counter] of [["STRIKE","GUARD"],["BASH","STRIKE"],["GUARD","BASH"],["RECOVER","STRIKE"],["SIDESTEP","GUARD"]] as const) {
 const counts:Record<string,number>={};
 for(let seed=0;seed<500;seed++){const a=choice("Adapter",seed,[action,action,action,action,action,"BASH"]);counts[a]=(counts[a]??0)+1;}
 expect(Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0]).toBe(counter);
 expect(counts[counter]).toBeGreaterThan(325);
 }
});
it("situation duel seeds are disjoint and testimony seeds separate",()=>{
 const suite=JSON.parse(readFileSync("experiments/suite.json","utf8"));const used=new Set<number>();
 for(const s of suite.situations){expect(Number.isSafeInteger(s.duel_seed_base)).toBe(true);
 for(let i=0;i<20;i++){const seed=s.duel_seed_base+i;expect(used.has(seed)).toBe(false);used.add(seed);expect(seed).not.toBe(suite.testimony_seed_base+i);}}
});

it("persona priority habits and Adapter window eviction",()=>{
 const sample=(p:Persona,previous:[CombatAction,CombatAction],corner=false,stamina=3)=>{
 const counts:Record<string,number>={};
 for(let seed=0;seed<1000;seed++) {const g=new Game();g.step(0,"CONTINUE");const o=g.observe(1);o.exchange=1;o.previous={own:previous[0],opponent:previous[1]};o.cornered=[corner,false];o.own_stamina=stamina;
 const a=new PersonaController(p,seed).choose(o,ACTIONS);counts[a]=(counts[a]??0)+1;}
 return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];};
 expect(sample("Sentinel",["GUARD","STRIKE"])).toBe("STRIKE");
 expect(sample("Sentinel",["GUARD","STRIKE"],true)).toBe("SIDESTEP");
 expect(sample("Opportunist",["STRIKE","RECOVER"])).toBe("STRIKE");
 let bashes=0,guards=0;
 for(let seed=0;seed<500;seed++) {
 const c=new PersonaController("Aggressor",seed),g=new Game();g.step(0,"CONTINUE");c.choose(g.observe(1),ACTIONS);
 for(let i=1;i<=2;i++){g.state.exchange=i;g.state.previous=["GUARD","STRIKE"];const a=c.choose(g.observe(1),ACTIONS);if(i===2)bashes+=Number(a==="BASH");}
 guards+=Number(choice("Adapter",seed,[...Array<CombatAction>(6).fill("GUARD"),...Array<CombatAction>(6).fill("STRIKE")])==="GUARD");
 }
 expect(bashes).toBeGreaterThan(275);expect(guards).toBeGreaterThan(350);
});
it("separate testimony seed controls evidence independently of duel seed",()=>{
 const a=new Game(),b=new Game();a.reset(1,{testimonySeed:123});b.reset(2,{testimonySeed:123});
 expect(a.state.cards).toEqual(b.state.cards);expect(a.state.guilt).toBe(b.state.guilt);
 expect(a.state.rng.testimony).toBe(b.state.rng.testimony);expect(a.state.rng.tells).not.toBe(b.state.rng.tells);
});
