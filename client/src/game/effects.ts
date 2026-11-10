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
