import * as THREE from 'three';
import { DOOR_HALF, PARTITIONS, PLANTS, ROOM_IDS, ROOM_W, TABLES, WORLD } from '@party/shared';
import { canvasTexture } from './textures';
import type { Painting } from './gallery';

/**
 * Party atmosphere on top of the gallery: string lights along the cornice,
 * a warm wash from each picture light, standing tables with candles, plants,
 * and dust drifting through the light. Everything is cheap: instanced bulbs,
 * additive sprites and one particle cloud, so phones keep up.
 */

let glowTex: THREE.Texture | null = null;
export function glow() {
  if (glowTex) return glowTex;
  glowTex = canvasTexture(64, 64, (x, w, h) => {
    const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
  });
  return glowTex;
}

/** A soft light wash: bright at the top edge, fading downward (for above a painting). */
function washTexture() {
  return canvasTexture(128, 128, (x, w, h) => {
    const g = x.createRadialGradient(w / 2, 0, 0, w / 2, 0, h);
    g.addColorStop(0, 'rgba(255,236,200,.9)'); g.addColorStop(0.5, 'rgba(255,220,170,.28)'); g.addColorStop(1, 'rgba(255,210,160,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
  });
}

const BULB_COLORS = ['#ffd9a0', '#ffe8c4', '#ffb88a', '#ffc6d0', '#fff1d6'].map(c => new THREE.Color(c));

export interface Decor { tick(dt: number): void; setNight(n: number): void }

export function buildDecor(scene: THREE.Scene, paintings: Painting[]): Decor {
  const group = new THREE.Group();
  scene.add(group);
  let night = 0, t = 0;

  // ---- string lights ----
  // 1) small scallops hanging from the cornice of each back wall
  // 2) footlights along the open front edge of the stage (the camera always sees these)
  // 3) a strand along the top of each low front wall
  const bulbs: { p: THREE.Vector3; c: THREE.Color; phase: number; speed: number }[] = [];
  const runs: THREE.Vector3[][] = [];
  const addBulb = (p: THREE.Vector3) => bulbs.push({
    p, c: BULB_COLORS[bulbs.length % BULB_COLORS.length].clone(), phase: Math.random() * Math.PI * 2, speed: 0.6 + Math.random() * 1.4,
  });
  const strand = (from: THREE.Vector3, to: THREE.Vector3, step: number, span: number, sag: number) => {
    const len = from.distanceTo(to), n = Math.max(1, Math.round(len / step)), run: THREE.Vector3[] = [];
    for (let k = 0; k <= n; k++) {
      const p = from.clone().lerp(to, k / n);
      const u = ((k * len / n) % span) / span;
      p.y -= sag * 4 * u * (1 - u);
      run.push(p); addBulb(p.clone().add(new THREE.Vector3(0, -0.03, 0)));
    }
    runs.push(run);
  };
  for (let r = 0; r < ROOM_IDS.length; r++) {
    strand(new THREE.Vector3(r * ROOM_W + 0.25, 4.12, WORLD.z0 + 0.16), new THREE.Vector3((r + 1) * ROOM_W - 0.25, 4.12, WORLD.z0 + 0.16), 0.3, 1.5, 0.14);
  }
  strand(new THREE.Vector3(0.2, 0.08, WORLD.z1 - 0.12), new THREE.Vector3(WORLD.x1 - 0.2, 0.08, WORLD.z1 - 0.12), 0.4, 0.8, 0);
  for (const x of [0, ...PARTITIONS, WORLD.x1]) {
    const startZ = x === 0 || x === WORLD.x1 ? 1.6 : DOOR_HALF + 0.05;
    strand(new THREE.Vector3(x, 1.12, startZ), new THREE.Vector3(x, 1.12, WORLD.z1 - 0.1), 0.25, 1, 0.07);
  }
  const bulbGeo = new THREE.SphereGeometry(0.035, 6, 4);
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const bulbMesh = new THREE.InstancedMesh(bulbGeo, bulbMat, bulbs.length);
  const m4 = new THREE.Matrix4();
  bulbs.forEach((b, i) => { m4.makeTranslation(b.p.x, b.p.y, b.p.z); bulbMesh.setMatrixAt(i, m4); bulbMesh.setColorAt(i, b.c); });
  group.add(bulbMesh);
  // the wire between bulbs
  const wireMat = new THREE.LineBasicMaterial({ color: 0x2a1d16 });
  for (const run of runs) group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(run), wireMat));
  // halos: one additive point per bulb
  const haloGeo = new THREE.BufferGeometry();
  const haloPos = new Float32Array(bulbs.length * 3), haloCol = new Float32Array(bulbs.length * 3);
  bulbs.forEach((b, i) => { haloPos.set([b.p.x, b.p.y, b.p.z + 0.02], i * 3); });
  haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3));
  haloGeo.setAttribute('color', new THREE.BufferAttribute(haloCol, 3));
  const halos = new THREE.Points(haloGeo, new THREE.PointsMaterial({
    size: 0.42, map: glow(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  group.add(halos);

  // ---- picture lights: a warm wash on the wall above each painting, and a pool on the floor ----
  const wash = washTexture();
  const washes: THREE.MeshBasicMaterial[] = [];
  for (const p of paintings) {
    const g = p.mesh.geometry as THREE.PlaneGeometry;
    const w = g.parameters.width, h = g.parameters.height;
    const ry = Math.atan2(p.slot.face.x, p.slot.face.z);
    const mat = new THREE.MeshBasicMaterial({ map: wash, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.4 });
    washes.push(mat);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.25, h * 0.95), mat);
    plane.position.set(p.slot.x + p.slot.face.x * 0.05, p.slot.y + h * 0.18, p.slot.z + p.slot.face.z * 0.05);
    plane.rotation.y = ry;
    plane.renderOrder = 2;
    group.add(plane);
    const pool = new THREE.Mesh(new THREE.CircleGeometry(1, 24), new THREE.MeshBasicMaterial({
      map: glow(), color: 0xffd7a0, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.16,
    }));
    washes.push(pool.material as THREE.MeshBasicMaterial);
    pool.rotation.x = -Math.PI / 2;
    pool.scale.set(w * 0.7, 0.9, 1);
    pool.rotation.z = -ry;
    pool.position.set(p.slot.x + p.slot.face.x * 0.9, 0.013, p.slot.z + p.slot.face.z * 0.9);
    pool.renderOrder = 1;
    group.add(pool);
  }

  // ---- standing tables with a candle ----
  const M = {
    top: new THREE.MeshStandardMaterial({ color: 0xf1e7d3, roughness: 0.6 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xb48c4c, metalness: 0.7, roughness: 0.35 }),
    wax: new THREE.MeshStandardMaterial({ color: 0xf6eedd, roughness: 0.8 }),
    pot: new THREE.MeshStandardMaterial({ color: 0x2c3a33, roughness: 0.55 }),
    leaf: new THREE.MeshStandardMaterial({ color: 0x3f6b46, roughness: 0.8, flatShading: true }),
    leaf2: new THREE.MeshStandardMaterial({ color: 0x5b8a54, roughness: 0.8, flatShading: true }),
  };
  const flames: { flame: THREE.Mesh; halo: THREE.Sprite; phase: number }[] = [];
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb347 });
  const tableTop = new THREE.CylinderGeometry(0.32, 0.32, 0.04, 20);
  const pole = new THREE.CylinderGeometry(0.03, 0.03, 1.02, 8);
  const foot = new THREE.CylinderGeometry(0.22, 0.25, 0.03, 16);
  const candle = new THREE.CylinderGeometry(0.035, 0.035, 0.14, 10);
  const flameGeo = new THREE.ConeGeometry(0.022, 0.07, 8);
  for (const tb of TABLES) {
    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, y: number) => {
      const m = new THREE.Mesh(geo, mat); m.position.set(tb.x, y, tb.z); group.add(m); return m;
    };
    add(foot, M.brass, 0.015);
    add(pole, M.brass, 0.53);
    add(tableTop, M.top, 1.06);
    add(candle, M.wax, 1.15);
    const flame = add(flameGeo, flameMat, 1.26);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow(), color: 0xffb066, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.position.set(tb.x, 1.26, tb.z);
    halo.scale.setScalar(0.5);
    group.add(halo);
    flames.push({ flame, halo, phase: Math.random() * 10 });
  }

  // ---- potted plants ----
  const potGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.42, 12);
  const bush = new THREE.IcosahedronGeometry(0.3, 0);
  for (const pl of PLANTS) {
    const pot = new THREE.Mesh(potGeo, M.pot); pot.position.set(pl.x, 0.21, pl.z); group.add(pot);
    const blobs: [number, number, number, number, THREE.Material][] = [
      [0, 0.72, 0, 1.0, M.leaf], [-0.12, 1.02, 0.05, 0.8, M.leaf2], [0.13, 0.95, -0.06, 0.75, M.leaf], [0.02, 1.28, 0, 0.6, M.leaf2],
    ];
    for (const [dx, y, dz, s, mat] of blobs) {
      const b = new THREE.Mesh(bush, mat); b.position.set(pl.x + dx, y, pl.z + dz); b.scale.setScalar(s);
      b.rotation.set(Math.random() * 3, Math.random() * 3, 0); group.add(b);
    }
  }

  // ---- dust drifting through the light ----
  const N = matchMedia('(pointer: coarse)').matches ? 160 : 280;
  const dustPos = new Float32Array(N * 3), seeds = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    seeds.set([Math.random() * WORLD.x1, 0.4 + Math.random() * 3.4, WORLD.z0 + 0.3 + Math.random() * 8.5], i * 3);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    size: 0.05, map: glow(), color: 0xffe6b8, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  group.add(dust);

  const tmp = new THREE.Color();
  return {
    setNight(n: number) {
      night = n;
      for (const m of washes) m.opacity = (m.map === wash ? 0.28 : 0.1) + n * (m.map === wash ? 0.32 : 0.14);
      dustMat.opacity = 0.35 + 0.35 * n;
    },
    tick(dt: number) {
      t += dt;
      // twinkle: each bulb breathes at its own pace; brighter at night
      const base = 0.55 + 0.45 * night;
      bulbs.forEach((b, i) => {
        const k = base * (0.75 + 0.25 * Math.sin(t * b.speed + b.phase));
        tmp.copy(b.c).multiplyScalar(0.6 + 0.6 * k);
        bulbMesh.setColorAt(i, tmp);
        haloCol[i * 3] = b.c.r * k * 0.55; haloCol[i * 3 + 1] = b.c.g * k * 0.45; haloCol[i * 3 + 2] = b.c.b * k * 0.35;
      });
      bulbMesh.instanceColor!.needsUpdate = true;
      haloGeo.attributes.color.needsUpdate = true;
      // candles flicker
      for (const f of flames) {
        const fl = 0.85 + 0.15 * Math.sin(t * 13 + f.phase) * Math.sin(t * 7.3 + f.phase * 2);
        f.flame.scale.set(1, fl, 1);
        f.halo.scale.setScalar((0.42 + 0.25 * night) * fl);
      }
      // dust drifts slowly in small loops
      for (let i = 0; i < N; i++) {
        const sx = seeds[i * 3], sy = seeds[i * 3 + 1], sz = seeds[i * 3 + 2];
        dustPos[i * 3] = sx + Math.sin(t * 0.13 + i) * 0.6;
        dustPos[i * 3 + 1] = sy + Math.sin(t * 0.21 + i * 1.7) * 0.25;
        dustPos[i * 3 + 2] = sz + Math.cos(t * 0.11 + i * 0.7) * 0.5;
      }
      dustGeo.attributes.position.needsUpdate = true;
    },
  };
}
