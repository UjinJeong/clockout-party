import * as THREE from 'three';
import {
  MOVE_HZ, NEAR_RADIUS, WALK_SPEED, WORLD, isNear, moveWithCollision, roomAt,
  type Battery, type Emote, type RoomId,
} from '@party/shared';
import { buildAnimal, type AnimalRig } from '../avatar/animal';
import { Animator } from '../avatar/animator';
import type { NetPlayer, PartyConnection } from '../net/types';
import type { Gallery, Painting } from '../world/gallery';
import { Tag } from '../ui/bubbles';
import type { Controls } from './controls';
import { Sparkles } from './effects';

interface Guest {
  net: NetPlayer;
  rig: AnimalRig;
  anim: Animator;
  tag: Tag;
  pos: THREE.Vector2; // rendered position (smoothed for others, exact for self)
  dir: number;
  lookKey: string;
}

export interface PartyHooks {
  room(id: RoomId): void;
  painting(p: Painting | null): void;
  guests(list: { id: string; name: string; battery: Battery; near: boolean; self: boolean; muted: boolean }[]): void;
  arrived(p: Painting): void;
}

const CAM_OFFSET = new THREE.Vector3(0, 9.4, 11);

/**
 * Runs the party: owns every guest's avatar, moves you, follows you with the
 * camera, and turns network events into bubbles and gestures.
 */
export class Party {
  private guests = new Map<string, Guest>();
  private muted = new Set<string>();
  private sendT = 0;
  private lastSent = { x: 0, z: 0, dir: 0, moving: false };
  private room: RoomId | null = null;
  private painting: Painting | null = null;
  private walkTo: Painting | null = null;
  private ring: THREE.Mesh;
  private targetMark: THREE.Mesh;
  private zoom = 1;
  private camTarget = new THREE.Vector3();
  private ray = new THREE.Raycaster();
  private listDirty = true;
  private listT = 0;
  private disposed = false;
  private sparkles: Sparkles;

  constructor(
    private scene: THREE.Scene,
    private camera: THREE.PerspectiveCamera,
    private dom: HTMLCanvasElement,
    private gallery: Gallery,
    private conn: PartyConnection,
    private controls: Controls,
    private tagLayer: HTMLElement,
    private hooks: PartyHooks,
  ) {
    // hearing range: a faint gilt ring on the floor around you
    const ringGeo = new THREE.RingGeometry(NEAR_RADIUS - 0.04, NEAR_RADIUS, 64);
    this.ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xe0bd7a, transparent: true, opacity: 0.28, depthWrite: false }));
    this.ring.rotation.x = -Math.PI / 2; this.ring.position.y = 0.015; this.ring.renderOrder = 3;
    scene.add(this.ring);
    this.targetMark = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.24, 24),
      new THREE.MeshBasicMaterial({ color: 0xf1e2bd, transparent: true, opacity: 0.8, depthWrite: false }));
    this.targetMark.rotation.x = -Math.PI / 2; this.targetMark.position.y = 0.02; this.targetMark.visible = false;
    scene.add(this.targetMark);
    this.sparkles = new Sparkles(scene);

    conn.on({
      add: p => this.addGuest(p),
      change: p => this.updateGuest(p),
      remove: id => this.removeGuest(id),
      chat: (from, text) => { if (!this.muted.has(from)) this.guests.get(from)?.tag.say(text); },
      emote: (from, kind) => { if (!this.muted.has(from)) this.playEmote(from, kind); },
      voice: (from, blob, ms) => { if (!this.muted.has(from)) this.guests.get(from)?.tag.voice(blob, ms, from === conn.selfId); },
      snap: (x, z) => { const me = this.self(); if (me) { me.pos.set(x, z); me.net.x = x; me.net.z = z; } },
    });

    dom.addEventListener('pointerup', this.onTap);
    dom.addEventListener('wheel', this.onWheel, { passive: true });
  }

  self() { return this.guests.get(this.conn.selfId); }

  mute(id: string, on: boolean) { if (on) this.muted.add(id); else this.muted.delete(id); this.listDirty = true; }

  emote(kind: Emote) { this.conn.emote(kind); }

  /** Walk to a painting and tell the UI once we are standing in front of it. */
  goTo(p: Painting) { this.walkTo = p; this.controls.target = { ...p.stand }; }

  private addGuest(p: NetPlayer) {
    if (this.guests.has(p.id)) { this.updateGuest(p); return; }
    const rig = buildAnimal(p.look);
    rig.root.position.set(p.x, 0, p.z);
    rig.root.rotation.y = p.dir;
    this.scene.add(rig.root);
    const isSelf = p.id === this.conn.selfId;
    const tag = new Tag(this.tagLayer, p.name, isSelf);
    tag.setBattery(p.battery);
    this.guests.set(p.id, {
      net: { ...p }, rig, anim: new Animator(rig), tag, pos: new THREE.Vector2(p.x, p.z), dir: p.dir,
      lookKey: JSON.stringify(p.look),
    });
    if (isSelf) { this.camTarget.set(p.x, 0, p.z); this.snapCamera(); }
    this.listDirty = true;
  }

  private updateGuest(p: NetPlayer) {
    const g = this.guests.get(p.id);
    if (!g) { this.addGuest(p); return; }
    const isSelf = p.id === this.conn.selfId;
    // our own position is driven locally; only take the rest from the network
    if (isSelf) g.net = { ...p, x: g.net.x, z: g.net.z, dir: g.net.dir, moving: g.net.moving };
    else g.net = { ...p };
    g.tag.setName(p.name);
    g.tag.setBattery(p.battery);
    const key = JSON.stringify(p.look);
    if (key !== g.lookKey) {
      const rig = buildAnimal(p.look);
      rig.root.position.copy(g.rig.root.position); rig.root.rotation.y = g.rig.root.rotation.y;
      g.rig.dispose(); this.scene.add(rig.root);
      g.rig = rig; g.anim = new Animator(rig); g.lookKey = key;
    }
    this.listDirty = true;
  }

  private removeGuest(id: string) {
    const g = this.guests.get(id);
    if (!g) return;
    g.rig.dispose(); g.tag.dispose();
    this.guests.delete(id);
    this.listDirty = true;
  }

  private playEmote(from: string, kind: Emote) {
    const g = this.guests.get(from);
    if (!g) return;
    g.anim.play(kind);
    g.tag.emote(kind);
    // a little burst of light in the room, from the raised glass or above the head
    if (kind === 'cheers' || kind === 'heart' || kind === 'clap') {
      const at = new THREE.Vector3(g.pos.x, 1.75, g.pos.y);
      const delay = kind === 'cheers' ? 520 : 200; // when the arm is at its highest
      setTimeout(() => {
        if (this.disposed) return;
        if (kind === 'cheers' && g.rig.held) g.rig.held.getWorldPosition(at).add(new THREE.Vector3(0, 0.18, 0));
        this.sparkles.burst(at, kind === 'heart' ? ['#ff8fb1', '#ffc2d4', '#ff5d8f'] : ['#ffd27a', '#fff1c4', '#f0b04a'], kind === 'clap' ? 18 : 40);
      }, delay);
    }
  }

  private onTap = (e: PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const r = this.dom.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.ray.setFromCamera(ndc, this.camera);
    const paintingHit = this.ray.intersectObjects(this.gallery.paintings.map(p => p.mesh), false)[0];
    if (paintingHit) {
      const p = this.gallery.paintings.find(q => q.mesh === paintingHit.object);
      if (p) { this.goTo(p); return; }
    }
    const hit = this.ray.intersectObject(this.gallery.floor, false)[0];
    if (hit) {
      this.walkTo = null;
      this.controls.target = { x: hit.point.x, z: hit.point.z };
      this.targetMark.position.set(hit.point.x, 0.02, hit.point.z);
      this.targetMark.visible = true;
    }
  };

  private onWheel = (e: WheelEvent) => {
    this.zoom = Math.min(1.45, Math.max(0.65, this.zoom * (e.deltaY > 0 ? 1.08 : 0.93)));
  };

  private snapCamera() {
    const off = CAM_OFFSET.clone().multiplyScalar(this.zoomFactor());
    this.camera.position.copy(this.camTarget).add(off);
    this.camera.lookAt(this.camTarget.x, 0.6, this.camTarget.z - 0.6);
  }

  private zoomFactor() {
    // Portrait phones see much less width: widen the lens and pull back so
    // roughly the same slice of the room fits across the screen.
    const aspect = this.dom.clientWidth / Math.max(1, this.dom.clientHeight);
    const fov = aspect < 1 ? Math.min(62, 40 + (1 - aspect) * 40) : 40;
    if (Math.abs(this.camera.fov - fov) > 0.1) { this.camera.fov = fov; this.camera.updateProjectionMatrix(); }
    return this.zoom * (aspect < 1 ? 1.2 : 1);
  }

  update(dt: number) {
    if (this.disposed) return;
    const me = this.self();
    if (me) this.moveSelf(me, dt);

    for (const [id, g] of this.guests) {
      if (id !== this.conn.selfId) {
        // smooth toward the latest network position
        const k = 1 - Math.exp(-dt * 10);
        g.pos.x += (g.net.x - g.pos.x) * k;
        g.pos.y += (g.net.z - g.pos.y) * k;
        g.dir = turn(g.dir, g.net.dir, dt * 10);
      }
      g.rig.root.position.x = g.pos.x;
      g.rig.root.position.z = g.pos.y;
      g.rig.root.rotation.y = g.dir;
      const moving = id === this.conn.selfId ? g.net.moving : g.net.moving || Math.hypot(g.net.x - g.pos.x, g.net.z - g.pos.y) > 0.05;
      g.anim.update(dt, moving, g.net.battery);
    }

    // camera follows you
    if (me) {
      const tx = Math.min(WORLD.x1 - 4.5, Math.max(4.5, me.pos.x));
      const k = 1 - Math.exp(-dt * 4);
      this.camTarget.x += (tx - this.camTarget.x) * k;
      this.camTarget.z += (Math.max(-1.5, Math.min(1.5, me.pos.y * 0.5)) - this.camTarget.z) * k;
      this.snapCamera();
      this.ring.position.set(me.pos.x, 0.015, me.pos.y);
    }

    this.sparkles.tick(dt);
    this.placeTags();
    this.listT -= dt;
    if (this.listDirty || this.listT <= 0) this.emitList();
  }

  private moveSelf(me: Guest, dt: number) {
    let { x: dx, z: dz } = this.controls.direction();
    const tgt = this.controls.target;
    if (dx === 0 && dz === 0 && tgt) {
      const ox = tgt.x - me.pos.x, oz = tgt.z - me.pos.y, d = Math.hypot(ox, oz);
      if (d < 0.12) {
        this.controls.target = null;
        this.targetMark.visible = false;
        if (this.walkTo) {
          me.dir = Math.atan2(-this.walkTo.slot.face.x, -this.walkTo.slot.face.z);
          this.hooks.arrived(this.walkTo);
          this.walkTo = null;
        }
      } else { dx = ox / d; dz = oz / d; if (d < 0.5) { dx *= d / 0.5 + 0.3; dz *= d / 0.5 + 0.3; } }
    } else if (dx !== 0 || dz !== 0) {
      this.targetMark.visible = false;
      this.walkTo = null;
    }
    const moving = dx !== 0 || dz !== 0;
    if (moving) {
      const step = WALK_SPEED * dt;
      const next = moveWithCollision({ x: me.pos.x, z: me.pos.y }, { x: me.pos.x + dx * step, z: me.pos.y + dz * step });
      const moved = Math.hypot(next.x - me.pos.x, next.z - me.pos.y);
      if (moved < step * 0.1 && this.controls.target) { this.controls.target = null; this.targetMark.visible = false; this.walkTo = null; }
      me.pos.set(next.x, next.z);
      me.dir = turn(me.dir, Math.atan2(dx, dz), dt * 12);
    }
    me.net.x = me.pos.x; me.net.z = me.pos.y; me.net.dir = me.dir; me.net.moving = moving;

    // send at MOVE_HZ while moving, plus one final "stopped"
    this.sendT -= dt;
    const changed = moving !== this.lastSent.moving
      || Math.abs(me.pos.x - this.lastSent.x) > 0.01 || Math.abs(me.pos.y - this.lastSent.z) > 0.01;
    if (changed && this.sendT <= 0) {
      this.sendT = 1 / MOVE_HZ;
      this.conn.move(me.pos.x, me.pos.y, me.dir, moving);
      this.lastSent = { x: me.pos.x, z: me.pos.y, dir: me.dir, moving };
    }

    const room = roomAt(me.pos.x);
    if (room !== this.room) { this.room = room; this.hooks.room(room); }

    // the painting you are standing in front of
    let best: Painting | null = null, bestD = 2.3;
    for (const p of this.gallery.paintings) {
      const d = Math.hypot(p.stand.x - me.pos.x, p.stand.z - me.pos.y);
      if (d < bestD) { bestD = d; best = p; }
    }
    if (best !== this.painting) { this.painting = best; this.hooks.painting(best); }
  }

  private placeTags() {
    const w = this.dom.clientWidth, h = this.dom.clientHeight;
    const v = new THREE.Vector3();
    const me = this.self();
    const talking: { tag: Tag; x: number; y: number; bw: number; bh: number }[] = [];
    const plates: { l: number; r: number; t: number; b: number }[] = [];
    for (const [id, g] of this.guests) {
      v.set(g.pos.x, 1.85 + g.rig.root.position.y, g.pos.y).project(this.camera);
      const vis = v.z < 1 && v.x > -1.2 && v.x < 1.2 && v.y > -1.2 && v.y < 1.3;
      const sx = (v.x * 0.5 + 0.5) * w, sy = (-v.y * 0.5 + 0.5) * h;
      g.tag.place(sx, sy, vis, v.z);
      if (me && id !== this.conn.selfId) g.tag.setNear(isNear(me.net, g.net));
      if (vis) {
        plates.push({ l: sx - 45, r: sx + 45, t: sy - 22, b: sy });
        const box = g.tag.stackBox();
        if (box) talking.push({ tag: g.tag, x: sx, y: sy, bw: box.w, bh: box.h });
      }
    }
    // Keep speech bubbles from piling on top of each other: guests nearer the
    // camera (lower on screen) keep their spot, others lift above them.
    talking.sort((a, b) => b.y - a.y);
    const placed: { l: number; r: number; t: number; b: number }[] = [];
    for (const s of talking) {
      // other people's name plates count as obstacles too (but not your own plate)
      const others = plates.filter(p => Math.abs(p.b - s.y) > 1 || Math.abs((p.l + p.r) / 2 - s.x) > 1);
      let lift = 0;
      for (let pass = 0; pass < 6; pass++) {
        const bottom = s.y - 26 - lift, top = bottom - s.bh, l = s.x - s.bw / 2, r = s.x + s.bw / 2;
        const hit = placed.find(p => l < p.r && r > p.l && top < p.b && bottom > p.t)
          ?? others.find(p => l < p.r && r > p.l && top < p.b && bottom > p.t);
        if (!hit) break;
        lift += bottom - hit.t + 4;
      }
      s.tag.lift(lift);
      const bottom = s.y - 26 - lift;
      placed.push({ l: s.x - s.bw / 2, r: s.x + s.bw / 2, t: bottom - s.bh, b: bottom });
    }
  }

  private emitList() {
    this.listDirty = false; this.listT = 1;
    const me = this.self();
    this.hooks.guests([...this.guests.values()].map(g => ({
      id: g.net.id, name: g.net.name, battery: g.net.battery, self: g.net.id === this.conn.selfId,
      near: !!me && g.net.id !== me.net.id && isNear(me.net, g.net), muted: this.muted.has(g.net.id),
    })));
  }

  dispose() {
    this.disposed = true;
    this.dom.removeEventListener('pointerup', this.onTap);
    this.dom.removeEventListener('wheel', this.onWheel);
    for (const id of [...this.guests.keys()]) this.removeGuest(id);
    this.ring.removeFromParent(); this.targetMark.removeFromParent();
    this.sparkles.dispose();
  }
}

function turn(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * Math.min(1, k);
}
