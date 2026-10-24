import { Game } from '../src/game.js';
import { describe,it,expect } from 'vitest';
import { animationCues,clashX,sourceBadge,parseTrace } from '../web/src/mapping.js';
describe('renderer mapping',()=>{
 it('maps bounded footing symmetrically',()=>{expect(clashX(0)).toBe(-5.1);expect(clashX(3)).toBe(0);expect(clashX(6)).toBe(5.1);expect(clashX(99)).toBe(5.1)});
 it('labels provenance without claiming all controllers are models',()=>{expect(sourceBadge('controller')).toBe('baseline');expect(sourceBadge('model')).toBe('model');expect(sourceBadge('invalid_fallback')).toBe('fallback');expect(sourceBadge()).toBe('unknown')});
 it('cues anticipation before slash and ignores invalid actions',()=>{const cues=animationCues([{phase:'DUEL',actor:0,parsed:{action:'STRIKE'}},{phase:'DUEL',actor:1,valid:false,parsed:{action:'BASH'}}]);expect(cues).toEqual([{player:0,at:0,clip:'Idle'},{player:0,at:.35,clip:'1H_Melee_Attack_Slice_Horizontal'}])});
 it('accepts sparse traces without fabricating state',()=>{expect(parseTrace('{"phase":"DUEL","actor":1}')[0].obs).toBeUndefined();expect(()=>parseTrace('{"phase":"BAD","actor":0}')).toThrow()});
});

it('uses observed loss for hit, KO, corner dust and distinct counter sparks without mutating facts',()=>{
 const game=new Game(),before=game.observe(0),after=structuredClone(before);
 after.hp=[11,0];after.position=6;
 const snapshot=JSON.stringify({before,after});
 const cues=animationCues([{phase:'DUEL',actor:0,parsed:{action:'GUARD'}}],before,after);
 expect(cues).toContainEqual({player:0,at:.85,clip:'Hit_A',effect:'wall'});
 expect(cues).toContainEqual({player:1,at:.85,clip:'Death_A',effect:'wall'});
 expect(cues.some(c=>c.effect==='parry')).toBe(true);
 expect(cues.some(c=>c.effect==='riposte')).toBe(true);
 expect(JSON.stringify({before,after})).toBe(snapshot);
});
it('does not invent hit reactions when sparse traces omit HP',()=>{
 expect(animationCues([{phase:'DUEL',actor:0,parsed:{action:'STRIKE'}}]).some(c=>c.clip==='Hit_A')).toBe(false);
});
it('rejects malformed replay data before presentation',()=>{
 expect(()=>parseTrace('null')).toThrow();
 expect(()=>parseTrace('{"phase":"DUEL","actor":0,"latency_ms":-1}')).toThrow();
 expect(()=>parseTrace('{"phase":"DUEL","actor":0,"observation":{"hp":[99,1]}}')).toThrow();
});

import { createSession } from '../web/src/session.js';
import { staminaPips } from '../web/src/mapping.js';
it('human Aggressor resolves first strike once and preserves its presentation snapshot',()=>{
 const s=createSession('Aggressor');s.act('CONTINUE');s.commit();s.commit();
 expect(s.act('STRIKE').resolved).toBe(true);
 const after=s.observe();expect(after.hp).toEqual([9,9]);expect(after.exchange).toBe(1);
 expect(after.previous).toEqual({own:'STRIKE',opponent:'STRIKE'});
 expect(s.act('STRIKE').accepted).toBe(false);
 s.commit();s.commit();expect(s.observe().hp).toEqual([9,9]);expect(after).toEqual({...after,hp:[9,9]});
});
it('renders exact own stamina as filled and empty pips',()=>{expect(staminaPips(2)).toBe('[#][#][ ]');});
