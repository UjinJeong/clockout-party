import * as THREE from 'three';
import {
  ENERGY, MOOD_ICON, MOOD_LABEL, MOVE_HZ, NEAR_RADIUS, WALK_SPEED, findPath, inWater, isNear, nearStage, moveWithCollision, nearSeat, roomAt,
  type Battery, type Emote, type MapRoom, type Mood, type Seat, type Vec2,
} from '@party/shared';
import { buildAnimal, type AnimalRig } from '../avatar/animal';
import { Animator } from '../avatar/animator';
import type { NetPlayer, PartyConnection } from '../net/types';
import type { Painting } from '../world/gallery';
import type { World } from '../world/world';
import { Tag } from '../ui/bubbles';
import type { Controls } from './controls';
import { Sparkles } from './effects';
import { cameraPose } from './camera';
import { canvasTexture } from '../world/textures';
import { ARRIVAL, Elevator } from './elevator';
import { sound } from '../audio/sound';

interface Guest {
  net: NetPlayer;
  rig: AnimalRig;
  anim: Animator;
  tag: Tag;
  pos: THREE.Vector2; // rendered position (smoothed for others, exact for self)
  dir: number;
  lookKey: string;
  /** 0 on dry land, 1 bobbing in the pool on a swim ring. */
  wet: number;
  floatie: THREE.Mesh | null;
  /** Little Z's floating up while dozing. */
  zzz: THREE.Sprite[] | null;
  /** Energy last frame, to notice the moment someone is fully recharged. */
  lastEnergy: number;
  /** The lift they're stepping out of, while arriving. */
  arrive: Elevator | null;
  sighed: boolean;
}

const zTex = () => canvasTexture(64, 64, (x, w, h) => {
  x.fillStyle = '#f6efe0'; x.strokeStyle = 'rgba(40,30,40,.55)'; x.lineWidth = 6;
  x.font = '700 46px "IBM Plex Sans KR", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.strokeText('Z', w / 2, h / 2); x.fillText('Z', w / 2, h / 2);
});
let zTexture: THREE.Texture | null = null;

/** How far a guest sinks when standing in the pool (the ring keeps them up). */
const WADE_DEPTH = 0.5;
/** Seconds per footstep: one per swing of the walk cycle (sin(t·9) → π/9). */
const STEP_EVERY = Math.PI / 9;
const FLOATIE_COLORS = ['#ff7aa2', '#ffd166', '#6fd3c7', '#ff9f68'];
const floatieGeo = new THREE.TorusGeometry(0.46, 0.14, 10, 22);

export interface PartyHooks {
  room(room: MapRoom): void;
  painting(p: Painting | null): void;
  guests(list: { id: string; name: string; battery: Battery; mood: Mood | ''; near: boolean; self: boolean; muted: boolean }[]): void;
  arrived(p: Painting): void;
  /** A free seat you could sit on right now (or the one you're on). */
  seat(s: { seat: Seat; seated: boolean } | null): void;
  /** Your own energy, 0–100. */
  energy(e: number): void;
  /** You just reached full charge. */
  charged(): void;
  /** You've stepped out of the lift and are at the party. */
  landed(): void;
  /** Standing at the DJ booth (fireworks can be launched from here), or not. */
  stage(near: boolean): void;
}


/**
 * Runs the party: owns every guest's avatar, moves you, follows you with the
 * camera, and turns network events into bubbles and gestures.
 */
export class Party {
  private guests = new Map<string, Guest>();
  private muted = new Set<string>();
  private sendT = 0;
  private lastSent = { x: 0, z: 0, dir: 0, moving: false };
  private room: MapRoom | null = null;
  private painting: Painting | null = null;
  private walkTo: Painting | null = null;
  /** Waypoints still to walk after the current target (around furniture, through doorways). */
  private path: Vec2[] = [];
  /** A seat you tapped: walk to it, then sit down. */
  private sitAfterWalk: Seat | null = null;
  private seatHits: THREE.Mesh[] = [];
  private offeredSeat: { id: number; seated: boolean } | null = null;
  private lastEnergyShown = -1;
  /** Guests already here when you arrive just stand there; anyone joining later comes up in the lift. */
  private settled = false;
  private settleTimer: number;
  private ring: THREE.Mesh;
  private targetMark: THREE.Mesh;
  /** 0 = close behind you (동물의 숲), 1 = overview. `zoomGoal` is where the wheel/button want it. */
  private zoom = 0;
  private zoomGoal = 0;
  private pinch: { d: number; zoom: number } | null = null;
  private touches = new Map<number, { x: number; y: number }>();
  private afterPinch = false; // the fingers of a pinch lifting one by one are not taps
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
    private world: World,
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
    // dev builds only: let test scripts look inside (never in the built page)
    if (import.meta.env.DEV) (window as unknown as { __party?: Party }).__party = this;
    // invisible boxes over each seat, so tapping a sofa or a lounger sits you down
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    for (const seat of world.map.seats) {
      const hit = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), hitMat);
      hit.position.set(seat.x, seat.y, seat.z - (seat.pose === 'lie' ? 0.6 : 0));
      hit.userData.seat = seat;
      scene.add(hit); this.seatHits.push(hit);
    }

    this.settleTimer = window.setTimeout(() => { this.settled = true; }, 1500);
    conn.on({
      add: p => this.addGuest(p),
      change: p => this.updateGuest(p),
      remove: id => this.removeGuest(id),
      chat: (from, text) => {
        const g = this.guests.get(from);
        if (this.muted.has(from) || !g) return;
        g.tag.say(text);
        if (from === conn.selfId) sound.play('send');
        else sound.play('pop', { at: { x: g.pos.x, z: g.pos.y }, pitch: 0.9 + (hash(from) % 5) * 0.06 });
      },
      emote: (from, kind) => { if (!this.muted.has(from)) this.playEmote(from, kind); },
      voice: (from, blob, ms) => {
        const g = this.guests.get(from);
        if (this.muted.has(from) || !g) return;
        g.tag.voice(blob, ms, from === conn.selfId);
        if (from !== conn.selfId) sound.play('pop', { at: { x: g.pos.x, z: g.pos.y }, pitch: 0.8 });
      },
      firework: (_from, seed) => { this.world.celebrate?.(seed); },
      snap: (x, z) => { const me = this.self(); if (me) { me.pos.set(x, z); me.net.x = x; me.net.z = z; } },
    });

    dom.addEventListener('pointerup', this.onTap);
    dom.addEventListener('wheel', this.onWheel, { passive: true });
    dom.addEventListener('pointerdown', this.onPointerDown);
    dom.addEventListener('pointermove', this.onPointerMove);
    dom.addEventListener('pointercancel', this.onPointerEnd);
  }

  self() { return this.guests.get(this.conn.selfId); }

  mute(id: string, on: boolean) { if (on) this.muted.add(id); else this.muted.delete(id); this.listDirty = true; }

  emote(kind: Emote) { this.conn.emote(kind); }

  /** 🎆 from the DJ booth. */
  firework() { this.conn.firework(); }

  /** Walk to a painting and tell the UI once we are standing in front of it. */
  goTo(p: Painting) { this.walkTo = p; this.walkAlong(p.stand); }

  /** Head for a spot, finding a way around furniture and through doorways. */
  private walkAlong(to: Vec2) {
    const me = this.self();
    if (!me) return false;
    const route = findPath(this.world.map, { x: me.pos.x, z: me.pos.y }, to);
    if (!route) { this.controls.target = null; this.path = []; return false; }
    this.path = route.slice(2);
    this.controls.target = { ...route[1] };
    const end = route[route.length - 1];
    this.targetMark.position.set(end.x, 0.02, end.z);
    this.targetMark.visible = true;
    return true;
  }

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
      lookKey: JSON.stringify(p.look), wet: 0, floatie: null, zzz: null, lastEnergy: p.energy,
      // you, and anyone who joins after you, arrive by the 퇴근 lift
      arrive: isSelf || this.settled
        ? new Elevator(this.scene, new THREE.Vector3(p.x, 0, p.z), 0, isSelf ? undefined : () => sound.play('ding', { at: { x: p.x, z: p.z }, volume: 0.6 }))
        : null,
      sighed: false,
    });
    const g0 = this.guests.get(p.id)!;
    if (g0.arrive) { g0.dir = 0; g0.rig.root.visible = false; }
    if (isSelf && g0.arrive) { sound.setListener(p.x, p.z); sound.play('lift'); } // hum, ding, doors — in time with ARRIVAL
    g0.tag.setMood(p.mood ? MOOD_ICON[p.mood] : '', p.mood ? MOOD_LABEL[p.mood] : '');
    if (isSelf) { this.camTarget.set(p.x, 0, p.z); this.snapCamera(); }
    this.listDirty = true;
  }

  private updateGuest(p: NetPlayer) {
    const g = this.guests.get(p.id);
    if (!g) { this.addGuest(p); return; }
    const isSelf = p.id === this.conn.selfId;
    // our own position is driven locally; only take the rest from the network —
    // except sitting down, which the party confirms and places you for
    if (isSelf) {
      const wasSeated = g.net.seat >= 0;
      g.net = { ...p, x: g.net.x, z: g.net.z, dir: g.net.dir, moving: g.net.moving };
      const seat = this.seatOf(p.seat);
      if (seat && !wasSeated) {
        g.pos.set(seat.x, seat.z); g.dir = seat.dir; g.net.x = seat.x; g.net.z = seat.z; g.net.dir = seat.dir;
        sound.play(seat.pose === 'lie' ? 'lie' : 'sit');
      }
      if (!seat && wasSeated) sound.play('stand');
    } else {
      const seat = this.seatOf(p.seat);
      if (seat && g.net.seat < 0) sound.play(seat.pose === 'lie' ? 'lie' : 'sit', { at: { x: seat.x, z: seat.z }, volume: 0.6 });
      g.net = { ...p };
    }
    g.tag.setName(p.name);
    g.tag.setBattery(p.battery);
    g.tag.setMood(p.mood ? MOOD_ICON[p.mood] : '', p.mood ? MOOD_LABEL[p.mood] : '');
    const key = JSON.stringify(p.look);
    if (key !== g.lookKey) {
      const rig = buildAnimal(p.look);
      rig.root.position.copy(g.rig.root.position); rig.root.rotation.y = g.rig.root.rotation.y;
      g.rig.dispose(); this.scene.add(rig.root);
      g.rig = rig; g.anim = new Animator(rig); g.lookKey = key; g.floatie = null;
    }
    this.listDirty = true;
  }

  private removeGuest(id: string) {
    const g = this.guests.get(id);
    if (!g) return;
    g.rig.dispose(); g.tag.dispose();
    for (const z of g.zzz ?? []) z.removeFromParent();
    g.arrive?.dispose();
    this.guests.delete(id);
    this.listDirty = true;
  }

  private playEmote(from: string, kind: Emote) {
    const g = this.guests.get(from);
    if (!g) return;
    g.anim.play(kind);
    g.tag.emote(kind);
    sound.play(kind, { at: { x: g.pos.x, z: g.pos.y }, pitch: from === this.conn.selfId ? 1 : 0.92 + (hash(from) % 6) * 0.03 });
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
    const wasPinch = this.touches.size > 1 || !!this.pinch || this.afterPinch;
    this.onPointerEnd(e);
    if (this.touches.size === 0) this.afterPinch = false;
    if (wasPinch) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const r = this.dom.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.ray.setFromCamera(ndc, this.camera);
    const seatHit = this.ray.intersectObjects(this.seatHits, false)[0];
    if (seatHit) {
      const seat = seatHit.object.userData.seat as Seat;
      if (this.self()?.net.seat === seat.id) return;
      if (!this.seatTaken(seat)) { this.goSit(seat); return; }
    }
    const paintingHit = this.ray.intersectObjects(this.world.paintings.map(p => p.mesh), false)[0];
    if (paintingHit) {
      const p = this.world.paintings.find(q => q.mesh === paintingHit.object);
      if (p) { this.goTo(p); return; }
    }
    const hit = this.ray.intersectObject(this.world.floor, false)[0];
    if (hit) {
      this.walkTo = null;
      this.sitAfterWalk = null;
      this.walkAlong({ x: hit.point.x, z: hit.point.z });
    }
  };

  private onWheel = (e: WheelEvent) => {
    this.zoomGoal = Math.min(1, Math.max(0, this.zoomGoal + (e.deltaY > 0 ? 0.12 : -0.12)));
  };

  // two fingers: pinch to zoom between the close view and the overview
  private onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    this.touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.touches.size === 2) { this.pinch = { d: this.touchSpread(), zoom: this.zoomGoal }; this.controls.target = null; }
  };
  private onPointerMove = (e: PointerEvent) => {
    if (!this.touches.has(e.pointerId)) return;
    this.touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pinch && this.touches.size === 2) {
      this.zoomGoal = Math.min(1, Math.max(0, this.pinch.zoom + (this.pinch.d - this.touchSpread()) / 300));
    }
  };
  private onPointerEnd = (e: PointerEvent) => {
    this.touches.delete(e.pointerId);
    if (this.pinch) this.afterPinch = true;
    if (this.touches.size < 2) this.pinch = null;
  };
  private touchSpread() {
    const [a, b] = [...this.touches.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  /** Switch between the close view and the overview (the HUD's view button). */
  toggleView() { this.zoomGoal = this.zoomGoal < 0.5 ? 1 : 0; return this.zoomGoal; }

  private snapCamera() {
    const aspect = this.dom.clientWidth / Math.max(1, this.dom.clientHeight);
    const pose = cameraPose(this.camTarget, this.zoom, aspect, this.lift);
    if (Math.abs(this.camera.fov - pose.fov) > 0.05) { this.camera.fov = pose.fov; this.camera.updateProjectionMatrix(); }
    this.camera.position.copy(pose.position);
    this.camera.lookAt(pose.lookAt);
  }

  update(dt: number) {
    if (this.disposed) return;
    const me = this.self();
    if (me) this.moveSelf(me, dt);

    for (const [id, g] of this.guests) {
      const seat = this.seatOf(g.net.seat);
      if (id !== this.conn.selfId) {
        // smooth toward the latest network position (or onto the seat they sit on)
        const k = 1 - Math.exp(-dt * 10);
        const tx = seat ? seat.x : g.net.x, tz = seat ? seat.z : g.net.z;
        g.pos.x += (tx - g.pos.x) * k;
        g.pos.y += (tz - g.pos.y) * k;
        g.dir = turn(g.dir, seat ? seat.dir : g.net.dir, dt * 10);
      }
      g.rig.root.position.x = g.pos.x;
      g.rig.root.position.z = g.pos.y;
      g.rig.root.rotation.y = g.dir;
      const baseY = seat ? (seat.pose === 'lie' ? seat.y - 0.04 : seat.y - 0.24) : this.wade(g, dt);
      let moving = !seat && (id === this.conn.selfId ? g.net.moving : g.net.moving || Math.hypot(g.net.x - g.pos.x, g.net.z - g.pos.y) > 0.05);
      if (g.arrive) moving = this.arriving(g, dt, id === this.conn.selfId) || moving;
      if (id === this.conn.selfId) this.footsteps(g, moving && !g.arrive, dt);
      g.anim.update(dt, { moving, energy: g.net.energy, pose: seat ? seat.pose : 'stand', dozing: g.net.dozing, baseY, mood: g.net.mood });
      this.dozeFx(g, dt);
      this.chargeFx(g, id === this.conn.selfId);
    }

    // camera follows you
    if (me) {
      // close view follows you fully; the overview keeps the old gentle framing
      const edge = 3.5 + this.zoom * 1;
      const b = this.world.map.bounds;
      const tx = Math.min(b.x1 - edge, Math.max(b.x0 + edge, me.pos.x));
      const tz = me.pos.y * (1 - this.zoom) + Math.max(-1.5, Math.min(1.5, me.pos.y * 0.5)) * this.zoom;
      const k = 1 - Math.exp(-dt * 5);
      this.camTarget.x += (tx - this.camTarget.x) * k;
      this.camTarget.z += (tz - this.camTarget.z) * k;
      this.zoom += (this.zoomGoal - this.zoom) * (1 - Math.exp(-dt * 6));
      // fireworks: look up a little (less while walking about)
      const lift = (this.world.lookUp?.() ?? 0) * (me.net.moving ? 0.35 : 1);
      this.lift += (lift - this.lift) * (1 - Math.exp(-dt * 1.5));
      this.snapCamera();
      this.world.fadeOccluders(this.camera.position);
      this.ring.position.set(me.pos.x, 0.015, me.pos.y);
    }

    this.sparkles.tick(dt);
    this.placeTags();
    this.listT -= dt;
    if (this.listDirty || this.listT <= 0) this.emitList();
  }

  private moveSelf(me: Guest, dt: number) {
    let { x: dx, z: dz } = this.controls.direction();
    // still in the lift: wait for the doors
    if (me.arrive && me.arrive.t < ARRIVAL.out) { dx = 0; dz = 0; this.controls.target = null; }
    // any steering while seated gets you up first
    if (me.net.seat >= 0 && (dx !== 0 || dz !== 0 || this.controls.target)) this.standUp();
    const tgt = this.controls.target;
    if (dx === 0 && dz === 0 && tgt) {
      const ox = tgt.x - me.pos.x, oz = tgt.z - me.pos.y, d = Math.hypot(ox, oz);
      const more = this.path.length > 0;
      if (more && d < 0.25) {
        // a corner of the route: on to the next waypoint without stopping
        this.controls.target = { ...this.path.shift()! };
      } else if (d < 0.12) {
        this.controls.target = null;
        this.targetMark.visible = false;
        if (this.walkTo) {
          me.dir = Math.atan2(-this.walkTo.slot.face.x, -this.walkTo.slot.face.z);
          this.hooks.arrived(this.walkTo);
          this.walkTo = null;
        }
        if (this.sitAfterWalk) { const seat = this.sitAfterWalk; this.sitAfterWalk = null; if (!this.seatTaken(seat)) this.conn.sit(seat.id); }
      } else { dx = ox / d; dz = oz / d; if (d < 0.5 && !more) { dx *= d / 0.5 + 0.3; dz *= d / 0.5 + 0.3; } }
    } else if (dx !== 0 || dz !== 0) {
      this.targetMark.visible = false;
      this.walkTo = null;
      this.sitAfterWalk = null;
      this.path = [];
    }
    const seated = me.net.seat >= 0;
    const moving = !seated && (dx !== 0 || dz !== 0);
    if (moving) {
      const step = WALK_SPEED * dt;
      const wading = me.wet > 0.5 ? 0.7 : 1; // the water slows you down a little
      const next = moveWithCollision({ x: me.pos.x, z: me.pos.y }, { x: me.pos.x + dx * step * wading, z: me.pos.y + dz * step * wading }, this.world.map);
      const moved = Math.hypot(next.x - me.pos.x, next.z - me.pos.y);
      if (moved < step * 0.1 && this.controls.target) {
        this.controls.target = null; this.targetMark.visible = false; this.walkTo = null; this.sitAfterWalk = null; this.path = [];
      }
      me.pos.set(next.x, next.z);
      me.dir = turn(me.dir, Math.atan2(dx, dz), dt * 12);
    }
    me.net.x = me.pos.x; me.net.z = me.pos.y; me.net.dir = me.dir; me.net.moving = moving;

    // send at MOVE_HZ while moving, plus one final "stopped". Not while seated: the
    // party placed you on the seat, and a "move" from there means getting up.
    this.sendT -= dt;
    if (seated) this.lastSent = { x: me.pos.x, z: me.pos.y, dir: me.dir, moving: false };
    const changed = !seated && (moving !== this.lastSent.moving
      || Math.abs(me.pos.x - this.lastSent.x) > 0.01 || Math.abs(me.pos.y - this.lastSent.z) > 0.01);
    if (changed && this.sendT <= 0) {
      this.sendT = 1 / MOVE_HZ;
      this.conn.move(me.pos.x, me.pos.y, me.dir, moving);
      this.lastSent = { x: me.pos.x, z: me.pos.y, dir: me.dir, moving };
    }

    const room = roomAt(me.pos.x, this.world.map);
    if (room.id !== this.room?.id) { this.room = room; this.hooks.room(room); }

    // the painting you are standing in front of
    let best: Painting | null = null, bestD = 2.3;
    for (const p of this.world.paintings) {
      const d = Math.hypot(p.stand.x - me.pos.x, p.stand.z - me.pos.y);
      if (d < bestD) { bestD = d; best = p; }
    }
    if (best !== this.painting) { this.painting = best; this.hooks.painting(best); }

    // a free seat right here? offer it (or offer to get up)
    const mySeat = this.seatOf(me.net.seat);
    const free = this.world.map.seats.filter(s => !this.seatTaken(s));
    const near = mySeat ?? (moving ? null : nearSeat(free, { x: me.pos.x, z: me.pos.y }, 1.1));
    const offer = near ? { id: near.id, seated: !!mySeat } : null;
    if (offer?.id !== this.offeredSeat?.id || offer?.seated !== this.offeredSeat?.seated) {
      this.offeredSeat = offer;
      this.hooks.seat(near ? { seat: near, seated: !!mySeat } : null);
    }
    const atStage = nearStage(this.world.map, { x: me.pos.x, z: me.pos.y });
    if (atStage !== this.atStage) { this.atStage = atStage; this.hooks.stage(atStage); }
    if (me.net.energy !== this.lastEnergyShown) { this.lastEnergyShown = me.net.energy; this.hooks.energy(me.net.energy); }
  }

  /** In the pool, sink to the waist on a swim ring and bob gently; climb out on land. Returns the height to stand at. */
  private wade(g: Guest, dt: number): number {
    const wet = inWater({ x: g.pos.x, z: g.pos.y }, this.world.map) ? 1 : 0;
    g.wet += (wet - g.wet) * (1 - Math.exp(-dt * 6));
    if (g.wet < 0.01 && !g.floatie) return 0;
    if (!g.floatie) {
      const color = FLOATIE_COLORS[[...g.net.id].reduce((a, c) => a + c.charCodeAt(0), 0) % FLOATIE_COLORS.length];
      g.floatie = new THREE.Mesh(floatieGeo, new THREE.MeshStandardMaterial({ color, roughness: 0.35 }));
      g.floatie.rotation.x = Math.PI / 2;
      g.floatie.position.y = 0.48;
      g.rig.root.add(g.floatie);
    }
    const t = performance.now() / 1000 + g.pos.x;
    g.floatie.visible = g.wet > 0.15;
    g.floatie.scale.setScalar(0.6 + 0.4 * g.wet);
    return -WADE_DEPTH * g.wet + Math.sin(t * 2.2) * 0.025 * g.wet;
  }

  private seatOf(id: number): Seat | undefined {
    return id >= 0 ? this.world.map.seats.find(s => s.id === id) : undefined;
  }
  private seatTaken(seat: Seat) {
    for (const g of this.guests.values()) if (g.net.seat === seat.id) return true;
    return false;
  }

  /** Walk over to a seat and sit down on it. */
  goSit(seat: Seat) {
    const me = this.self();
    if (!me || this.seatTaken(seat)) return;
    this.walkTo = null;
    if (Math.hypot(seat.stand.x - me.pos.x, seat.stand.z - me.pos.y) < 0.35) { this.conn.sit(seat.id); return; }
    this.sitAfterWalk = seat;
    if (!this.walkAlong(seat.stand)) this.sitAfterWalk = null;
  }

  /** Get up from your seat onto the floor in front of it. */
  standUp() {
    const me = this.self();
    const seat = me && this.seatOf(me.net.seat);
    if (!me || !seat) return;
    me.pos.set(seat.stand.x, seat.stand.z);
    me.net.seat = -1; me.net.x = seat.stand.x; me.net.z = seat.stand.z;
    this.conn.stand();
    sound.play('stand');
  }

  /** Stepping out of the lift: drawn a little back inside it until the doors are open, then out, then a sigh. */
  private arriving(g: Guest, dt: number, isSelf: boolean): boolean {
    const e = g.arrive!;
    e.update(dt);
    g.rig.root.visible = e.guestVisible();
    g.rig.root.position.z -= e.guestOffset();
    if (!g.sighed && e.t >= ARRIVAL.out) { g.sighed = true; g.anim.play('sigh'); sound.play('sigh', { at: { x: g.pos.x, z: g.pos.y } }); }
    if (e.done) {
      g.arrive = null; g.rig.root.visible = true;
      if (isSelf) this.hooks.landed();
    }
    return e.stepping();
  }

  /** Your own steps (one per stride of the walk cycle), on wood, deck or in the water; and a snore when you doze. */
  private footsteps(g: Guest, moving: boolean, dt: number) {
    sound.setListener(g.pos.x, g.pos.y);
    sound.dozing(g.net.dozing);
    if (!moving) { this.stepT = 0.2; return; }
    this.stepT += dt;
    if (this.stepT < STEP_EVERY) return;
    this.stepT -= STEP_EVERY;
    const wet = inWater({ x: g.pos.x, z: g.pos.y }, this.world.map);
    sound.play(wet ? 'step-water' : this.conn.theme === 'pool' ? 'step-deck' : 'step-wood', { volume: 0.7 });
  }
  private stepT = 0.2;
  private lift = 0;
  private atStage = false;

  /** Nodding off: a few Z's drift up from the head. */
  private dozeFx(g: Guest, dt: number) {
    if (!g.net.dozing) { if (g.zzz) for (const z of g.zzz) z.visible = false; return; }
    if (!g.zzz) {
      zTexture ??= zTex();
      g.zzz = [0, 1, 2].map(() => {
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: zTexture!, transparent: true, depthWrite: false }));
        this.scene.add(sp); return sp;
      });
    }
    void dt;
    const t = performance.now() / 1000;
    const head = g.rig.head.getWorldPosition(new THREE.Vector3());
    g.zzz.forEach((z, k) => {
      const u = (t * 0.35 + k / 3) % 1;
      z.visible = true;
      z.position.set(head.x + 0.25 + u * 0.35, head.y + 0.25 + u * 0.7, head.z);
      z.scale.setScalar(0.12 + u * 0.16);
      (z.material as THREE.SpriteMaterial).opacity = Math.sin(u * Math.PI) * 0.95;
    });
  }

  /** The moment someone is fully recharged: a burst of light and a little cheer. */
  private chargeFx(g: Guest, isSelf: boolean) {
    const e = g.net.energy;
    if (g.lastEnergy < ENERGY.max && e >= ENERGY.max) {
      const at = g.rig.head.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.3, 0));
      this.sparkles.burst(at, ['#9dff9a', '#fff1c4', '#7ad7ff', '#ffd27a'], 46);
      g.anim.play('wave');
      sound.play('charged', isSelf ? {} : { at: { x: g.pos.x, z: g.pos.y }, volume: 0.5 });
      if (isSelf) this.hooks.charged();
      else g.tag.say('충전 완료! ✨');
    }
    g.lastEnergy = e;
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
      id: g.net.id, name: g.net.name, battery: g.net.battery, mood: g.net.mood, self: g.net.id === this.conn.selfId,
      near: !!me && g.net.id !== me.net.id && isNear(me.net, g.net), muted: this.muted.has(g.net.id),
    })));
  }

  dispose() {
    this.disposed = true;
    clearTimeout(this.settleTimer);
    this.dom.removeEventListener('pointerup', this.onTap);
    this.dom.removeEventListener('wheel', this.onWheel);
    this.dom.removeEventListener('pointerdown', this.onPointerDown);
    this.dom.removeEventListener('pointermove', this.onPointerMove);
    this.dom.removeEventListener('pointercancel', this.onPointerEnd);
    for (const id of [...this.guests.keys()]) this.removeGuest(id);
    this.ring.removeFromParent(); this.targetMark.removeFromParent();
    for (const h of this.seatHits) { h.removeFromParent(); h.geometry.dispose(); }
    this.sparkles.dispose();
    sound.dozing(false);
  }
}

/** A small stable number per guest id, so each voice keeps its own pitch. */
function hash(id: string) { let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

function turn(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * Math.min(1, k);
}
