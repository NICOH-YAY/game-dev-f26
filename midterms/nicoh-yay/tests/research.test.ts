import { it, expect } from "vitest";
import { dilemmas, callbacks, validateData } from "../src/dilemmas.js";
import { reset, eligible, step, observe, chapter } from "../src/sim.js";
it("all cards have foundations and executable echoes", () => {
 expect(validateData()).toEqual([]);
 for (const d of dilemmas) {
  expect(d.foundations.length).toBeGreaterThan(0);
  expect(d.options.some(o => o.callback)).toBe(true);
  for (const o of d.options) if(o.callback) expect(callbacks[o.callback.id]).toBeTruthy();
 }
});
function witness(d: (typeof dilemmas)[number], seed=1) {
 const s=reset(seed);
 for(const c of d.conditions) if("prior" in c) {if(!c.absent)s.ledger.push(c.prior);}
 else s.hidden[c.key]=c.min ?? c.max ?? s.hidden[c.key];
 return s;
}
it("every card can actually be selected by the phase selector", () => {
 for(const d of dilemmas) {
  let found=false;
  for(let seed=1;seed<=1000&&!found;seed++) {
   let s=witness(d,seed);
   expect(eligible(s,d),d.id).toBe(true);
   if(d.moment==="morning") {s.phase="chapter";s=step(s,"continue");}
   else {s.phase="coffee";s.shiftIndex=1;s.coffee.elapsed=d.moment==="evening"?105000:35000;s=step(s,"close");}
   found=s.dilemma===d.id;
  }
  expect(found,d.id).toBe(true);
 }
});
it("stock and till escalate only on acceptance and drift stays local", () => {
 for(const chain of ["stock","till"]) {
  const cards=dilemmas.filter(d=>d.chain===chain).sort((a,b)=>a.chainStep!-b.chainStep!);
  expect(cards).toHaveLength(4);
  let s=reset();
  for(let i=0;i<cards.length;i++) {
   const d=cards[i];
   expect(eligible(s,d)).toBe(true);
   if(i<3) expect(eligible(s,cards[i+1])).toBe(false);
   s.dilemma=d.id;s.phase=d.moment;
   const beforeAcceptance=structuredClone(s);beforeAcceptance.ledger=[];
   const plain=observe(beforeAcceptance);
   expect(plain.options.at(-1)!.text).not.toContain("Settle");
   const refused=step(s,d.options.find(o=>!o.compromise)!.id);
   if(i<3) expect(eligible(refused,cards[i+1])).toBe(false);
   s=step(s,d.options.find(o=>o.compromise)!.id);
   s.dilemma=d.id;s.phase=d.moment;
   expect(observe(s).options[0].id).toBe(d.options.find(o=>o.compromise)!.id);
   expect(observe(s).situation).not.toBe(plain.situation);
  }
 }
});
it("every echo can be scheduled and delivered",()=>{
 for(const d of dilemmas) for(const o of d.options) if(o.callback){
  let s=witness(d);s.phase=d.moment;s.dilemma=d.id;
  s=step(s,o.id);expect(s.pending.some(p=>p.id===o.callback!.id)).toBe(true);
  s.phase="journal";s.day+=o.callback.delay-1;s=step(s,"continue");
  expect(s.echoes).toContain(callbacks[o.callback.id]);
 }
});
it("warm and distant Laura moments are selectable",()=>{
 const s=reset();s.hidden.lauraCloseness=90;s.hidden.lauraTrust=90;
 expect(chapter(s)).toMatch(/cookie|recess|both|two people/);
 s.hidden.lauraCloseness=0;expect(chapter(s)).toMatch(/lunch|guess what|key|houses|apolog|cash box/);
});
it("helping while late visibly consumes pickup time",()=>{
 let s=reset();s.dilemma="everyone-saw";s.phase="shift";s.hidden.pickupLate=1;
 expect(observe(s).options.find(o=>o.id==="return")!.text).toContain("minutes");
 s=step(s,"return");expect(s.hidden.pickupLate).toBeGreaterThan(1);
});

it("delivery frames the same temptation with evening pressure",()=>{
 const morning=dilemmas.find(d=>d.id==="delivery-morning")!;
 const evening=dilemmas.find(d=>d.id==="late-delivery")!;
 expect(morning.options.map(o=>o.text)).toEqual(evening.options.map(o=>o.text));
 expect(morning.situation).toContain("quiet");expect(evening.situation).toContain("standing all day");
});
it("medicine needs both low cash and illness",()=>{
 const s=reset(),d=dilemmas.find(d=>d.id==="fever")!;
 s.hidden.money=0;expect(eligible(s,d)).toBe(false);
 s.hidden.lauraSick=1;expect(eligible(s,d)).toBe(true);
 s.hidden.money=20;expect(eligible(s,d)).toBe(false);
});
it("unearned chain actions are refused without changing state",()=>{
 const s=reset();s.phase="shift";s.dilemma="stock-label";
 expect(step(s,"accept")).toBe(s);
});
