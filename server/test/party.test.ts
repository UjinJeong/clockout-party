process.env.ADMIN_PASSWORD = 'test-pass';
// a tiny stand-in for the built web client, so the server can be checked serving it
import { mkdtempSync as __mk, writeFileSync as __wr } from 'node:fs';
import { tmpdir as __tmp } from 'node:os';
process.env.CLIENT_DIST = __mk(__tmp() + '/client-');
__wr(process.env.CLIENT_DIST + '/index.html', '<title>퇴근 파티</title>');
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { boot, type ColyseusTestServer } from '@colyseus/testing';
import app from '../src/app';
import type { PartyRoom } from '../src/PartyRoom';
import { DOZE_AFTER, ENERGY, MAPS, MOOD_ENERGY } from '@party/shared';

let colyseus: ColyseusTestServer;
beforeAll(async () => { colyseus = await boot(app); });
afterAll(async () => { await colyseus.shutdown(); });
afterEach(async () => { await colyseus.cleanup(); });

const look = { kind: 'fox', color: 2, hat: 'headphones', hand: 'wine', outfit: 'tie' };
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

describe('party room', () => {
  it('adds a player with sanitized name and look', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { title: '테스트' });
    const c = await colyseus.connectTo(room, { name: '  유진 ', look });
    await room.waitForNextPatch();
    const p = room.state.players.get(c.sessionId)!;
    expect(p.name).toBe('유진');
    expect(p.kind).toBe('fox');
    expect([p.hat, p.hand, p.outfit]).toEqual(['headphones', 'wine', 'tie']);
    expect(p.battery).toBe('low'); // everyone arrives tired
  });

  it('a colour picked from the palette reaches everyone intact', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const teal = 0x1000000 + 0x2a9d8f;
    const a = await colyseus.connectTo(room, { name: 'A', look: { ...look, color: teal } });
    const b = await colyseus.connectTo(room, { name: 'B', look });
    await room.waitForNextPatch();
    await wait(120);
    expect(room.state.players.get(a.sessionId)!.color).toBe(teal);
    expect((b.state as any).players.get(a.sessionId).color).toBe(teal); // survives the wire
  });

  it('gives a fallback name when none is sent', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const c = await colyseus.connectTo(room, {});
    await room.waitForNextPatch();
    expect(room.state.players.get(c.sessionId)!.name).toMatch(/^손님/);
  });

  it('delivers chat only to nearby players', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    const b = await colyseus.connectTo(room, { name: 'B', look });
    const far = await colyseus.connectTo(room, { name: 'C', look });
    const got: Record<string, string[]> = { a: [], b: [], far: [] };
    a.onMessage('chat', (m: any) => got.a.push(m.text));
    b.onMessage('chat', (m: any) => got.b.push(m.text));
    far.onMessage('chat', (m: any) => got.far.push(m.text));
    room.state.players.get(far.sessionId)!.x = 55; // the pond room, far away
    a.send('chat', { text: '안녕' });
    await wait(150);
    expect(got.a).toEqual(['안녕']);
    expect(got.b).toEqual(['안녕']);
    expect(got.far).toEqual([]);
  });

  it('ignores empty chat', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    const got: string[] = [];
    a.onMessage('chat', (m: any) => got.push(m.text));
    a.send('chat', { text: '   ' });
    a.send('chat', 'not an object');
    await wait(120);
    expect(got).toEqual([]);
  });

  it('accepts a normal step and moves the player', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    await wait(150);
    const p = room.state.players.get(a.sessionId)!;
    const x0 = p.x;
    a.send('move', { x: x0 + 0.2, z: p.z, dir: 1, moving: true });
    await wait(80);
    expect(p.x).toBeCloseTo(x0 + 0.2);
    expect(p.moving).toBe(true);
  });

  it('rejects teleport moves and snaps back', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    let snapped = false;
    a.onMessage('snap', () => { snapped = true; });
    await wait(50);
    a.send('move', { x: 58, z: 0, dir: 0, moving: true });
    await wait(150);
    expect(snapped).toBe(true);
    expect(room.state.players.get(a.sessionId)!.x).toBeLessThan(12);
  });

  it('sends emotes to nearby players and drops unknown kinds', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    const b = await colyseus.connectTo(room, { name: 'B', look });
    const kinds: string[] = [];
    b.onMessage('emote', (m: any) => kinds.push(m.kind));
    a.send('emote', { kind: 'cheers' });
    a.send('emote', { kind: 'bomb' });
    await wait(120);
    expect(kinds).toEqual(['cheers']);
  });

  it('relays a voice note to nearby players only, and drops oversize ones', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    const b = await colyseus.connectTo(room, { name: 'B', look });
    const far = await colyseus.connectTo(room, { name: 'C', look });
    room.state.players.get(far.sessionId)!.x = 55;
    const sizes: number[] = [], farSizes: number[] = [];
    b.onMessage('voice', (m: any) => sizes.push(m.data.byteLength));
    far.onMessage('voice', (m: any) => farSizes.push(m.data.byteLength));
    a.send('voice', { mime: 'audio/webm', ms: 1500, data: new Uint8Array(1000) });
    a.send('voice', { mime: 'audio/webm', ms: 1500, data: new Uint8Array(500_000) });
    await wait(250);
    expect(sizes).toEqual([1000]);
    expect(farSizes).toEqual([]);
  });

  it('relays a realistic 120KB voice note without dropping the connection', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    const b = await colyseus.connectTo(room, { name: 'B', look });
    const sizes: number[] = [];
    b.onMessage('voice', (m: any) => sizes.push(m.data.byteLength));
    a.send('voice', { mime: 'audio/webm', ms: 25000, data: new Uint8Array(120_000) });
    await wait(300);
    expect(sizes).toEqual([120_000]);
    a.send('chat', { text: '아직 연결돼 있어요' });
    const got: string[] = [];
    b.onMessage('chat', (m: any) => got.push(m.text));
    await wait(150);
    expect(got).toEqual(['아직 연결돼 있어요']);
  });


  it('lists public rooms and hides private ones', async () => {
    await colyseus.createRoom('party', { title: '공개', private: false });
    await colyseus.createRoom('party', { title: '비밀', private: true });
    const res = await colyseus.http.get("/rooms");
    const titles = (res.data as any[]).map(r => r.title);
    expect(titles).toContain('공개');
    expect(titles).not.toContain('비밀');
  });

  it('lets a friend join a private room by id', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { title: '비밀', private: true });
    const friend = await colyseus.sdk.joinById(room.roomId, { name: '친구', look });
    expect(friend.roomId).toBe(room.roomId);
    await friend.leave();
  });
});

describe('퇴근 → 충전', () => {
  const home = MAPS.home;
  const sofa = home.seats[0];
  /** Put a player on the stand-up spot of a seat, as if they had walked there. */
  const standAt = (room: PartyRoom, id: string, x: number, z: number) => {
    const p = room.state.players.get(id)!; p.x = x; p.z = z;
  };

  it('everyone arrives tired, standing, awake', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { theme: 'home' });
    const a = await colyseus.connectTo(room, { name: 'A', look });
    await room.waitForNextPatch();
    const p = room.state.players.get(a.sessionId)!;
    expect(p.energy).toBe(ENERGY.start);
    expect(p.seat).toBe(-1);
    expect(p.dozing).toBe(false);
    expect(p.battery).toBe('low');
  });

  it('you can sit on a seat you are standing next to', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { theme: 'home' });
    const a = await colyseus.connectTo(room, { name: 'A', look });
    await room.waitForNextPatch();
    standAt(room, a.sessionId, sofa.stand.x, sofa.stand.z);
    a.send('sit', { seat: sofa.id });
    await wait(80);
    const p = room.state.players.get(a.sessionId)!;
    expect(p.seat).toBe(sofa.id);
    expect([p.x, p.z]).toEqual([sofa.x, sofa.z]);
  });

  it('but not from across the room, and not on someone', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { theme: 'home' });
    const a = await colyseus.connectTo(room, { name: 'A', look });
    const b = await colyseus.connectTo(room, { name: 'B', look });
    await room.waitForNextPatch();
    standAt(room, a.sessionId, 30, 2);
    a.send('sit', { seat: sofa.id });
    await wait(80);
    expect(room.state.players.get(a.sessionId)!.seat).toBe(-1);
    standAt(room, a.sessionId, sofa.stand.x, sofa.stand.z);
    standAt(room, b.sessionId, sofa.stand.x + 0.2, sofa.stand.z);
    a.send('sit', { seat: sofa.id });
    await wait(80);
    b.send('sit', { seat: sofa.id });
    await wait(80);
    expect(room.state.players.get(b.sessionId)!.seat).toBe(-1);
    b.send('sit', { seat: 9999 });
    await wait(50);
    expect(room.state.players.get(b.sessionId)!.seat).toBe(-1);
  });

  it('sitting charges you up much faster than standing', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { theme: 'home' });
    const a = await colyseus.connectTo(room, { name: 'A', look });
    const b = await colyseus.connectTo(room, { name: 'B', look });
    await room.waitForNextPatch();
    standAt(room, a.sessionId, sofa.stand.x, sofa.stand.z);
    a.send('sit', { seat: sofa.id });
    await wait(80);
    room.advance(10);
    const sat = room.state.players.get(a.sessionId)!.energy, stood = room.state.players.get(b.sessionId)!.energy;
    expect(sat).toBeGreaterThan(stood + 10);
    room.advance(60);
    expect(room.state.players.get(a.sessionId)!.energy).toBe(ENERGY.max);
    expect(room.state.players.get(a.sessionId)!.battery).toBe('charging');
  });

  it('standing up puts you back on the floor in front of the seat', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { theme: 'home' });
    const a = await colyseus.connectTo(room, { name: 'A', look });
    await room.waitForNextPatch();
    standAt(room, a.sessionId, sofa.stand.x, sofa.stand.z);
    a.send('sit', { seat: sofa.id });
    await wait(80);
    a.send('stand', {});
    await wait(80);
    const p = room.state.players.get(a.sessionId)!;
    expect(p.seat).toBe(-1);
    expect([p.x, p.z]).toEqual([sofa.stand.x, sofa.stand.z]);
  });

  it('walking off a seat stands you up first', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { theme: 'home' });
    const a = await colyseus.connectTo(room, { name: 'A', look });
    await room.waitForNextPatch();
    standAt(room, a.sessionId, sofa.stand.x, sofa.stand.z);
    a.send('sit', { seat: sofa.id });
    await wait(150);
    a.send('move', { x: sofa.stand.x + 0.2, z: sofa.stand.z, dir: 0, moving: true });
    await wait(80);
    const p = room.state.players.get(a.sessionId)!;
    expect(p.seat).toBe(-1);
    expect(p.x).toBeCloseTo(sofa.stand.x + 0.2, 1);
  });

  it('doze off after a while doing nothing; wake up when you do something', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { theme: 'home' });
    const a = await colyseus.connectTo(room, { name: 'A', look });
    await room.waitForNextPatch();
    room.advance(DOZE_AFTER + 1);
    expect(room.state.players.get(a.sessionId)!.dozing).toBe(true);
    a.send('emote', { kind: 'nod' });
    await wait(80);
    expect(room.state.players.get(a.sessionId)!.dozing).toBe(false);
  });
});

describe('오늘 하루 어땠어요?', () => {
  it('your first answer shows on your name and sets how charged you arrive', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    await room.waitForNextPatch();
    a.send('mood', { mood: 'drained' });
    await wait(80);
    const p = room.state.players.get(a.sessionId)!;
    expect(p.mood).toBe('drained');
    expect(p.energy).toBe(MOOD_ENERGY.drained);
  });

  it('changing your mind later changes the face, not the energy; nonsense is ignored', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    await room.waitForNextPatch();
    a.send('mood', { mood: 'drained' });
    await wait(60);
    a.send('mood', { mood: 'hyped' });
    await wait(60);
    const p = room.state.players.get(a.sessionId)!;
    expect(p.mood).toBe('hyped');
    expect(p.energy).toBe(MOOD_ENERGY.drained);
    a.send('mood', { mood: 'furious' });
    await wait(60);
    expect(p.mood).toBe('hyped');
  });
});

describe('party themes', () => {
  it('a pool party room tells everyone its theme', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { title: '풀파티', theme: 'pool' });
    const c = await colyseus.connectTo(room, { name: 'A', look });
    await room.waitForNextPatch();
    await wait(50);
    expect((c.state as any).theme).toBe('pool');
  });

  it('an unknown theme becomes the gallery', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { theme: 'moon' });
    expect(room.state.theme).toBe('gallery');
  });

  it('walls follow the room theme: the gallery partition is not in the pool party', async () => {
    // x=11→13 at z=-4 crosses the gallery's first partition; the pool party is open air
    for (const [theme, blocked] of [['gallery', true], ['pool', false]] as const) {
      const room = await colyseus.createRoom<PartyRoom>('party', { theme });
      const c = await colyseus.connectTo(room, { name: 'A', look });
      await room.waitForNextPatch();
      const p = room.state.players.get(c.sessionId)!;
      p.x = 11.6; p.z = -2.4;
      await wait(120);
      c.send('move', { x: 12.4, z: -2.4, dir: 0, moving: true });
      await wait(120);
      if (blocked) expect(p.x).toBeLessThan(12);
      else expect(p.x).toBeCloseTo(12.4, 1);
    }
  });

  it('lists each room with its theme', async () => {
    await colyseus.createRoom('party', { title: '우리집', theme: 'home' });
    const res = await colyseus.http.get('/rooms');
    const home = (res.data as any[]).find(r => r.title === '우리집');
    expect(home.theme).toBe('home');
  });
});

describe('room info', () => {
  it('syncs the title and privacy to clients', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { title: '금요일 밤', private: true });
    const c = await colyseus.connectTo(room, { name: 'A', look });
    await room.waitForNextPatch();
    await wait(50);
    expect((c.state as any).title).toBe('금요일 밤');
    expect((c.state as any).isPrivate).toBe(true);
  });
});

describe('manager page', () => {
  it('refuses the stats without the password', async () => {
    const res = await fetch('http://localhost:2568/admin/api/stats');
    expect(res.status).toBe(401);
  });
  it('shows who is online and from where', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { title: '금요일 밤' });
    await colyseus.connectTo(room, { name: '유진', look, tz: 'Asia/Seoul' });
    await wait(50);
    const auth = 'Basic ' + Buffer.from('admin:test-pass').toString('base64');
    const res = await fetch('http://localhost:2568/admin/api/stats', { headers: { authorization: auth } });
    expect(res.status).toBe(200);
    const s = await res.json();
    expect(s.online).toBe(1);
    expect(s.people[0]).toMatchObject({ name: '유진', room: '금요일 밤', region: '대한민국 · 서울' });
    expect(s.rooms[0]).toMatchObject({ title: '금요일 밤', clients: 1 });
  });
  it('serves the manager page itself behind the same password', async () => {
    expect((await fetch('http://localhost:2568/admin')).status).toBe(401);
    const auth = 'Basic ' + Buffer.from('admin:test-pass').toString('base64');
    const res = await fetch('http://localhost:2568/admin', { headers: { authorization: auth } });
    expect(await res.text()).toContain('파티 관리');
  });
});

describe('one server for everything', () => {
  it('serves the web page from the same address as the game', async () => {
    const res = await fetch('http://localhost:2568/');
    expect(res.status).toBe(200);
    expect(await res.text()).toContain('퇴근 파티');
  });
  it('still answers the game routes', async () => {
    expect((await fetch('http://localhost:2568/health')).status).toBe(200);
    expect(Array.isArray(await (await fetch('http://localhost:2568/rooms')).json())).toBe(true);
  });
});

describe('🎆 fireworks at the pool party', () => {
  const booth = { x: 37, z: -3.0 }; // on the sand in front of the DJ booth

  it('from the DJ booth, everyone at the party sees them (not just people nearby)', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { theme: 'pool' });
    const dj = await colyseus.connectTo(room, { name: 'DJ', look });
    const far = await colyseus.connectTo(room, { name: 'far', look });
    await room.waitForNextPatch();
    Object.assign(room.state.players.get(dj.sessionId)!, booth);
    room.state.players.get(far.sessionId)!.x = 3; // over at the cabana bar
    const got: { from: string; seed: number }[] = [];
    far.onMessage('firework', (m: any) => got.push(m));
    dj.onMessage('firework', () => {});
    dj.send('firework', {});
    await wait(150);
    expect(got).toHaveLength(1);
    expect(got[0].from).toBe(dj.sessionId);
    expect(Number.isInteger(got[0].seed)).toBe(true);
  });

  it('not from the middle of the pool, not at other parties, and not every second', async () => {
    const pool = await colyseus.createRoom<PartyRoom>('party', { theme: 'pool' });
    const a = await colyseus.connectTo(pool, { name: 'A', look });
    await pool.waitForNextPatch();
    let n = 0;
    a.onMessage('firework', () => n++);
    Object.assign(pool.state.players.get(a.sessionId)!, { x: 20, z: 0 });
    a.send('firework', {});
    await wait(120);
    expect(n).toBe(0);                      // too far from the booth
    Object.assign(pool.state.players.get(a.sessionId)!, booth);
    a.send('firework', {}); a.send('firework', {}); a.send('firework', {});
    await wait(150);
    expect(n).toBe(1);                      // one volley, then a short wait

    const home = await colyseus.createRoom<PartyRoom>('party', { theme: 'home' });
    const h = await colyseus.connectTo(home, { name: 'H', look });
    let m = 0;
    h.onMessage('firework', () => m++);
    h.send('firework', {});
    await wait(120);
    expect(m).toBe(0);
  });
});

describe('⏰ work hours over your head', () => {
  it('arrive with them, change them, hide them — and nonsense is dropped', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look, hours: '0900-1800+540' });
    const b = await colyseus.connectTo(room, { name: 'B', look, hours: '<b>always</b>' });
    await room.waitForNextPatch();
    expect(room.state.players.get(a.sessionId)!.hours).toBe('0900-1800+540');
    expect(room.state.players.get(b.sessionId)!.hours).toBe('');
    a.send('hours', { hours: '1000-1900+540' });
    await wait(120);
    expect(room.state.players.get(a.sessionId)!.hours).toBe('1000-1900+540');
    expect((b.state as any).players.get(a.sessionId).hours).toBe('1000-1900+540'); // everyone sees it
    a.send('hours', { hours: '' });
    await wait(120);
    expect(room.state.players.get(a.sessionId)!.hours).toBe('');
  });
});

describe('🚪 going home', () => {
  it('everyone is told once, and the leaver gets up from their seat', async () => {
    const room = await colyseus.createRoom('party', {});
    const a = await colyseus.connectTo(room, { name: '가는이' });
    const b = await colyseus.connectTo(room, { name: '남는이' });
    const got: any[] = [];
    b.onMessage('bye', (m: any) => got.push(m));
    a.onMessage('bye', () => {});
    a.send('bye', {}); a.send('bye', {});
    await room.waitForNextPatch();
    await new Promise(r => setTimeout(r, 50));
    expect(got).toEqual([{ from: a.sessionId }]);
  });
});

describe('🥂 짠! and company', () => {
  it('two guests near each other who both cheer clink: both charge a little, once', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: '하나' });
    const b = await colyseus.connectTo(room, { name: '둘' });
    const got: any[] = [];
    for (const c of [a, b]) { c.onMessage('emote', () => {}); c.onMessage('clink', (m: any) => got.push(m)); }
    const before = [...room.state.players.values()].map(p => p.energy);
    a.send('emote', { kind: 'cheers' });
    b.send('emote', { kind: 'cheers' });
    await new Promise(r => setTimeout(r, 80));
    b.send('emote', { kind: 'cheers' }); // again straight away: no second clink
    await new Promise(r => setTimeout(r, 80));
    expect(got.filter(m => m.a === b.sessionId && m.b === a.sessionId)).toHaveLength(2); // one clink, heard by both
    const after = [...room.state.players.values()].map(p => p.energy);
    expect(after).toEqual(before.map(e => e + 3));
  });
  it('a cheer on your own is just a cheer', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: '혼자' });
    let n = 0;
    a.onMessage('emote', () => {}); a.onMessage('clink', () => n++);
    a.send('emote', { kind: 'cheers' }); a.send('emote', { kind: 'cheers' });
    await new Promise(r => setTimeout(r, 80));
    expect(n).toBe(0);
  });
});
