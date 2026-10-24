// The browser session owns Game; the renderer receives observations and outcomes only.
import { Game, type Persona } from '../../src/game.js';
import { PersonaController } from '../../src/agents/index.js';
export function createSession(persona: Persona, seed=42) {
 const game=new Game(); game.reset(seed,{persona});
 const opponent=new PersonaController(persona,seed);
 let committed=false;
 return {
  observe:()=>game.observe(0), legal:()=>game.legalActions(0), outcome:()=>game.outcome(),
  commit() {
   if (game.observe(0).phase==='DUEL' && !committed) {
    const action=opponent.choose(game.observe(1),game.legalActions(1));
    const result=game.step(1,action); committed=result.accepted;
   }
  },
  act(action:string) { const r=game.step(0,action); if(r.resolved) committed=false; return r; }
 };
}
