import * as THREE from 'three';
import { canvasTexture } from './textures';
import { glow } from './decor';
import type { Furniture, Rect } from '@party/shared';

/**
 * Small building blocks shared by the home and pool parties: string lights,
 * flickering flames, plants, simple procedural textures. All cheap — instanced
 * bulbs, additive sprites — so twenty guests still run on a phone.
 */

export const rnd = (a: number, b: number) => a + Math.random() * (b - a);
export const std = (color: THREE.ColorRepresentation, o: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.8, ...o });

/** Helpers bound to one group: add a mesh, a box, a box filling a floor rect. */
export function builder(group: THREE.Group) {
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, ry = 0) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.y = ry; group.add(m); return m;
  };
  const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) =>
    add(new THREE.BoxGeometry(w, h, d), mat, x, y, z);
  /** A block standing on the floor over a map rect (so drawings match the shared obstacles). */
  const block = (r: Rect, h: number, mat: THREE.Material, y0 = 0, inset = 0) =>
    box(r.x1 - r.x0 - inset * 2, h, r.z1 - r.z0 - inset * 2, mat, (r.x0 + r.x1) / 2, y0 + h / 2, (r.z0 + r.z1) / 2);
  const cyl = (rt: number, rb: number, h: number, mat: THREE.Material, x: number, y: number, z: number, seg = 14) =>
    add(new THREE.CylinderGeometry(rt, rb, h, seg), mat, x, y, z);
  return { add, box, block, cyl };
}

const BULB_COLORS = ['#ffd9a0', '#ffe8c4', '#ffb88a', '#ffc6d0', '#fff1d6'].map(c => new THREE.Color(c));

/** Strands of party bulbs that twinkle, brighter at night. */
export function stringLights(group: THREE.Group, palette = BULB_COLORS) {
  const bulbs: { p: THREE.Vector3; c: THREE.Color; phase: number; speed: number }[] = [];
  const runs: THREE.Vector3[][] = [];
  let bulbMesh: THREE.InstancedMesh | null = null;
  let haloGeo: THREE.BufferGeometry | null = null;
  let haloCol = new Float32Array(0);
  const tmp = new THREE.Color();
  return {
    /** A strand from `from` to `to`, a bulb every `step`, sagging `sag` between hooks every `span`. */
    strand(from: THREE.Vector3, to: THREE.Vector3, step: number, span: number, sag: number) {
      const len = from.distanceTo(to), n = Math.max(1, Math.round(len / step)), run: THREE.Vector3[] = [];
      for (let k = 0; k <= n; k++) {
        const p = from.clone().lerp(to, k / n);
        const u = ((k * len / n) % span) / span;
        p.y -= sag * 4 * u * (1 - u);
        run.push(p);
        bulbs.push({ p: p.clone().add(new THREE.Vector3(0, -0.03, 0)), c: palette[bulbs.length % palette.length].clone(), phase: rnd(0, 7), speed: rnd(0.6, 2) });
      }
      runs.push(run);
    },
    /** Call once after all strands are added. */
    done() {
      bulbMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.04, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }), bulbs.length);
      const m4 = new THREE.Matrix4();
      bulbs.forEach((b, i) => { m4.makeTranslation(b.p.x, b.p.y, b.p.z); bulbMesh!.setMatrixAt(i, m4); bulbMesh!.setColorAt(i, b.c); });
      group.add(bulbMesh);
      const wire = new THREE.LineBasicMaterial({ color: 0x2a1d16 });
      for (const run of runs) group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(run), wire));
      haloGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(bulbs.length * 3); haloCol = new Float32Array(bulbs.length * 3);
      bulbs.forEach((b, i) => pos.set([b.p.x, b.p.y, b.p.z + 0.02], i * 3));
      haloGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      haloGeo.setAttribute('color', new THREE.BufferAttribute(haloCol, 3));
      group.add(new THREE.Points(haloGeo, new THREE.PointsMaterial({
        size: 0.5, map: glow(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      })));
    },
    tick(t: number, night: number) {
      if (!bulbMesh || !haloGeo) return;
      const base = 0.45 + 0.55 * night;
      bulbs.forEach((b, i) => {
        const k = base * (0.75 + 0.25 * Math.sin(t * b.speed + b.phase));
        tmp.copy(b.c).multiplyScalar(0.55 + 0.65 * k);
        bulbMesh!.setColorAt(i, tmp);
        haloCol[i * 3] = b.c.r * k * 0.55; haloCol[i * 3 + 1] = b.c.g * k * 0.45; haloCol[i * 3 + 2] = b.c.b * k * 0.35;
      });
      bulbMesh.instanceColor!.needsUpdate = true;
      haloGeo.attributes.color.needsUpdate = true;
    },
  };
}

/** A flickering flame with a soft halo (candles, a fireplace, a bonfire, tiki torches). */
export function flames(group: THREE.Group) {
  const list: { flame: THREE.Mesh; halo: THREE.Sprite; phase: number; size: number; base: number }[] = [];
  const mat = new THREE.MeshBasicMaterial({ color: 0xffb347 });
  const core = new THREE.MeshBasicMaterial({ color: 0xfff1b0 });
  return {
    add(x: number, y: number, z: number, size = 1, halo = 0xffa24a) {
      const f = new THREE.Group(); f.position.set(x, y, z); group.add(f);
      const outer = new THREE.Mesh(new THREE.ConeGeometry(0.022 * size, 0.08 * size, 8), mat); outer.position.y = 0.04 * size;
      const inner = new THREE.Mesh(new THREE.ConeGeometry(0.011 * size, 0.045 * size, 6), core); inner.position.y = 0.025 * size;
      f.add(outer, inner);
      const h = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow(), color: halo, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      h.position.set(x, y + 0.04 * size, z); group.add(h);
      list.push({ flame: f as unknown as THREE.Mesh, halo: h, phase: rnd(0, 10), size, base: 0.5 * Math.sqrt(size) });
    },
    tick(t: number, night: number) {
      for (const f of list) {
        const fl = 0.82 + 0.18 * Math.sin(t * 13 + f.phase) * Math.sin(t * 7.3 + f.phase * 2);
        f.flame.scale.set(1, fl, 1);
        f.halo.scale.setScalar((f.base * 0.8 + f.base * 0.6 * night) * fl);
      }
    },
  };
}

/** A potted leafy plant standing on a map spot. */
export function pottedPlant(group: THREE.Group, p: Furniture, pot = 0x2c3a33, scale = 1) {
  const potM = std(pot, { roughness: 0.55 });
  const leaf = std(0x3f6b46, { flatShading: true }), leaf2 = std(0x5b8a54, { flatShading: true });
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.24 * scale, 0.18 * scale, 0.42 * scale, 12), potM);
  m.position.set(p.x, 0.21 * scale, p.z); group.add(m);
  const bush = new THREE.IcosahedronGeometry(0.3 * scale, 0);
  for (const [dx, y, dz, s, mat] of [[0, 0.72, 0, 1, leaf], [-0.12, 1.02, 0.05, 0.8, leaf2], [0.13, 0.95, -0.06, 0.75, leaf], [0.02, 1.28, 0, 0.6, leaf2]] as const) {
    const b = new THREE.Mesh(bush, mat); b.position.set(p.x + dx * scale, y * scale, p.z + dz * scale); b.scale.setScalar(s);
    b.rotation.set(rnd(0, 3), rnd(0, 3), 0); group.add(b);
  }
}

/** Wooden planks running along x. One tile = 2m. */
export function planks(base: string, rows = 8, gap = 'rgba(0,0,0,.35)') {
  return canvasTexture(256, 256, (x, w, h) => {
    const c = new THREE.Color(base);
    for (let r = 0; r < rows; r++) {
      let px = -Math.random() * w * 0.5;
      while (px < w) {
        const len = rnd(w * 0.35, w * 0.7);
        const k = rnd(0.82, 1.12);
        x.fillStyle = '#' + c.clone().multiplyScalar(k).getHexString();
        x.fillRect(px, (r * h) / rows, len, h / rows);
        x.fillStyle = gap; x.fillRect(px, (r * h) / rows, 2, h / rows);
        px += len;
      }
      x.fillStyle = gap; x.fillRect(0, (r * h) / rows, w, 1.5);
    }
    // grain
    x.globalAlpha = 0.08;
    for (let i = 0; i < 260; i++) { x.fillStyle = Math.random() < 0.5 ? '#000' : '#fff'; x.fillRect(rnd(0, w), rnd(0, h), rnd(8, 40), 1); }
    x.globalAlpha = 1;
  }, [1, 1]);
}

/** Square tiles (checkerboard when two colours are given). */
export function tiles(a: string, b: string, n = 4, grout = 'rgba(40,30,25,.5)') {
  return canvasTexture(256, 256, (x, w, h) => {
    const s = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const c = new THREE.Color((i + j) % 2 ? b : a).multiplyScalar(rnd(0.94, 1.04));
      x.fillStyle = '#' + c.getHexString(); x.fillRect(i * s, j * s, s, s);
    }
    x.strokeStyle = grout; x.lineWidth = 2;
    for (let i = 0; i <= n; i++) { x.beginPath(); x.moveTo(i * s, 0); x.lineTo(i * s, h); x.stroke(); x.beginPath(); x.moveTo(0, i * s); x.lineTo(w, i * s); x.stroke(); }
  }, [1, 1]);
}

/** A row of little triangular party flags hanging between two points. */
export function bunting(group: THREE.Group, from: THREE.Vector3, to: THREE.Vector3, colors = ['#e85d75', '#f0c75e', '#6fb3c8', '#8fb8a0', '#f29e6b']) {
  const n = Math.max(2, Math.round(from.distanceTo(to) / 0.32));
  const tri = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.11, 0, 0), new THREE.Vector3(0.11, 0, 0), new THREE.Vector3(0, -0.24, 0)]);
  tri.computeVertexNormals();
  const mats = colors.map(c => new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
  const pts: THREE.Vector3[] = [];
  for (let k = 0; k <= n; k++) {
    const u = k / n;
    const p = from.clone().lerp(to, u); p.y -= 0.35 * 4 * u * (1 - u);
    pts.push(p);
    if (k < n) {
      const f = new THREE.Mesh(tri, mats[k % mats.length]);
      const q = from.clone().lerp(to, (k + 0.5) / n); q.y -= 0.35 * 4 * ((k + 0.5) / n) * (1 - (k + 0.5) / n);
      f.position.copy(q);
      f.lookAt(q.clone().add(new THREE.Vector3(0, 0, 1)));
      group.add(f);
    }
  }
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x3a2a20 })));
}

/** City lights on a transparent canvas: building silhouettes with lit windows (more at night). */
export function skylineTexture() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const towers: { x: number; w: number; h: number; win: { x: number; y: number; on: number }[] }[] = [];
  for (let x = 0; x < 1024;) {
    const w = rnd(40, 110), h = rnd(70, 230), win: { x: number; y: number; on: number }[] = [];
    for (let wy = 256 - h + 10; wy < 246; wy += 14) for (let wx = x + 8; wx < x + w - 8; wx += 12) win.push({ x: wx, y: wy, on: Math.random() });
    towers.push({ x, w, h, win }); x += w + rnd(2, 14);
  }
  const paint = (night: number) => {
    const g = c.getContext('2d')!;
    g.clearRect(0, 0, 1024, 256);
    const body = new THREE.Color('#2a2f45').lerp(new THREE.Color('#0d0f1c'), night);
    for (const t of towers) {
      g.fillStyle = '#' + body.getHexString(); g.fillRect(t.x, 256 - t.h, t.w, t.h);
      for (const wn of t.win) if (wn.on < 0.15 + 0.5 * night) { g.fillStyle = wn.on < 0.08 ? '#ffe9b0' : '#f6c978'; g.globalAlpha = 0.35 + 0.6 * night; g.fillRect(wn.x, wn.y, 5, 7); }
      g.globalAlpha = 1;
    }
    tex.needsUpdate = true;
  };
  paint(0);
  return { texture: tex, canvas: c, paint };
}
