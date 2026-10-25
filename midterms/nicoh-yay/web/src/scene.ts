import * as T from 'three';
import { renderSize, type Resolution } from './performance.js';
import { course, type State, type Vec } from '../../src/sim/index.js';
const v = (p: Vec) => new T.Vector3(p.x, p.y, p.z);
export class TowerScene {
    readonly scene = new T.Scene();
    readonly camera = new T.PerspectiveCamera(78, 1, .04, 180);
    private renderer: T.WebGLRenderer;
    resolution: Resolution = '480x270';
    private pole: T.Mesh;
    private dot: T.Mesh;
    private kick = 0;
    private clock = 0;
    private dust: {
        mesh: T.Mesh;
        life: number;
        velocity: T.Vector3;
    }[] = [];
    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new T.WebGLRenderer({ canvas, antialias: false });
        this.renderer.setPixelRatio(1);
        this.renderer.shadowMap.enabled = false;
        this.scene.background = new T.Color('#182d40');
        this.scene.fog = new T.Fog('#182d40', 35, 105);
        this.scene.add(new T.HemisphereLight('#c7edff', '#3e3349', 2.3));
        const sun = new T.DirectionalLight('#ffe0ad', 3);
        sun.position.set(-10, 40, 8);
        this.scene.add(sun);
        const colors: Record<string, string> = { slate: '#344e65', stone: '#8e9c9c', cyber: '#42568c', teal: '#43d6bc', gold: '#f5c665' };
        const boxes = new T.InstancedMesh(new T.BoxGeometry(1, 1, 1), new T.MeshLambertMaterial(), course.boxes.length);
        const transform = new T.Object3D();
        this.scene.add(boxes);
        for (const [index, b] of course.boxes.entries()) {
            const size = v(b.max).sub(v(b.min)), center = v(b.min).add(v(b.max)).multiplyScalar(.5);
            transform.position.copy(center);
            transform.scale.copy(size);
            transform.updateMatrix();
            boxes.setMatrixAt(index, transform.matrix);
            boxes.setColorAt(index, new T.Color(colors[b.material] ?? '#869c9e'));
            if (b.checkpoint || b.goal) {
                const ring = new T.Mesh(new T.TorusGeometry(b.goal ? .65 : 1.2, .06, 6, 24), new T.MeshBasicMaterial({ color: b.goal ? '#ffe98c' : '#7effdc' }));
                ring.rotation.x = -Math.PI / 2;
                ring.position.set(center.x, b.max.y + .03, center.z);
                this.scene.add(ring);
            }
            if (b.goal) {
                const crown = new T.Group();
                for (let i = 0; i < 5; i++) {
                    const tooth = new T.Mesh(new T.ConeGeometry(.15, .6, 4), new T.MeshLambertMaterial({ color: '#ffd875' }));
                    tooth.position.set(Math.cos(i * Math.PI * 2 / 5) * .45, .4, Math.sin(i * Math.PI * 2 / 5) * .45);
                    crown.add(tooth);
                }
                const base = new T.Mesh(new T.TorusGeometry(.5, .12, 6, 12), new T.MeshLambertMaterial({ color: '#ffd875' }));
                base.rotation.x = Math.PI / 2;
                crown.add(base);
                crown.position.set(center.x, b.max.y + .8, center.z);
                this.scene.add(crown);
            }
        }
        this.dot = new T.Mesh(new T.SphereGeometry(.055, 8, 8), new T.MeshBasicMaterial({ color: '#88ffe1', depthTest: false }));
        this.dot.renderOrder = 10;
        this.scene.add(this.dot);
        this.pole = new T.Mesh(new T.BufferGeometry(), new T.MeshLambertMaterial({ color: '#e1bd78' }));
        this.pole.frustumCulled = false;
        this.scene.add(this.pole);
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }
    setResolution(resolution: Resolution) { this.resolution = resolution; this.resize(); }
    private resize() {
        const size = renderSize(this.resolution, innerWidth, innerHeight);
        this.renderer.setSize(size.width, size.height, false);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }
    launch() { this.kick = 1; }
    land(p: Vec) { for (let i = 0; i < 12; i++) {
        const mesh = new T.Mesh(new T.BoxGeometry(.06, .06, .06), new T.MeshBasicMaterial({ color: '#dfd4ac', transparent: true }));
        mesh.position.copy(v(p));
        mesh.position.y -= .35;
        const a = i * Math.PI * 2 / 12;
        this.dust.push({ mesh, life: .5, velocity: new T.Vector3(Math.cos(a) * 1.5, .8 + (i % 3) * .2, Math.sin(a) * 1.5) });
        this.scene.add(mesh);
    } }
    render(s: State, yaw: number, pitch: number, hit: Vec | null, dt: number) {
        this.clock += dt;
        this.kick = Math.max(0, this.kick - dt * 3);
        this.camera.position.copy(v(s.p));
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.set(pitch, yaw, 0);
        this.camera.position.x += Math.sin(this.clock * 83) * this.kick * .018;
        this.camera.position.y += Math.sin(this.clock * 67) * this.kick * .014;
        this.camera.fov = 78 + this.kick * 7;
        this.camera.updateProjectionMatrix();
        this.camera.updateMatrixWorld();
        this.dot.visible = !!hit && !s.plant;
        if (hit)
            this.dot.position.copy(v(hit));
        const hand = new T.Vector3(.27, -.23, -.38).applyMatrix4(this.camera.matrixWorld);
        const tip = s.plant ? v(s.plant) : new T.Vector3(.04, -.04, -3.5).applyMatrix4(this.camera.matrixWorld);
        const mid = hand.clone().lerp(tip, .5);
        mid.y -= s.bend * 1.1;
        mid.add(new T.Vector3(.22 * s.bend, 0, 0).applyQuaternion(this.camera.quaternion));
        const curve = new T.QuadraticBezierCurve3(hand, mid, tip);
        this.pole.geometry.dispose();
        this.pole.geometry = new T.TubeGeometry(curve, 12, .028, 4, false);
        for (let i = this.dust.length - 1; i >= 0; i--) {
            const d = this.dust[i];
            d.life -= dt;
            d.mesh.position.addScaledVector(d.velocity, dt);
            d.velocity.y -= 3 * dt;
            (d.mesh.material as T.MeshBasicMaterial).opacity = Math.max(0, d.life * 2);
            if (d.life <= 0) {
                this.scene.remove(d.mesh);
                d.mesh.geometry.dispose();
                (d.mesh.material as T.Material).dispose();
                this.dust.splice(i, 1);
            }
        }
        this.renderer.render(this.scene, this.camera);
    }
}
