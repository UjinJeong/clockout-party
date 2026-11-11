import * as THREE from 'three';
import { customColor, type Rect } from '@party/shared';
import { buildAnimal } from '../avatar/animal';
import { Animator } from '../avatar/animator';
import { glow } from './decor';
import { builder, std } from './kit';
import { textPlate } from './textures';

/**
 * 🎧 The DJ stage on the beach: the booth from the shared map, DJ 칼퇴 (a
 * penguin in headphones) behind it, a truss with moving-head lights, an LED
 * equaliser wall, thumping speakers and a light-up dance floor in front.
 * Everything moves to `beats` (beats since the music started), so it dances in
 * time with whatever the party is playing.
 */
export interface Stage {
  tick(dt: number, night: number, beats: number): void;
  /** Fireworks! Hands in the air. */
  cheer(): void;
}

const BEAM_COLORS = ['#ff5dd2', '#5dd8ff', '#ffe066', '#9dff9a'];
const FLOOR_COLORS = ['#ff5dd2', '#5dd8ff', '#ffe066', '#9dff9a', '#c49bff'].map(c => new THREE.Color(c));

export function buildStage(group: THREE.Group, booth: Rect, rightEdge: number): Stage {
  const { add, box, block, cyl } = builder(group);
  const cx = (booth.x0 + booth.x1) / 2, cz = (booth.z0 + booth.z1) / 2, w = booth.x1 - booth.x0;
  const black = std('#1d1a1c', { roughness: 0.5 });
  const steel = std('#5a5d64', { metalness: 0.6, roughness: 0.4 });

  // ---- the booth (exactly the map's obstacle) ----
  block(booth, 0.95, black);
  const front = box(w - 0.2, 0.5, 0.02, std('#2a1840', { emissive: 0x7a3cff, emissiveIntensity: 0.6 }), cx, 0.5, booth.z1 + 0.01);
  const decks: THREE.Mesh[] = [];
  for (const dx of [-0.8, 0.8]) {
    box(0.6, 0.05, 0.5, std('#3a3a3e'), cx + dx, 0.98, cz);
    const d = cyl(0.2, 0.2, 0.02, std('#111'), cx + dx, 1.02, cz, 20);
    const label = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.004, 12), std(dx < 0 ? '#ff5dd2' : '#5dd8ff')); label.position.y = 0.012; d.add(label);
    decks.push(d);
  }
  box(0.36, 0.04, 0.3, std('#b9bec4', { metalness: 0.5 }), cx, 1.0, cz + 0.08); // mixer
  for (let k = 0; k < 6; k++) cyl(0.015, 0.015, 0.03, std(BEAM_COLORS[k % 4], { emissive: BEAM_COLORS[k % 4], emissiveIntensity: 0.8 }), cx - 0.12 + (k % 3) * 0.12, 1.035, cz + 0.02 + Math.floor(k / 3) * 0.1, 8);

  // ---- speakers either side, cones that thump on the beat ----
  const cones: THREE.Mesh[] = [];
  for (const sx of [booth.x0 - 0.45, Math.min(booth.x1 + 0.35, rightEdge - 0.4)]) {
    box(0.62, 1.4, 0.55, black, sx, 0.7, cz);
    for (const [y, r] of [[0.42, 0.2], [1.02, 0.13]] as const) {
      const c = cyl(r, r * 0.6, 0.06, std('#2a2a2e', { roughness: 0.3 }), sx, y, cz + 0.29, 18); c.rotation.x = Math.PI / 2;
      cones.push(c);
    }
  }

  // ---- truss over the booth ----
  const tz = booth.z0 - 0.3, top = 3.25, tx0 = booth.x0 - 0.9, tx1 = Math.min(booth.x1 + 0.9, rightEdge - 0.1);
  for (const x of [tx0, tx1]) box(0.12, top, 0.12, steel, x, top / 2, tz);
  box(tx1 - tx0 + 0.12, 0.14, 0.14, steel, (tx0 + tx1) / 2, top, tz);
  box(tx1 - tx0 + 0.12, 0.05, 0.05, steel, (tx0 + tx1) / 2, top - 0.22, tz);
  const neon = textPlate([{ text: 'DJ 칼퇴', font: '800 60px "IBM Plex Sans KR", sans-serif', color: '#ff7ad9', y: 74 }], 320, 112);
  add(new THREE.PlaneGeometry(1.5, 0.52), new THREE.MeshBasicMaterial({ map: neon, transparent: true }), (tx0 + tx1) / 2, top + 0.4, tz + 0.05);

  // ---- LED equaliser wall behind the DJ ----
  const eq = document.createElement('canvas'); eq.width = 96; eq.height = 48;
  const eqTex = new THREE.CanvasTexture(eq); eqTex.colorSpace = THREE.SRGBColorSpace; eqTex.magFilter = THREE.NearestFilter;
  const screen = add(new THREE.PlaneGeometry(w - 0.1, 1.35), new THREE.MeshBasicMaterial({ map: eqTex, toneMapped: false }), cx, 1.95, tz - 0.12);
  box(w + 0.04, 1.47, 0.06, black, cx, 1.95, tz - 0.16);
  void screen;
  const bars = Array.from({ length: 12 }, (_, i) => ({ h: 0, phase: i * 0.7 }));

  // ---- moving heads and their beams ----
  const beamTex = (() => {
    const c = document.createElement('canvas'); c.width = 4; c.height = 64;
    const g = c.getContext('2d')!; const gr = g.createLinearGradient(0, 0, 0, 64);
    gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(0.6, 'rgba(255,255,255,0.25)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 4, 64);
    const t = new THREE.CanvasTexture(c); return t;
  })();
  const beamGeo = new THREE.ConeGeometry(0.9, 6, 20, 1, true);
  beamGeo.translate(0, -3, 0); // pivot at the tip, cone opens downward
  const heads: { pivot: THREE.Group; mat: THREE.MeshBasicMaterial; phase: number }[] = [];
  BEAM_COLORS.forEach((col, k) => {
    const x = tx0 + 0.45 + k * ((tx1 - tx0 - 0.9) / 3);
    const pivot = new THREE.Group(); pivot.position.set(x, top - 0.25, tz + 0.1); group.add(pivot);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.22, 10), black); body.position.y = -0.05; pivot.add(body);
    const mat = new THREE.MeshBasicMaterial({ color: col, map: beamTex, transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false });
    const beam = new THREE.Mesh(beamGeo, mat); pivot.add(beam);
    const lens = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow(), color: col, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    lens.scale.setScalar(0.45); lens.position.y = -0.18; pivot.add(lens);
    heads.push({ pivot, mat, phase: k * 1.7 });
  });

  // ---- dance floor: light-up tiles on the sand ----
  const tiles: { m: THREE.MeshBasicMaterial; i: number; j: number }[] = [];
  const TILE = 1.05, cols = 4, rows = 3, fx0 = cx - (cols * TILE) / 2, fz0 = booth.z1 + 0.55;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const m = new THREE.MeshBasicMaterial({ color: FLOOR_COLORS[(i + j) % FLOOR_COLORS.length], transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.AdditiveBlending });
    const t = add(new THREE.PlaneGeometry(TILE - 0.06, TILE - 0.06), m, fx0 + (i + 0.5) * TILE, 0.012, fz0 + (j + 0.5) * TILE);
    t.rotation.x = -Math.PI / 2;
    tiles.push({ m, i, j });
  }
  // frame around the floor
  for (const [w2, d2, x, z] of [[cols * TILE + 0.1, 0.06, cx, fz0], [cols * TILE + 0.1, 0.06, cx, fz0 + rows * TILE], [0.06, rows * TILE, fx0, fz0 + rows * TILE / 2], [0.06, rows * TILE, fx0 + cols * TILE, fz0 + rows * TILE / 2]] as const)
    box(w2, 0.03, d2, steel, x, 0.015, z);

  // ---- DJ 칼퇴 ----
  const dj = buildAnimal({ kind: 'penguin', color: customColor('#24324a'), hat: 'headphones', hand: 'none', outfit: 'none' });
  dj.root.position.set(cx, 0, booth.z0 - 0.12);
  group.add(dj.root);
  const anim = new Animator(dj);
  let cheerT = 0, t = 0, lastBar = -1;

  return {
    cheer() { cheerT = 2.2; anim.play('wow'); },
    tick(dt: number, night: number, beats: number) {
      t += dt;
      const ph = beats % 1, bar = Math.floor(beats / 4), kick = Math.exp(-ph * 6); // 1 on the beat, falling away
      // DJ: face and blink from the animator, then the moves on top
      anim.update(dt, { moving: false, energy: 100, pose: 'stand', dozing: false, baseY: Math.abs(Math.sin(beats * Math.PI)) * 0.05, mood: 'hyped' });
      dj.head.rotation.x += 0.18 * kick;                                  // nod on every beat
      dj.root.rotation.y = Math.sin(beats * Math.PI / 4) * 0.18;          // sway over two bars
      cheerT = Math.max(0, cheerT - dt);
      const handsUp = cheerT > 0 || bar % 8 === 7;                        // every eighth bar, and for fireworks
      if (handsUp) {
        dj.armL.rotation.set(0, 0, -2.5 + Math.sin(t * 9) * 0.15);
        dj.armR.rotation.set(0, 0, 2.5 - Math.sin(t * 9) * 0.15);
      } else {
        dj.armR.rotation.set(-1.25, 0, 0.35 + Math.sin(t * 14) * 0.18);  // scratching the right deck
        dj.armL.rotation.set(-1.0 - 0.25 * kick, 0, -0.35);              // left hand on the mixer
      }
      if (bar !== lastBar) { lastBar = bar; if (bar % 4 === 3 && !cheerT) anim.play(bar % 8 === 3 ? 'nod' : 'clap'); }
      for (const d of decks) d.rotation.y -= dt * 3.4;

      // speakers thump
      for (const c of cones) c.scale.set(1 + 0.12 * kick, 1, 1 + 0.12 * kick);
      (front.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.35 + 0.5 * kick;

      // beams sweep in pairs, brighter at night
      heads.forEach((h, k) => {
        const s = beats * Math.PI / 4 + h.phase;
        h.pivot.rotation.set(-0.55 + Math.sin(s) * 0.35, 0, (k < 2 ? 1 : -1) * (0.25 + Math.sin(s * 0.5) * 0.4));
        h.mat.opacity = (0.04 + 0.32 * night) * (0.75 + 0.25 * kick);
      });

      // dance floor patterns change every bar
      const pattern = bar % 4;
      for (const tile of tiles) {
        let on: number;
        if (pattern === 0) on = (tile.i + tile.j + Math.floor(beats)) % 2;                    // checkers
        else if (pattern === 1) on = Math.floor(beats * 2) % 4 === tile.i ? 1 : 0.15;          // a sweep left to right
        else if (pattern === 2) on = 0.5 + 0.5 * Math.sin(beats * Math.PI - tile.j * 1.2);     // waves toward you
        else on = ((tile.i * 7 + tile.j * 3 + Math.floor(beats)) % 5) < 2 ? 1 : 0.1;          // sparkle
        tile.m.color.copy(FLOOR_COLORS[(tile.i + tile.j + bar) % FLOOR_COLORS.length]);
        tile.m.opacity = (0.08 + 0.55 * night) * (0.25 + 0.75 * on) * (0.8 + 0.2 * kick);
      }

      // equaliser
      const g = eq.getContext('2d');
      if (g) {
        g.fillStyle = '#07040c'; g.fillRect(0, 0, eq.width, eq.height);
        const bw = eq.width / bars.length;
        bars.forEach((b, i) => {
          const target = 0.25 + 0.55 * Math.abs(Math.sin(beats * 1.3 + b.phase + i * 0.4)) * (0.5 + 0.5 * kick) + (i < 3 ? 0.25 * kick : 0);
          b.h += (target - b.h) * Math.min(1, dt * 12);
          const hpx = Math.round(b.h * eq.height);
          for (let y = 0; y < hpx; y += 4) {
            const u = y / eq.height;
            g.fillStyle = u > 0.75 ? '#ff5dd2' : u > 0.5 ? '#ffe066' : '#5dd8ff';
            g.fillRect(i * bw + 1, eq.height - y - 3, bw - 2, 3);
          }
        });
        eqTex.needsUpdate = true;
      }
    },
  };
}
