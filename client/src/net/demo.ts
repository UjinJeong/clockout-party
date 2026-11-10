import {
  DOZE_AFTER, EMOTES, ENERGY, KINDS, MOOD_ENERGY, MOVE_HZ, HANDS, HATS, OUTFITS, WALK_SPEED, batteryOf, chargeRate, isNear, mapFor,
  moveWithCollision, nearestWalkable, stepEnergy,
  type Emote, type Look, type Mood, type Seat, type Theme, type WorldMap,
} from '@party/shared';
import { Emitter, type NetPlayer, type PartyConnection, type PartyEvents } from './types';

/**
 * A pretend party for trying things out without a server: a few tired bot guests
 * wander between the favourite spots of the place, sit down to recharge, nod
 * off, chat when you are near, and react to your emotes. It follows the same
 * rules as the real server: only nearby players hear you, same walls and
 * furniture, same seats and the same charging.
 */
const BOTS: { name: string; energy: number; mood: Mood }[] = [
  { name: '월요병', energy: 12, mood: 'drained' },
  { name: '소금빵', energy: 55, mood: 'meh' },
  { name: '야근요정', energy: 30, mood: 'drained' },
  { name: '꿀잠', energy: 8, mood: 'sleepy' },
  { name: '하루', energy: 70, mood: 'hyped' },
];
/** What each bot says, per place (same order as BOTS). */
const LINES: Record<Theme, string[][]> = {
  gallery: [
    ['오늘 회의만 네 개였어요…', '그냥 구경만 할게요 ㅎㅎ', '이 방 조명 좋네요'],
    ['와인 맛있어요 🍷', '이 그림 색감 진짜 좋다', '어느 방이 제일 좋았어요?'],
    ['방금 퇴근했어요 ㅠㅠ', '여기 오니까 좀 살 것 같다', '연못관 꼭 가보세요'],
    ['졸려요… zZ', '의자 있는 데서 쉬어야지', '말 걸어줘서 고마워요'],
    ['처음 와봤어요!', '고릴라 그림 좋아해요', '같이 둘러볼래요?'],
  ],
  home: [
    ['소파가 너무 푹신해요… 못 일어나겠어', '오늘 회의만 네 개였어요…', '벽난로 앞 따뜻하다'],
    ['피자 한 조각 더 먹어도 돼요? 🍕', '케이크 누가 사 왔어요?', '부엌이 제일 시끌벅적하네요'],
    ['방금 퇴근했어요 ㅠㅠ', '노래 누가 골랐어요? 좋다', '테라스 바람 좋아요'],
    ['졸려요… zZ', '빈백에 누우면 끝이에요', '말 걸어줘서 고마워요'],
    ['집들이 축하해요! 🎉', '야경 진짜 예쁘다', '그릴에 마시멜로 구워요'],
  ],
  pool: [
    ['물 시원해요~ 🛟', '오늘 회의만 네 개였어요…', '선베드에서 한숨 자야지'],
    ['칵테일 맛있어요 🍹', '튜브 하나 더 있어요?', '바 오두막이 명당이에요'],
    ['방금 퇴근하고 바로 왔어요', '노을 질 때 수영장 최고', 'DJ 선곡 좋다'],
    ['졸려요… zZ', '물에 둥둥 떠 있으니까 살 것 같아요', '말 걸어줘서 고마워요'],
    ['처음 와봤어요!', '밤엔 모닥불 피운대요 🔥', '같이 수영할래요?'],
  ],
};
const REPLIES = ['ㅋㅋㅋ 맞아요', '오 그래요?', '저도요!', '와 공감해요', '좋네요 🥂', '천천히 쉬다 가요'];

/** The simulated body behind one guest: exact energy and how long they've been idle. */
interface Sim { energy: number; idle: number; moodSet?: boolean }
interface Bot extends NetPlayer, Sim {
  target: { x: number; z: number } | null;
  /** The seat a bot is heading to, to sit down on when it gets there. */
  wantSeat: Seat | null;
  wait: number; lines: string[]; nextLine: number;
}

export class DemoConnection implements PartyConnection {
  readonly selfId = 'me';
  readonly roomId = 'demo';
  readonly title = '혼자 체험하기';
  readonly isPrivate = false;
  readonly demo = true;
  readonly voiceOk = true;
  private ev = new Emitter();
  private me: NetPlayer & Sim;
  private bots: Bot[] = [];
  private timer: number;
  private map: WorldMap;
  readonly theme: Theme;

  constructor(name: string, look: Look, opts: { botSuffix?: string; theme?: Theme } = {}) {
    this.map = mapFor(opts.theme);
    this.theme = this.map.theme;
    const at = nearestWalkable(this.map.spawn, this.map);
    this.me = {
      id: 'me', name, look, x: at.x, z: at.z, dir: 0, moving: false,
      energy: ENERGY.start, battery: batteryOf(ENERGY.start), seat: -1, dozing: false, idle: 0, mood: '',
    };
    BOTS.forEach((b, i) => {
      // every bot dressed differently, so the party shows off the wardrobe
      const lk: Look = {
        kind: KINDS[(i + 1) % KINDS.length], color: (i * 3 + 1) % 8,
        hat: HATS[(i + 1) % HATS.length], hand: HANDS[(i * 3 + 1) % HANDS.length], outfit: OUTFITS[(i + 2) % OUTFITS.length],
      };
      // two guests start near you, the others are already somewhere in the party
      const sp = this.map.spawn, spots = this.map.spots;
      const p = i < 2 ? { x: sp.x - 2 + i * 2.5, z: sp.z - 2 + i } : spots[(i * 5) % spots.length];
      const pos = nearestWalkable(p, this.map);
      this.bots.push({
        id: `bot${i}`, name: b.name + (opts.botSuffix ?? ''), look: lk, x: pos.x, z: pos.z, dir: Math.random() * 6, moving: false,
        energy: b.energy, battery: batteryOf(b.energy), seat: -1, dozing: false, idle: Math.random() * 20, mood: b.mood,
        target: null, wantSeat: null, wait: 2 + Math.random() * 6, lines: LINES[this.theme][i], nextLine: 3 + Math.random() * 6,
      });
    });
    // the most drained guest has already flopped onto a seat
    const tired = [...this.bots].sort((a, b) => a.energy - b.energy)[0];
    const firstSeat = this.map.seats[(this.map.seats.length / 2) | 0];
    if (tired && firstSeat) this.seatBot(tired, firstSeat);
    this.timer = window.setInterval(() => this.tick(1 / MOVE_HZ), 1000 / MOVE_HZ);
  }

  on(h: Partial<PartyEvents>) {
    this.ev.on(h);
    h.add?.(strip(this.me));
    for (const b of this.bots) h.add?.(strip(b));
  }

  move(x: number, z: number, dir: number, moving: boolean) {
    if (this.me.seat >= 0) this.standUp(this.me);
    const p = moveWithCollision({ x: this.me.x, z: this.me.z }, { x, z }, this.map);
    if (moving || Math.hypot(p.x - this.me.x, p.z - this.me.z) > 0.01) this.wake(this.me);
    Object.assign(this.me, { x: p.x, z: p.z, dir, moving });
  }

  sit(seatId: number) {
    const seat = this.map.seats.find(s => s.id === seatId);
    if (!seat || !this.free(seat)) return;
    const close = Math.min(Math.hypot(seat.stand.x - this.me.x, seat.stand.z - this.me.z), Math.hypot(seat.x - this.me.x, seat.z - this.me.z));
    if (close > 1.8) return;
    Object.assign(this.me, { seat: seat.id, x: seat.x, z: seat.z, dir: seat.dir, moving: false });
    this.wake(this.me);
    this.ev.emit('change', strip(this.me));
  }

  stand() {
    this.standUp(this.me);
    this.wake(this.me);
    this.ev.emit('change', strip(this.me));
  }

  mood(m: Mood) {
    this.me.mood = m;
    if (!this.me.moodSet) { this.me.moodSet = true; this.me.energy = MOOD_ENERGY[m]; this.me.battery = batteryOf(this.me.energy); }
    this.wake(this.me);
    this.ev.emit('change', strip(this.me));
  }

  chat(text: string) {
    this.wake(this.me);
    this.ev.emit('chat', 'me', text);
    const near = this.bots.filter(b => isNear(b, this.me));
    if (!near.length) return;
    const b = near[(Math.random() * near.length) | 0];
    window.setTimeout(() => this.ev.emit('chat', b.id, REPLIES[(Math.random() * REPLIES.length) | 0]), 1100 + Math.random() * 1400);
  }

  emote(kind: Emote) {
    this.wake(this.me);
    this.ev.emit('emote', 'me', kind);
    for (const b of this.bots) if (isNear(b, this.me) && Math.random() < 0.7) {
      // tired guests answer with tired reactions
      const pool: Emote[] = b.energy < ENERGY.low ? ['nod', 'zone', 'wave'] : [...EMOTES];
      const back: Emote = kind === 'cheers' ? 'cheers' : kind === 'nod' || kind === 'zone' ? kind : pool[(Math.random() * pool.length) | 0];
      window.setTimeout(() => this.ev.emit('emote', b.id, back), 400 + Math.random() * 900);
    }
  }

  async voice(blob: Blob, ms: number) {
    // There is nobody real to hear it, so play it back as your own bubble.
    this.ev.emit('voice', 'me', blob, ms);
  }

  leave() {
    window.clearInterval(this.timer);
    this.ev.emit('closed', 'left');
  }

  private free(seat: Seat) {
    return this.me.seat !== seat.id && !this.bots.some(b => b.seat === seat.id || b.wantSeat?.id === seat.id);
  }
  private seatBot(b: Bot, seat: Seat) {
    Object.assign(b, { seat: seat.id, x: seat.x, z: seat.z, dir: seat.dir, moving: false, wantSeat: null, target: null });
    b.wait = 12 + Math.random() * 20;
  }
  private standUp(p: NetPlayer) {
    const seat = this.map.seats.find(s => s.id === p.seat);
    p.seat = -1;
    if (seat) { p.x = seat.stand.x; p.z = seat.stand.z; }
  }
  private wake(p: NetPlayer & Sim) { p.idle = 0; p.dozing = false; }

  /** The same charging as the real server: see shared/energy. */
  private live(p: NetPlayer & Sim, dt: number) {
    p.idle += dt;
    p.dozing = p.idle >= DOZE_AFTER;
    const seat = p.seat >= 0 ? this.map.seats.find(s => s.id === p.seat) : undefined;
    const pose = seat ? seat.pose : p.moving ? 'walk' : 'stand';
    p.energy = stepEnergy(p.energy, chargeRate(pose, p.dozing), dt);
    p.battery = batteryOf(p.energy);
  }

  private tick(dt: number) {
    this.live(this.me, dt);
    this.ev.emit('change', strip(this.me));
    for (const b of this.bots) {
      this.live(b, dt);
      if (b.seat >= 0) {
        // stay seated until recharged (or bored), then get up and wander
        if ((b.wait -= dt) <= 0 && (b.energy >= ENERGY.max - 1 || Math.random() < 0.02)) { this.standUp(b); b.wait = 1 + Math.random() * 3; b.idle = 0; }
      } else if (b.target) {
        const dx = b.target.x - b.x, dz = b.target.z - b.z, d = Math.hypot(dx, dz);
        if (d < 0.15) {
          b.target = null; b.moving = false; b.wait = 3 + Math.random() * 9;
          if (b.wantSeat) { const s = b.wantSeat; b.wantSeat = null; if (this.free(s)) this.seatBot(b, s); }
        } else {
          const s = Math.min(d, WALK_SPEED * 0.75 * dt);
          const p = moveWithCollision(b, { x: b.x + (dx / d) * s, z: b.z + (dz / d) * s }, this.map);
          if (Math.hypot(p.x - b.x, p.z - b.z) < s * 0.2) { b.target = null; b.wantSeat = null; b.moving = false; b.wait = 1; }
          else { b.dir = Math.atan2(dx, dz); b.x = p.x; b.z = p.z; b.moving = true; b.idle = 0; }
        }
      } else if ((b.wait -= dt) <= 0) {
        // drained guests look for somewhere to sit; the rest wander between favourite spots
        const seats = this.map.seats.filter(s => this.free(s));
        if (b.energy < 60 && seats.length && Math.random() < 0.7) {
          const s = seats[(Math.random() * seats.length) | 0];
          b.wantSeat = s; b.target = { ...s.stand };
        } else if (b.energy < ENERGY.low && Math.random() < 0.5) {
          b.wait = 6 + Math.random() * 8; // too tired to move just yet
        } else {
          const spots = this.map.spots;
          const s = spots[(Math.random() * spots.length) | 0];
          b.target = nearestWalkable({ x: s.x + (Math.random() - 0.5), z: s.z + (Math.random() - 0.5) * 0.6 }, this.map);
        }
      }
      // chatting with you when you are close (unless they've nodded off)
      if (isNear(b, this.me) && !b.dozing) {
        b.nextLine -= dt;
        if (b.nextLine <= 0) {
          b.nextLine = 9 + Math.random() * 12;
          if (b.energy >= ENERGY.low || Math.random() < 0.3) {
            this.ev.emit('chat', b.id, b.lines[(Math.random() * b.lines.length) | 0]);
            if (!b.moving && b.seat < 0) b.dir = Math.atan2(this.me.x - b.x, this.me.z - b.z);
          } else this.ev.emit('emote', b.id, Math.random() < 0.5 ? 'nod' : 'wave');
        }
      }
      this.ev.emit('change', strip(b));
    }
    // once in a while somebody across the room cheers
    if (Math.random() < 0.004) {
      const b = this.bots[(Math.random() * this.bots.length) | 0];
      if (isNear(b, this.me) && !b.dozing) this.ev.emit('emote', b.id, 'cheers');
    }
  }
}

const strip = (b: NetPlayer): NetPlayer => ({
  id: b.id, name: b.name, look: b.look, x: b.x, z: b.z, dir: b.dir, moving: b.moving,
  battery: b.battery, energy: Math.floor(b.energy), seat: b.seat, dozing: b.dozing, mood: b.mood,
});
