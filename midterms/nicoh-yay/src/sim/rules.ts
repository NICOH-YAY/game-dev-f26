export const ACTIONS = ["STRIKE", "GUARD", "BASH", "RECOVER", "SIDESTEP"] as const;
export type CombatAction = (typeof ACTIONS)[number];
export type Pair = [number, number];
export const TELL_TABLE: Record<CombatAction, number[]> = {
 STRIKE:[60,20,20], BASH:[45,35,20], GUARD:[20,60,20], RECOVER:[25,25,50], SIDESTEP:[15,15,70]
};
export const TELLS = ["raised_blade","braced_shield","shifting_feet"] as const;
export function combatLegal(stamina:number):CombatAction[] {
 return stamina < 1 ? ["GUARD","RECOVER"] : [...ACTIONS];
}
export function resolvePair(hp:Pair, stamina:Pair, a:CombatAction, b:CombatAction, position=3):{hp:Pair;stamina:Pair;position:number} {
 const damage=(x:CombatAction,y:CombatAction,wall:number)=> {
  if(y==="SIDESTEP") return 0;
  if(x==="STRIKE") return y==="GUARD" ? 0 : 3;
  if(x==="BASH") return y==="STRIKE" ? 0 : 2+Number(position===wall);
  return 0;
 };
 const da=damage(a,b,6), db=damage(b,a,0);
 const change=(x:CombatAction,y:CombatAction,wall:number)=>
  x==="GUARD" ? 1 : x==="RECOVER" ? (position===wall?1:2) :
  -1-Number(x==="STRIKE" && (y==="GUARD" || y==="SIDESTEP"));
 const clamp=(n:number,max:number)=>Math.max(0,Math.min(max,n));
 // Both attack pushes cancel before clamping. A successful evasion recenters once.
 const escape=(a==="SIDESTEP" && (b==="STRIKE"||b==="BASH")) ||
              (b==="SIDESTEP" && (a==="STRIKE"||a==="BASH"));
 return {hp:[clamp(hp[0]-db-Number(a==="STRIKE" && b==="GUARD"),12),clamp(hp[1]-da-Number(b==="STRIKE" && a==="GUARD"),12)],
 stamina:[clamp(stamina[0]+change(a,b,0),3),clamp(stamina[1]+change(b,a,6),3)],
 position:clamp(position+Number(da>0)-Number(db>0)+(escape?Math.sign(3-position):0),6)};
}
