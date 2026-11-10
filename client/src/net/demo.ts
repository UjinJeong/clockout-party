import {
  EMOTES, KINDS, MOVE_HZ, HANDS, HATS, OUTFITS, WALK_SPEED, isNear, mapFor, moveWithCollision, nearestWalkable,
  type Battery, type Emote, type Look, type Theme, type WorldMap,
} from '@party/shared';
import { Emitter, type NetPlayer, type PartyConnection, type PartyEvents } from './types';

/**
 * A pretend party for trying things out without a server: a few tired bot guests
 * wander between the favourite spots of the place, chat when you are near, and
 * react to your emotes. It follows the same rules as the real server (only
 * nearby players hear you, same walls and furniture).
 */
const BOTS: { name: string; battery: Battery }[] = [
  { name: '월요병', battery: 'low' },
  { name: '소금빵', battery: 'charging' },
  { name: '야근요정', battery: 'charging' },
  { name: '꿀잠', battery: 'low' },
  { name: '하루', battery: 'charging' },
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

interface Bot extends NetPlayer { target: { x: number; z: number } | null; wait: number; lines: string[]; nextLine: number }

export class DemoConnection implements PartyConnection {
  readonly selfId = 'me';
  readonly roomId = 'demo';
  readonly title = '혼자 체험하기';
  readonly isPrivate = false;
  readonly demo = true;
  readonly voiceOk = true;
  private ev = new Emitter();
  private me: NetPlayer;
  private bots: Bot[] = [];
  private timer: number;
  private map: WorldMap;
  readonly theme: Theme;

  constructor(name: string, look: Look, opts: { botSuffix?: string; theme?: Theme } = {}) {
    this.map = mapFor(opts.theme);
    this.theme = this.map.theme;
    const at = nearestWalkable(this.map.spawn, this.map);
    this.me = { id: 'me', name, look, x: at.x, z: at.z, dir: 0, moving: false, battery: 'charging' };
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
        battery: b.battery, target: null, wait: 2 + Math.random() * 6, lines: LINES[this.theme][i], nextLine: 3 + Math.random() * 6,
      });
    });
    this.timer = window.setInterval(() => this.tick(1 / MOVE_HZ), 1000 / MOVE_HZ);
  }

  on(h: Partial<PartyEvents>) {
    this.ev.on(h);
    h.add?.({ ...this.me });
    for (const b of this.bots) h.add?.(strip(b));
  }

  move(x: number, z: number, dir: number, moving: boolean) {
    const p = moveWithCollision({ x: this.me.x, z: this.me.z }, { x, z }, this.map);
    Object.assign(this.me, { x: p.x, z: p.z, dir, moving });
  }

  chat(text: string) {
    this.ev.emit('chat', 'me', text);
    const near = this.bots.filter(b => isNear(b, this.me));
    if (!near.length) return;
    const b = near[(Math.random() * near.length) | 0];
    window.setTimeout(() => this.ev.emit('chat', b.id, REPLIES[(Math.random() * REPLIES.length) | 0]), 1100 + Math.random() * 1400);
  }

  emote(kind: Emote) {
    this.ev.emit('emote', 'me', kind);
    for (const b of this.bots) if (isNear(b, this.me) && Math.random() < 0.7) {
      const back: Emote = kind === 'cheers' ? 'cheers' : EMOTES[(Math.random() * EMOTES.length) | 0];
      window.setTimeout(() => this.ev.emit('emote', b.id, back), 400 + Math.random() * 900);
    }
  }

  async voice(blob: Blob, ms: number) {
    // There is nobody real to hear it, so play it back as your own bubble.
    this.ev.emit('voice', 'me', blob, ms);
  }

  battery(level: Battery) {
    this.me.battery = level;
    this.ev.emit('change', { ...this.me });
  }

  leave() {
    window.clearInterval(this.timer);
    this.ev.emit('closed', 'left');
  }

  private tick(dt: number) {
    for (const b of this.bots) {
      if (b.target) {
        const dx = b.target.x - b.x, dz = b.target.z - b.z, d = Math.hypot(dx, dz);
        if (d < 0.15) { b.target = null; b.moving = false; b.wait = 3 + Math.random() * 9; }
        else {
          const s = Math.min(d, WALK_SPEED * 0.75 * dt);
          const p = moveWithCollision(b, { x: b.x + (dx / d) * s, z: b.z + (dz / d) * s }, this.map);
          if (Math.hypot(p.x - b.x, p.z - b.z) < s * 0.2) { b.target = null; b.moving = false; b.wait = 1; }
          else { b.dir = Math.atan2(dx, dz); b.x = p.x; b.z = p.z; b.moving = true; }
        }
      } else if ((b.wait -= dt) <= 0) {
        // low-battery guests mostly stay put
        if (b.battery === 'low' && Math.random() < 0.6) { b.wait = 6 + Math.random() * 8; }
        else {
          const spots = this.map.spots;
          const s = spots[(Math.random() * spots.length) | 0];
          b.target = nearestWalkable({ x: s.x + (Math.random() - 0.5), z: s.z + (Math.random() - 0.5) * 0.6 }, this.map);
        }
      }
      // chatting with you when you are close
      if (isNear(b, this.me)) {
        b.nextLine -= dt;
        if (b.nextLine <= 0) {
          b.nextLine = 9 + Math.random() * 12;
          if (b.battery === 'charging' || Math.random() < 0.3) {
            this.ev.emit('chat', b.id, b.lines[(Math.random() * b.lines.length) | 0]);
            if (!b.moving) b.dir = Math.atan2(this.me.x - b.x, this.me.z - b.z);
          } else this.ev.emit('emote', b.id, 'wave');
        }
      }
      this.ev.emit('change', strip(b));
    }
    // once in a while somebody across the room cheers
    if (Math.random() < 0.004) {
      const b = this.bots[(Math.random() * this.bots.length) | 0];
      if (isNear(b, this.me)) this.ev.emit('emote', b.id, 'cheers');
    }
  }
}

const strip = (b: Bot): NetPlayer => ({ id: b.id, name: b.name, look: b.look, x: b.x, z: b.z, dir: b.dir, moving: b.moving, battery: b.battery });
