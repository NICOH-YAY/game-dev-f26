import type { Observation, Player, Phase } from '../../src/game.js';
import type { CombatAction } from '../../src/sim/rules.js';
export type TraceStep = { phase: Phase; actor: Player; source?: string; parsed?: { action?: string; intent?: string } | null; intent?: string; latency_ms?: number; valid?: boolean; observation?: Observation; obs?: Observation; effects?: string[]; after?: Observation; terminal?: { status: string; reason: string | null; winner: Player | null; judgment: unknown }; outcome?: { guilt: boolean | null; judgment: unknown; ledger: unknown } };
export type Cue = { player: Player; at: number; clip: string; effect?: string };
const clips: Record<CombatAction,string> = { STRIKE:'1H_Melee_Attack_Slice_Horizontal', BASH:'Block_Attack', GUARD:'Block', RECOVER:'Idle', SIDESTEP:'Dodge_Left' };
export function clashX(position: number): number { return (Math.min(6, Math.max(0,position))-3)*1.7; }
export function sourceBadge(source?: string): string {
 if (source === 'model') return 'model';
 if (source?.includes('fallback')) return 'fallback';
 if (source === 'controller' || source === 'baseline') return 'baseline';
 return source === 'engine' ? 'engine' : 'unknown';
}
// Presentation only: damage/effects must be supplied as recorded facts, never inferred from action rules.
export function animationCues(steps: TraceStep[], before?: Observation, after?: Observation): Cue[] {
 const cues: Cue[]=[];
 for (const s of steps) {
  const clip=clips[s.parsed?.action as CombatAction];
  if (s.valid !== false && s.phase === 'DUEL' && clip) {
   cues.push({player:s.actor,at:0,clip:'Idle'}, {player:s.actor,at:.35,clip});
   for (const effect of s.effects ?? []) cues.push({player:s.actor,at:.8,clip:'Idle',effect});
  }
 }
 // Identify a visual counter from recorded damage while guarding. No damage,
 // legality, stamina or outcome is computed here; the engine already supplied it.
 if(before && after) for(const s of steps) {
  const other=s.actor===0?1:0;
  if(s.valid!==false && s.parsed?.action==='GUARD' && after.hp[other]<before.hp[other]) {
   cues.push({player:s.actor,at:.7,clip:'Block',effect:'parry'}, {player:other,at:.9,clip:after.hp[other]===0?'Death_A':'Hit_A',effect:'riposte'});
  }
 }
 if (before && after) for (const player of [0,1] as const) {
  if (after.hp[player]<before.hp[player]) cues.push({player,at:.85,clip:after.hp[player]===0?'Death_A':'Hit_A',effect:(after.position===0 || after.position===6)?'wall':'hit'});
 }
 return cues.sort((a,b)=>a.at-b.at);
}
export function parseTrace(text: string): TraceStep[] {
 const rows=text.split(/\r?\n/).filter(s=>s.trim()).map((s,i)=>{
  const r=JSON.parse(s) as TraceStep;
  if (!r || typeof r !== 'object') throw new Error(`Invalid trace row ${i+1}`);
  if (!['HEARING','DUEL','JUDGMENT','EPILOGUE'].includes(r.phase) || ![0,1].includes(r.actor)) throw new Error(`Unsupported trace row ${i+1}`);
  if(r.source!==undefined && typeof r.source!=='string') throw new Error(`Invalid source at row ${i+1}`);
  if (r.parsed != null && (typeof r.parsed!=='object' || (r.parsed.action!==undefined && typeof r.parsed.action!=='string'))) throw new Error(`Invalid action at row ${i+1}`);
  if(r.latency_ms!==undefined && (!Number.isFinite(r.latency_ms)||r.latency_ms<0||r.latency_ms>3600000)) throw new Error(`Invalid latency at row ${i+1}`);
  for(const o of [r.obs,r.observation,r.after]) if(o && (!Array.isArray(o.hp)||o.hp.length!==2||!o.hp.every(n=>Number.isFinite(n)&&n>=0&&n<=12)||!Number.isInteger(o.own_stamina)||o.own_stamina<0||o.own_stamina>3||!Number.isInteger(o.position)||o.position<0||o.position>6||!Array.isArray(o.testimony)||!Array.isArray(o.testimony_reliability))) throw new Error(`Invalid observation at row ${i+1}`);
  if(r.effects && (!Array.isArray(r.effects)||!r.effects.every(e=>typeof e==='string'))) throw new Error(`Invalid effects at row ${i+1}`);
  return r;
 });
 if (!rows.length) throw new Error('Trace is empty');
 return rows;
}

export function staminaPips(n:number):string { return "[#]".repeat(n)+"[ ]".repeat(3-n); }
