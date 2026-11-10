import * as THREE from 'three';
import { BAR, BENCHES, DOOR_HALF, PARTITIONS, ROOM_D, ROOM_IDS, ROOM_W, WORLD, type RoomId } from '@party/shared';
import { ART, ROOM_INFO, slotsFor, wallSrc, type Artwork, type Slot } from './art';
import { fabric, parquet, runner, textPlate } from './textures';
import { SkyPainter, skyAt, type SkyState } from './sky';
import { buildDecor } from './decor';

const H = 4.2;      // full wall height
const LOW = 1.0;    // cut-away wall height near the camera
const BACK_Z = WORLD.z0;

export interface Painting { art: Artwork; slot: Slot; mesh: THREE.Mesh; stand: { x: number; z: number } }

export interface Gallery {
  paintings: Painting[];
  floor: THREE.Mesh;
  setTime(date: Date): SkyState;
  /** Animate the party lights, candles and dust. */
  tick(dt: number): void;
  /** Fade the beams over the doorways when the camera is right behind one, so they never block your view. */
  fadeOccluders(camera: THREE.Vector3): void;
  /** Load the painting images (call once the first frame is up). */
  loadArt(onProgress?: (done: number, total: number) => void): Promise<void>;
}

export function buildGallery(scene: THREE.Scene, renderer: THREE.WebGLRenderer): Gallery {
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const M = {
    floor: new THREE.MeshStandardMaterial({ map: parquet(), roughness: 0.55 }),
    walnut: new THREE.MeshStandardMaterial({ color: 0x3b2416, roughness: 0.55 }),
    cream: new THREE.MeshStandardMaterial({ color: 0xe9dfca, roughness: 0.7 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xc9a25e, metalness: 0.75, roughness: 0.35 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xb48c4c, metalness: 0.6, roughness: 0.4 }),
    marble: new THREE.MeshStandardMaterial({ color: 0xece6db, roughness: 0.3 }),
    velvet: new THREE.MeshStandardMaterial({ color: 0x4a1e2a, roughness: 0.95 }),
    runner: new THREE.MeshStandardMaterial({ map: runner(), roughness: 0.95 }),
  };
  (M.floor.map as THREE.Texture).repeat.set(WORLD.x1 / 2, ROOM_D / 2);
  (M.floor.map as THREE.Texture).anisotropy = Math.min(8, maxAniso);

  const group = new THREE.Group();
  scene.add(group);
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, ry = 0) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.y = ry; group.add(m); return m;
  };
  const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) =>
    add(new THREE.BoxGeometry(w, h, d), mat, x, y, z);

  // ---- floor + runner carpet through the doorways ----
  const floor = add(new THREE.PlaneGeometry(WORLD.x1, ROOM_D), M.floor, WORLD.x1 / 2, 0, 0);
  floor.rotation.x = -Math.PI / 2;
  floor.name = 'floor';
  const run = add(new THREE.PlaneGeometry(WORLD.x1 - 1, 1.6), M.runner, WORLD.x1 / 2, 0.005, 0.2);
  run.rotation.x = -Math.PI / 2;
  (M.runner.map as THREE.Texture).wrapS = THREE.RepeatWrapping;
  (M.runner.map as THREE.Texture).repeat.set(12, 1);
  // the gallery sits on a dark stage in front; behind the back wall you see the sky
  const stage = add(new THREE.PlaneGeometry(400, 200), new THREE.MeshBasicMaterial({ color: 0x1a1214 }), WORLD.x1 / 2, -0.3, WORLD.z1 + 100);
  stage.rotation.x = -Math.PI / 2;
  // a dark plinth around the open front edge so the diorama reads as a cut-away
  box(WORLD.x1 + 0.4, 0.3, 0.3, M.walnut, WORLD.x1 / 2, -0.12, WORLD.z1 + 0.15);

  // ---- walls ----
  const wallMat = ROOM_IDS.map(id => new THREE.MeshStandardMaterial({ map: fabric(ROOM_INFO[id].color), roughness: 0.92 }));
  ROOM_IDS.forEach((id, r) => {
    const x0 = r * ROOM_W, cx = x0 + ROOM_W / 2;
    const mat = wallMat[r];
    (mat.map as THREE.Texture).repeat.set(ROOM_W / 1.6, H / 1.6);
    const wall = add(new THREE.PlaneGeometry(ROOM_W, H), mat, cx, H / 2, BACK_Z);
    wall.receiveShadow = false;
    // wainscot, rail and cornice along the back wall
    box(ROOM_W, 1.0, 0.05, M.walnut, cx, 0.5, BACK_Z + 0.03);
    box(ROOM_W, 0.06, 0.1, M.gold, cx, 1.02, BACK_Z + 0.05);
    box(ROOM_W, 0.22, 0.2, M.cream, cx, H - 0.11, BACK_Z + 0.1);
    void id;
  });

  const lintels: { x: number; mats: THREE.MeshStandardMaterial[] }[] = [];
  // Partitions and end walls: tall at the back, low toward the camera, open doorway in the middle.
  const sideWall = (x: number, leftRoom: number, rightRoom: number, door: boolean) => {
    const backLen = door ? ROOM_D / 2 - DOOR_HALF : ROOM_D / 2 + 1.5;
    const backMid = BACK_Z + backLen / 2;
    const frontStart = door ? DOOR_HALF : 1.5;
    const frontLen = WORLD.z1 - frontStart;
    const frontMid = frontStart + frontLen / 2;
    const tall = (len: number, mid: number, mat: THREE.Material, face: 1 | -1) => {
      const p = add(new THREE.PlaneGeometry(len, H), mat, x + face * 0.065, H / 2, mid, face * Math.PI / 2);
      return p;
    };
    if (rightRoom >= 0) tall(backLen, backMid, wallMat[rightRoom], 1);
    if (leftRoom >= 0) tall(backLen, backMid, wallMat[leftRoom], -1);
    box(0.12, H, backLen, M.cream, x, H / 2, backMid).scale.set(1, 1, 1);
    // low front half-wall with a gilt cap
    box(0.14, LOW, frontLen, M.walnut, x, LOW / 2, frontMid);
    box(0.2, 0.05, frontLen, M.gold, x, LOW + 0.025, frontMid);
    if (door) {
      // lintel over the doorway (own materials, so it can fade on its own)
      const cream = M.cream.clone(), gold = M.gold.clone();
      cream.transparent = gold.transparent = true;
      box(0.16, 0.5, DOOR_HALF * 2 + 0.2, cream, x, H - 0.25, 0);
      box(0.2, 0.06, DOOR_HALF * 2 + 0.2, gold, x, H - 0.53, 0);
      lintels.push({ x, mats: [cream, gold] });
    }
  };
  sideWall(0, -1, 0, false);
  PARTITIONS.forEach((x, i) => sideWall(x, i, i + 1, true));
  sideWall(WORLD.x1, ROOM_IDS.length - 1, -1, false);

  // ---- room names above each doorway / on the back wall ----
  ROOM_IDS.forEach((id, r) => {
    if (id === 'lobby') return;
    const tex = textPlate([{ text: ROOM_INFO[id].name, font: '600 54px "Gowun Batang", serif', color: '#efe2c4', y: 64 }], 512, 128);
    const m = add(new THREE.PlaneGeometry(2.4, 0.6), new THREE.MeshBasicMaterial({ map: tex, transparent: true }), r * ROOM_W + 6, 3.62, BACK_Z + 0.08);
    m.renderOrder = 1;
  });

  // ---- lobby: title wall, window, wine bar ----
  {
    const title = textPlate([
      { text: '액자 밖으로', font: '700 120px "Gowun Batang", serif', color: '#f1e2bd', y: 150 },
      { text: '정유진 개인전 오프닝 파티', font: '500 44px "IBM Plex Sans KR", sans-serif', color: '#d8bf8f', y: 260 },
    ], 1024, 340);
    add(new THREE.PlaneGeometry(4.6, 1.53), new THREE.MeshBasicMaterial({ map: title, transparent: true }), 0.08, 2.75, -2.2, Math.PI / 2);
  }
  const sky = new SkyPainter();
  {
    // tall arched window behind the bar: shows the visitor's own local sky
    const wx = 6, wy = 2.45, ww = 3.6, wh = 2.6;
    add(new THREE.PlaneGeometry(ww, wh), new THREE.MeshBasicMaterial({ map: sky.texture }), wx, wy, BACK_Z + 0.04);
    box(ww + 0.24, 0.12, 0.1, M.gold, wx, wy - wh / 2, BACK_Z + 0.08);
    box(ww + 0.24, 0.12, 0.1, M.gold, wx, wy + wh / 2, BACK_Z + 0.08);
    box(0.12, wh, 0.1, M.gold, wx - ww / 2, wy, BACK_Z + 0.08);
    box(0.12, wh, 0.1, M.gold, wx + ww / 2, wy, BACK_Z + 0.08);
    box(0.05, wh, 0.06, M.walnut, wx, wy, BACK_Z + 0.07);
    box(ww, 0.05, 0.06, M.walnut, wx, wy + 0.3, BACK_Z + 0.07);
    // bar counter (matches the shared obstacle)
    const bar = BAR;
    const bw = bar.x1 - bar.x0, bd = bar.z1 - bar.z0, bcx = (bar.x0 + bar.x1) / 2, bcz = (bar.z0 + bar.z1) / 2;
    box(bw, 1.05, bd, M.walnut, bcx, 0.525, bcz);
    box(bw + 0.1, 0.06, bd + 0.1, M.marble, bcx, 1.08, bcz);
    box(bw, 0.05, 0.02, M.gold, bcx, 0.3, bar.z1 + 0.01);
    const bottle = new THREE.CylinderGeometry(0.06, 0.07, 0.34, 8);
    const neck = new THREE.CylinderGeometry(0.022, 0.03, 0.12, 6);
    const bottleMats = [0x2f4a2a, 0x5a1622, 0x3a2a14].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.2, metalness: 0.1 }));
    for (let i = 0; i < 7; i++) {
      const x = bar.x0 + 0.5 + i * 0.75, m = bottleMats[i % 3];
      add(bottle, m, x, 1.28, bcz - 0.15);
      add(neck, m, x, 1.51, bcz - 0.15);
    }
    const glass = new THREE.ConeGeometry(0.06, 0.1, 8, 1, true);
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xdfe8ec, transparent: true, opacity: 0.45, roughness: 0.05, side: THREE.DoubleSide });
    for (let i = 0; i < 8; i++) {
      const g = add(glass, glassMat, bar.x0 + 0.35 + i * 0.68, 1.2, bcz + 0.2);
      g.rotation.x = Math.PI;
    }
  }

  // ---- viewing benches (match shared obstacles) ----
  for (const o of BENCHES) {
    const w = o.x1 - o.x0, d = o.z1 - o.z0;
    box(w, 0.42, d, M.velvet, (o.x0 + o.x1) / 2, 0.21, (o.z0 + o.z1) / 2);
    for (const sx of [-1, 1]) for (const sz of [-1, 1])
      box(0.08, 0.08, 0.08, M.brass, (o.x0 + o.x1) / 2 + sx * (w / 2 - 0.1), 0.04, (o.z0 + o.z1) / 2 + sz * (d / 2 - 0.08));
  }

  // ---- paintings ----
  const paintings: Painting[] = [];
  const canvasMats: THREE.MeshBasicMaterial[] = [];
  for (const id of ROOM_IDS) {
    const slots = slotsFor(id);
    const works = ART.filter(a => a.room === id);
    works.forEach((art, k) => {
      const slot = slots[k];
      if (!slot) return;
      const ar = art.w / art.h;
      let w = slot.maxW, h = w / ar;
      if (h > slot.maxH) { h = slot.maxH; w = h * ar; }
      const ry = Math.atan2(slot.face.x, slot.face.z);
      const frame = new THREE.Group();
      frame.position.set(slot.x, slot.y, slot.z);
      frame.rotation.y = ry;
      group.add(frame);
      const fw = 0.09;
      const fr = (gw: number, gh: number, x: number, y: number) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(gw, gh, 0.07), M.gold); m.position.set(x, y, 0.035); frame.add(m);
      };
      fr(w + fw * 2, fw, 0, h / 2 + fw / 2); fr(w + fw * 2, fw, 0, -h / 2 - fw / 2);
      fr(fw, h, -w / 2 - fw / 2, 0); fr(fw, h, w / 2 + fw / 2, 0);
      const mat = new THREE.MeshBasicMaterial({ color: 0x3a3430 });
      canvasMats.push(mat);
      const canvas = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
      canvas.position.z = 0.02;
      canvas.userData.art = art;
      frame.add(canvas);
      // picture light
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, Math.min(0.9, w * 0.5), 8), M.brass);
      lamp.rotation.z = Math.PI / 2; lamp.position.set(0, h / 2 + 0.22, 0.2); frame.add(lamp);
      // caption plate with the title
      const cap = textPlate([
        { text: art.title, font: '600 30px "Gowun Batang", serif', color: '#2a2024', y: 44 },
        { text: '정유진', font: '400 20px "IBM Plex Sans KR", sans-serif', color: '#6d5f57', y: 82 },
      ], 256, 112, '#f1e7d3');
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.18), new THREE.MeshBasicMaterial({ map: cap }));
      plate.position.set(w / 2 + 0.38, -h / 2 + 0.2, 0.02);
      frame.add(plate);
      const stand = { x: slot.x + slot.face.x * 1.6, z: slot.z + slot.face.z * 1.6 };
      paintings.push({ art, slot, mesh: canvas, stand });
    });
  }

  const decor = buildDecor(scene, paintings);

  // ---- lights ----
  const hemi = new THREE.HemisphereLight(0xfff3e0, 0x3a2a20, 1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 1);
  sun.position.set(-8, 14, 10);
  scene.add(sun);
  const warm = new THREE.AmbientLight(0xffd9a8, 0.35);
  scene.add(warm);

  const setTime = (date: Date) => {
    const s = skyAt(date);
    sky.paint(s);
    scene.background = s.top.clone().lerp(s.bottom, 0.35);
    hemi.intensity = s.hemi;
    sun.color.copy(s.sun);
    sun.intensity = s.sunI;
    // At night the gallery's own warm lamps take over.
    warm.intensity = 0.3 + 0.55 * s.night;
    for (const m of canvasMats) if (m.map) m.color.setScalar(0.92 + 0.08 * (1 - s.night));
    decor.setNight(s.night);
    return s;
  };

  const loadArt = async (onProgress?: (done: number, total: number) => void) => {
    const loader = new THREE.TextureLoader();
    let done = 0;
    await Promise.all(paintings.map(async (p, k) => {
      try {
        const tex = await loader.loadAsync(wallSrc(p.art));
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = Math.min(4, maxAniso);
        const mat = canvasMats[k];
        mat.map = tex; mat.color.setScalar(1); mat.needsUpdate = true;
      } catch { /* leave the dark placeholder */ }
      onProgress?.(++done, paintings.length);
    }));
  };

  const fadeOccluders = (cam: THREE.Vector3) => {
    for (const l of lintels) {
      // fully visible 3m+ to the side, almost gone when the camera is right behind it
      const o = Math.min(1, Math.max(0.06, (Math.abs(cam.x - l.x) - 0.6) / 2.4));
      for (const m of l.mats) { m.opacity = o; m.depthWrite = o > 0.95; }
    }
  };

  return { paintings, floor, setTime, loadArt, tick: (dt: number) => decor.tick(dt), fadeOccluders };
}

export const roomIndex = (id: RoomId) => ROOM_IDS.indexOf(id);
