import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import type { Observation } from '../../src/game.js';
import { clashX, type Cue } from './mapping.js';
const asset=(s:string)=>`${import.meta.env.BASE_URL}assets/${s}`;
export class Arena {
 private scene=new T.Scene(); private camera=new T.PerspectiveCamera(38,1,.1,150);
 private renderer:T.WebGLRenderer; private composer:EffectComposer;
 private fighters=[new T.Group(),new T.Group()];
 private mixers:T.AnimationMixer[]=[]; private clips:T.AnimationClip[][]=[]; private current:(T.AnimationAction|undefined)[]=[];
 private torches:T.PointLight[]=[]; private particles:{mesh:T.Mesh;life:number;v:T.Vector3}[]=[];
 private paused=false;private rate=1;private cues:Cue[]=[];private elapsed=2;private target=0;private shown=0;private title=true;private clock=new T.Clock();
 private tell=new T.Group();private tellKinds:T.Object3D[]=[];
 constructor(canvas:HTMLCanvasElement) {
  this.renderer=new T.WebGLRenderer({canvas,antialias:false});this.renderer.setPixelRatio(1);
  this.scene.background=new T.Color('#302d4b');this.scene.fog=new T.Fog('#302d4b',22,65);
  this.camera.position.set(0,3.6,10);this.camera.lookAt(0,1.4,0);
  this.scene.add(new T.HemisphereLight('#acb9ed','#595060',2.7));
  const sun=new T.DirectionalLight('#edb38e',3);sun.position.set(-7,10,5);this.scene.add(sun);
  this.composer=new EffectComposer(this.renderer);const pixel=new RenderPixelatedPass(5,this.scene,this.camera);pixel.normalEdgeStrength=.35;pixel.depthEdgeStrength=.5;this.composer.addPass(pixel);this.composer.addPass(new OutputPass());
  this.box(0,-.2,0,18,.4,9,'#555461');
  for(let x=-8;x<=8;x+=1)for(let z=-3;z<=3;z+=1)this.box(x,-.01,z,.94,.07,.94,(x+z)%2?'#66616d':'#77717a');
  this.box(0,1.6,-4,18,3.2,.65,'#55505f');
  for(const x of [-7,7]){this.box(x,1.1,0,.6,2.2,8,'#514b59');for(let z=-3;z<=3;z+=1.5)this.box(x,2.5,z,.8,.6,.7,'#66606b');}
  for(let x=-8;x<9;x+=1.5)this.box(x,3.5,-4,.9,.7,.8,'#69606d');
  for(let i=0;i<11;i++){const hill=new T.Mesh(new T.ConeGeometry(4+(i%3),7+(i%4),4),new T.MeshToonMaterial({color:'#363a53'}));hill.position.set((i-5)*7,1,-22-(i%2)*8);this.scene.add(hill);}
  for(const x of [-6,6])for(const z of [-3,2]){this.box(x,1.3,z,.12,2.6,.12,'#33272a');const flame=new T.Mesh(new T.IcosahedronGeometry(.22,0),new T.MeshBasicMaterial({color:'#ffbd56'}));flame.position.set(x,2.7,z);this.scene.add(flame);const light=new T.PointLight('#ff9848',9,8);light.position.copy(flame.position);this.scene.add(light);this.torches.push(light);}
  this.fighters.forEach((f,i)=>{f.rotation.y=i===0?Math.PI/2:-Math.PI/2;f.position.x=i===0?-1.1:1.1;this.scene.add(f)});
  const tellBlade=this.box(0,0,0,.12,.7,.12,'#ffe6a1');this.scene.remove(tellBlade);this.tell.add(tellBlade);this.scene.add(this.tell);this.tell.visible=false;this.tellKinds.push(tellBlade);const shieldIcon=new T.Mesh(new T.BoxGeometry(.55,.65,.12),new T.MeshBasicMaterial({color:'#a3c5ff'}));const feetIcon=new T.Group();for(const side of [-1,1]){const foot=new T.Mesh(new T.BoxGeometry(.18,.15,.4),new T.MeshBasicMaterial({color:'#c6edb7'}));foot.position.x=side*.2;feetIcon.add(foot);}this.tell.add(shieldIcon,feetIcon);this.tellKinds.push(shieldIcon,feetIcon);
  window.addEventListener('resize',()=>this.resize());this.resize();
  this.renderer.setAnimationLoop(()=>this.frame());
 }
 private box(x:number,y:number,z:number,w:number,h:number,d:number,color:string){const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshToonMaterial({color}));m.position.set(x,y,z);this.scene.add(m);return m;}
 setPlayback(paused:boolean,rate=1){this.paused=paused;this.rate=rate;}
 reset(){this.cues=[];this.target=0;this.shown=0;this.fighters.forEach((_,i)=>this.play(i,'Idle'));}
 async load(){
  const loader=new GLTFLoader();
  for(const [i,file] of ['Knight.glb','Barbarian.glb'].entries()){
   const g=await loader.loadAsync(asset(file));
   const bounds=new T.Box3().setFromObject(g.scene);const scale=2.6/(bounds.max.y-bounds.min.y);g.scene.scale.setScalar(scale);g.scene.position.y=-bounds.min.y*scale;
   g.scene.traverse(o=>{if(o instanceof T.Mesh){if (['1H_Sword_Offhand','Rectangle_Shield','Round_Shield','Spike_Shield','2H_Sword','1H_Axe_Offhand','Barbarian_Round_Shield','2H_Axe','Mug','Barbarian_Hat'].includes(o.name)) o.visible=false;const old=Array.isArray(o.material)?o.material[0]:o.material;const mat=new T.MeshToonMaterial({map:old.map,color:i===0?'#77aaff':o.name.includes('Body')||o.name.includes('Leg')?'#413840':'#b33d49'});o.material=mat;}});
   this.fighters[i].add(g.scene);this.mixers[i]=new T.AnimationMixer(g.scene);this.clips[i]=g.animations;this.play(i,'Idle');
   // Heraldry and horns are original geometry, attached to the fighter root.
   if(i===1) for(const side of [-1,1]){const horn=new T.Mesh(new T.ConeGeometry(.15,.65,4),new T.MeshToonMaterial({color:'#d9c4a4'}));horn.position.set(side*.34,2.5,0);horn.rotation.z=-side*.6;const head=g.scene.getObjectByName('head');if(head){horn.position.set(side*.15,.2,0);horn.scale.setScalar(1/scale);head.add(horn);}else this.fighters[i].add(horn);}
   else {const shield=new T.Mesh(new T.BoxGeometry(.08,.65,.5),new T.MeshToonMaterial({color:'#204a9b'}));shield.position.set(-.35,1.3,.36);this.fighters[i].add(shield);const lion=new T.Mesh(new T.IcosahedronGeometry(.16,0),new T.MeshToonMaterial({color:'#e5c36e'}));lion.position.set(-.41,1.3,.36);this.fighters[i].add(lion);}
  }
  for(const [file,x,y,z,scale] of [['tower-square.glb',-8,0,-5,2],['tower-square.glb',8,0,-5,2],['flag-banner-long.glb',-4,2,-3.5,1.5],['flag-banner-long.glb',4,2,-3.5,1.5]] as const){const g=await loader.loadAsync(asset(file));g.scene.position.set(x,y,z);g.scene.scale.setScalar(scale);this.scene.add(g.scene);}
 }
 private play(i:number,name:string){const clip=this.clips[i]?.find(c=>c.name===name);if(!clip)return;const next=this.mixers[i].clipAction(clip);this.current[i]?.fadeOut(.12);next.reset().fadeIn(.12).setLoop(name==='Idle'?T.LoopRepeat:T.LoopOnce,name==='Idle'?Infinity:1);next.clampWhenFinished=true;next.play();this.current[i]=next;}
 present(o?:Observation,title=false){this.title=title;if(o)this.target=clashX(o.position);this.tell.visible=!!o?.tell;this.tellKinds.forEach((m,i)=>m.visible=i===(o?.tell==='braced_shield'?1:o?.tell==='shifting_feet'?2:0));}
 animate(cues:Cue[]){this.cues=[...cues];this.elapsed=0;}
 private burst(effect:string,player:number){const color=effect==='parry'?'#85dfff':effect==='riposte'?'#d796ff':effect==='wall'?'#af9c8b':'#ffc264';for(let i=0;i<16;i++){const m=new T.Mesh(new T.BoxGeometry(.08,.08,.08),new T.MeshBasicMaterial({color}));m.position.copy(this.fighters[player].position).add(new T.Vector3(0,1.4,0));this.scene.add(m);this.particles.push({mesh:m,life:.6,v:new T.Vector3(Math.sin(i*5)*4,Math.cos(i)*3+2,Math.cos(i*7)*3)});}}
 private resize(){const w=window.innerWidth,h=window.innerHeight;this.camera.position.z=Math.max(10,12/(w/h));this.renderer.setSize(w,h);this.composer.setSize(w,h);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();}
 private frame(){const dt=this.paused? (this.clock.getDelta(),0):Math.min(this.clock.getDelta(),.05)*this.rate;this.elapsed+=dt;
  while(this.cues[0] && this.cues[0].at<=this.elapsed){const c=this.cues.shift()!;this.play(c.player,c.clip);if(c.effect)this.burst(c.effect,c.player);}
  this.mixers.forEach(m=>m.update(dt));this.shown=T.MathUtils.damp(this.shown,this.target,5,dt);
  this.fighters.forEach((f,i)=>{f.position.x=this.shown+(i===0?-1.1:1.1);});this.tell.position.set(this.fighters[1].position.x,3.5,0);
  this.torches.forEach((t,i)=>t.intensity=8+Math.sin(performance.now()*.013+i*5)*1.2);
  this.particles=this.particles.filter(p=>{p.life-=dt;p.mesh.position.addScaledVector(p.v,dt);p.v.y-=dt*7;if(p.life<=0){this.scene.remove(p.mesh);p.mesh.geometry.dispose();(p.mesh.material as T.Material).dispose();return false}return true});
  if(this.title){this.camera.position.x=Math.sin(performance.now()*.00015)*2;this.camera.lookAt(0,1.4,0);}else{this.camera.position.x=T.MathUtils.damp(this.camera.position.x,this.shown,3,dt);this.camera.lookAt(this.shown,1.4,0);}
  this.composer.render();
 }
}
