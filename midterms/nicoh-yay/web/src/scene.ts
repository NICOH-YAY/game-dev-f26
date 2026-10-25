import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { tower } from '../../src/sim/level.js';
import type { State } from '../../src/sim/index.js';
const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;
export class TowerScene {
    readonly scene = new T.Scene();
    readonly camera = new T.PerspectiveCamera(38, 1, .1, 180);
    private renderer: T.WebGLRenderer;
    private composer: EffectComposer;
    private knight = new T.Group();
    private body = new T.Group();
    private lance = new T.Group();
    private aim: T.Line;
    private mixer?: T.AnimationMixer;
    private idle?: T.AnimationAction;
    private crown = new T.Group();
    private particles: {
        m: T.Mesh;
        v: T.Vector3;
        life: number;
    }[] = [];
    private shake = 0;
    private clock = 0;
    private cameraY = 5;
    private fallback: T.Mesh;
    private squash = 0;
    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new T.WebGLRenderer({ canvas, antialias: false });
        this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        this.renderer.shadowMap.enabled = true;
        this.scene.background = new T.Color('#243b52');
        this.scene.fog = new T.Fog('#243b52', 35, 100);
        this.scene.add(new T.HemisphereLight('#d0e8ff', '#45394a', 2.5));
        const sun = new T.DirectionalLight('#ffe1ae', 3);
        sun.position.set(-8, 22, 12);
        this.scene.add(sun);
        this.composer = new EffectComposer(this.renderer);
        const pixel = new RenderPixelatedPass(3, this.scene, this.camera);
        pixel.normalEdgeStrength = .5;
        pixel.depthEdgeStrength = .35;
        this.composer.addPass(pixel);
        this.composer.addPass(new OutputPass());
        for (const b of tower.solids) {
            this.box(b.w, b.h, 2.3, b.x + b.w / 2, b.y + b.h / 2, 0, '#687b89');
            this.box(b.w + .08, .12, 2.4, b.x + b.w / 2, b.y + b.h + .01, 0, '#b1b7a6');
            for (let x = b.x + .5; x < b.x + b.w; x += 1.5)
                this.box(.05, .6, .02, x, b.y + .45, 1.17, '#455e73');
        }
        // Backdrop masonry lives behind the gameplay plane, never in the collider list.
        for (let y = -2; y < 43; y += 4) {
            this.box(13, 3.96, 1, 0, y, -5, '#30495e');
            this.box(1.2, 4, 4, -7, y, -5, '#3d5668');
            this.box(1.2, 4, 4, 7, y, -5, '#3d5668');
            for (const x of [-4, 0, 4]) {
                this.box(.7, 1.6, .1, x, y + .5, -4.45, '#1b2c41');
                this.box(.9, .15, .3, x, y - .35, -4.3, '#71818a');
            }
        }
        for (const section of tower.sections) {
            const pennant = this.box(.7, 2, .08, -6, section.y + 3, -3, '#a34f4c');
            pennant.rotation.z = -.05;
            this.box(.08, 2.5, .15, -6.5, section.y + 3.4, -3, '#c1a477');
        }
        this.fallback = this.box(.55, 1, .4, 0, .55, 0, '#9cb8cf');
        this.scene.remove(this.fallback);
        this.body.add(this.fallback);
        this.knight.add(this.body);
        this.scene.add(this.knight);
        const shaft = new T.Mesh(new T.CylinderGeometry(.035, .05, 2.7, 5), new T.MeshToonMaterial({ color: '#d7b279' }));
        shaft.rotation.z = Math.PI / 2;
        shaft.position.x = 1.1;
        this.lance.add(shaft);
        const tip = new T.Mesh(new T.ConeGeometry(.13, .5, 4), new T.MeshToonMaterial({ color: '#d2e6ed' }));
        tip.rotation.z = -Math.PI / 2;
        tip.position.x = 2.7;
        this.lance.add(tip);
        this.lance.position.set(0, .65, .3);
        this.knight.add(this.lance);
        this.aim = new T.Line(new T.BufferGeometry(), new T.LineDashedMaterial({ color: '#f5d58a', dashSize: .18, gapSize: .13 }));
        this.scene.add(this.aim);
        this.crown.position.set(tower.crown.x, tower.crown.y + .65, 0);
        this.scene.add(this.crown);
        const ring = new T.Mesh(new T.CylinderGeometry(.42, .35, .25, 8), new T.MeshToonMaterial({ color: '#efc96c' }));
        this.crown.add(ring);
        for (let i = 0; i < 5; i++) {
            const tip = new T.Mesh(new T.ConeGeometry(.13, .4, 4), ring.material);
            tip.position.set(Math.cos(i * Math.PI * 2 / 5) * .36, .27, Math.sin(i * Math.PI * 2 / 5) * .36);
            this.crown.add(tip);
        }
        window.addEventListener('resize', () => this.resize());
        this.resize();
        void this.load();
    }
    private box(w: number, h: number, d: number, x: number, y: number, z: number, color: string) { const m = new T.Mesh(new T.BoxGeometry(w, h, d), new T.MeshToonMaterial({ color })); m.position.set(x, y, z); this.scene.add(m); return m; }
    private async load() {
        const loader = new GLTFLoader();
        try {
            const g = await loader.loadAsync(asset('Knight.glb'));
            const bounds = new T.Box3().setFromObject(g.scene);
            const scale = 1.2 / (bounds.max.y - bounds.min.y);
            g.scene.scale.setScalar(scale);
            g.scene.position.y = -bounds.min.y * scale;
            g.scene.traverse(o => { if (o instanceof T.Mesh) {
                if (/Sword|Axe|Shield|Mug/.test(o.name))
                    o.visible = false;
                const old = Array.isArray(o.material) ? o.material[0] : o.material;
                o.material = new T.MeshToonMaterial({ map: old.map, color: '#bad5e9' });
            } });
            this.fallback.visible = false;
            this.body.add(g.scene);
            this.mixer = new T.AnimationMixer(g.scene);
            const clip = g.animations.find(c => c.name === 'Idle');
            if (clip) {
                this.idle = this.mixer.clipAction(clip);
                this.idle.play();
            }
        }
        catch (error) {
            console.warn('Knight asset unavailable; using procedural knight', error);
        }
        try {
            const g = await loader.loadAsync(asset('tower-square.glb'));
            for (const x of [-12, 12]) {
                const m = g.scene.clone(true);
                m.position.set(x, -1, -8);
                m.scale.set(3, 10, 3);
                this.scene.add(m);
            }
        }
        catch (error) {
            console.warn('Castle decoration unavailable', error);
        }
    }
    private resize() { const w = innerWidth, h = innerHeight; this.renderer.setSize(w, h); this.composer.setSize(w, h); this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); }
    pointerAngle(clientX: number, clientY: number, s: State) {
        const p = new T.Vector3(s.x, s.y + .6, 0).project(this.camera);
        const dx = clientX - (p.x + 1) * innerWidth / 2;
        const dy = (1 - p.y) * innerHeight / 2 - clientY;
        return T.MathUtils.clamp(Math.atan2(Math.abs(dy), dx) * 180 / Math.PI, 25, 155);
    }
    landing(s: State) { this.squash = .16; this.shake = Math.min(.22, s.landImpact * .012); for (let i = 0; i < 12; i++) {
        const m = this.box(.08, .08, .08, s.x, s.y + .05, .3, '#c1b8a4');
        this.particles.push({ m, v: new T.Vector3(Math.cos(i * 2.4) * 2, 1 + i % 3 * .4, Math.sin(i * 2.4)), life: .45 });
    } }
    render(s: State, angle: number, dt: number) {
        this.clock += dt;
        this.mixer?.update(dt);
        this.knight.position.set(s.x, s.y, 0);
        const direction = Math.cos((s.phase === 'standing' ? angle : s.angle) * Math.PI / 180) > 0 ? 1 : -1;
        this.body.rotation.y = direction > 0 ? Math.PI / 2 : -Math.PI / 2;
        this.body.rotation.z = s.phase === 'runup' ? -.16 * direction : s.phase === 'airborne' ? (s.snapped ? this.clock * 9 : Math.max(-.4, Math.min(.4, -s.vy * .035)) * direction) : 0;
        this.body.position.y = s.phase === 'runup' ? Math.abs(Math.sin(this.clock * 33)) * .09 : -this.squash;
        this.lance.visible = !s.snapped || s.phase === 'standing';
        this.squash *= Math.exp(-dt * 14);
        this.lance.rotation.z = s.phase === 'standing' ? -angle * Math.PI / 180 : s.phase === 'runup' ? -.5 * direction : .4 * direction;
        this.aim.visible = s.phase === 'standing' && !s.won;
        // A short plant-direction cue, deliberately not a predicted arc.
        const r = angle * Math.PI / 180;
        const start = new T.Vector3(s.x, s.y + .65, .4);
        const end = start.clone().add(new T.Vector3(Math.cos(r) * 2.8, -Math.sin(r) * 2.8, 0));
        this.aim.geometry.dispose();
        this.aim.geometry = new T.BufferGeometry().setFromPoints([start, end]);
        this.aim.computeLineDistances();
        this.crown.rotation.y = this.clock;
        this.crown.position.y = tower.crown.y + .65 + Math.sin(this.clock * 2) * .1;
        this.particles = this.particles.filter(p => { p.life -= dt; p.v.y -= dt * 5; p.m.position.addScaledVector(p.v, dt); if (p.life <= 0) {
            this.scene.remove(p.m);
            p.m.geometry.dispose();
            (p.m.material as T.Material).dispose();
            return false;
        } return true; });
        this.cameraY = T.MathUtils.damp(this.cameraY, Math.max(4, s.y + 3.2), 5, dt);
        this.shake *= Math.exp(-dt * 15);
        this.camera.position.set(.7 + Math.sin(this.clock * 80) * this.shake, this.cameraY + 2, Math.max(25, 24 / this.camera.aspect));
        this.camera.lookAt(0, this.cameraY, 0);
        this.composer.render();
    }
}
