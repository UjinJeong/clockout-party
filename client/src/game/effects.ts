import * as THREE from 'three';
import { glow } from '../world/decor';

/**
 * Little bursts of light in the 3D room: gold sparkles when someone says 🥂,
 * pink ones for ❤️. One shared pool of particles, recycled.
 */
const MAX = 240;

export class Sparkles {
  private pos = new Float32Array(MAX * 3);
  private col = new Float32Array(MAX * 3);
  private vel = new Float32Array(MAX * 3);
  private life = new Float32Array(MAX);
  private next = 0;
  private geo = new THREE.BufferGeometry();
  readonly points: THREE.Points;

  constructor(scene: THREE.Scene) {
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    this.points = new THREE.Points(this.geo, new THREE.PointsMaterial({
      size: 0.16, map: glow(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  burst(at: THREE.Vector3, colors: THREE.ColorRepresentation[], count = 26) {
    for (let k = 0; k < count; k++) {
      const i = this.next; this.next = (this.next + 1) % MAX;
      const a = Math.random() * Math.PI * 2, up = 0.9 + Math.random() * 1.6, out = 0.4 + Math.random() * 1.1;
      this.pos.set([at.x, at.y, at.z], i * 3);
      this.vel.set([Math.cos(a) * out, up, Math.sin(a) * out], i * 3);
      const c = new THREE.Color(colors[k % colors.length]);
      this.col.set([c.r, c.g, c.b], i * 3);
      this.life[i] = 1.1 + Math.random() * 0.7;
    }
  }

  /** A jet in one direction (the water pistol): `dir` is a unit vector on the floor, `speed` in m/s. */
  spray(at: THREE.Vector3, dir: { x: number; z: number }, colors: THREE.ColorRepresentation[], count = 40, speed = 5.5) {
    for (let k = 0; k < count; k++) {
      const i = this.next; this.next = (this.next + 1) % MAX;
      const v = speed * (0.55 + Math.random() * 0.5), wob = (Math.random() - 0.5) * 0.5;
      this.pos.set([at.x, at.y, at.z], i * 3);
      this.vel.set([dir.x * v - dir.z * wob, 0.9 + Math.random() * 0.8, dir.z * v + dir.x * wob], i * 3);
      const c = new THREE.Color(colors[k % colors.length]);
      this.col.set([c.r, c.g, c.b], i * 3);
      this.life[i] = 0.8 + Math.random() * 0.5;
    }
  }

  tick(dt: number) {
    for (let i = 0; i < MAX; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      const j = i * 3;
      this.vel[j + 1] -= 2.2 * dt; // gentle fall
      this.pos[j] += this.vel[j] * dt; this.pos[j + 1] += this.vel[j + 1] * dt; this.pos[j + 2] += this.vel[j + 2] * dt;
      if (this.life[i] <= 0) { this.col[j] = this.col[j + 1] = this.col[j + 2] = 0; continue; }
      const fade = Math.min(1, this.life[i] * 2);
      this.col[j] *= 0.985 + 0.015 * fade; this.col[j + 1] *= 0.985 + 0.015 * fade; this.col[j + 2] *= 0.985 + 0.015 * fade;
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.color.needsUpdate = true;
  }

  dispose() { this.points.removeFromParent(); this.geo.dispose(); }
}

/**
 * Water you can see in daylight: small solid drops that fly in an arc and fall.
 * (The glowing sparkles are drawn by adding light, so over a sunny pool they vanish.)
 */
export class Droplets {
  private static MAX = 160;
  private mesh: THREE.InstancedMesh;
  private pos = new Float32Array(Droplets.MAX * 3);
  private vel = new Float32Array(Droplets.MAX * 3);
  private life = new Float32Array(Droplets.MAX);
  private size = new Float32Array(Droplets.MAX);
  private next = 0;
  private live = 0;
  private m = new THREE.Matrix4();

  constructor(private scene: THREE.Scene) {
    this.mesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 6, 5),
      new THREE.MeshBasicMaterial({ color: 0x3fb0ff, transparent: true, opacity: 0.95 }), // a clear blue: pale drops disappear against sunny tiles
      Droplets.MAX,
    );
    this.mesh.frustumCulled = false;
    this.mesh.count = Droplets.MAX;
    for (let i = 0; i < Droplets.MAX; i++) this.mesh.setMatrixAt(i, this.m.makeScale(0, 0, 0));
    scene.add(this.mesh);
  }

  private add(x: number, y: number, z: number, vx: number, vy: number, vz: number, size: number, life: number) {
    const i = this.next; this.next = (this.next + 1) % Droplets.MAX;
    this.pos.set([x, y, z], i * 3); this.vel.set([vx, vy, vz], i * 3);
    this.size[i] = size; this.life[i] = life;
    this.live = Math.max(this.live, life);
  }

  /** A jet from `at` along `dir` (unit vector on the floor): a tight stream that arcs and falls. */
  jet(at: THREE.Vector3, dir: { x: number; z: number }, count = 36, speed = 6) {
    for (let k = 0; k < count; k++) {
      const v = speed * (0.75 + Math.random() * 0.35), wob = (Math.random() - 0.5) * 0.7, back = k / count * 0.5;
      this.add(at.x - dir.x * back, at.y, at.z - dir.z * back, dir.x * v - dir.z * wob, 1.1 + Math.random() * 0.9, dir.z * v + dir.x * wob, 0.04 + Math.random() * 0.03, 0.55 + Math.random() * 0.35);
    }
  }

  /** A splash: drops thrown up and outwards in a ring. */
  splash(at: THREE.Vector3, count = 44, power = 3.4) {
    for (let k = 0; k < count; k++) {
      const a = Math.random() * Math.PI * 2, out = 0.6 + Math.random() * 1.4;
      this.add(at.x, at.y, at.z, Math.cos(a) * out, power * (0.6 + Math.random() * 0.6), Math.sin(a) * out, 0.045 + Math.random() * 0.04, 0.6 + Math.random() * 0.4);
    }
  }

  tick(dt: number) {
    if (this.live <= 0) return;
    this.live -= dt;
    for (let i = 0; i < Droplets.MAX; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      const j = i * 3;
      this.vel[j + 1] -= 9.8 * dt;
      this.pos[j] += this.vel[j] * dt; this.pos[j + 1] += this.vel[j + 1] * dt; this.pos[j + 2] += this.vel[j + 2] * dt;
      const s = this.life[i] <= 0 || this.pos[j + 1] < 0 ? 0 : this.size[i] * Math.min(1, this.life[i] * 6);
      if (s === 0) this.life[i] = 0;
      this.m.makeScale(s, s, s).setPosition(this.pos[j], this.pos[j + 1], this.pos[j + 2]);
      this.mesh.setMatrixAt(i, this.m);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.mesh.geometry.dispose(); (this.mesh.material as THREE.Material).dispose();
  }
}
