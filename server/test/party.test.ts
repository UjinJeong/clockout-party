process.env.ADMIN_PASSWORD = 'test-pass';
// a tiny stand-in for the built web client, so the server can be checked serving it
import { mkdtempSync as __mk, writeFileSync as __wr } from 'node:fs';
import { tmpdir as __tmp } from 'node:os';
process.env.CLIENT_DIST = __mk(__tmp() + '/client-');
__wr(process.env.CLIENT_DIST + '/index.html', '<title>액자 밖으로 오프닝 파티</title>');
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { boot, type ColyseusTestServer } from '@colyseus/testing';
import app from '../src/app';
import type { PartyRoom } from '../src/PartyRoom';

let colyseus: ColyseusTestServer;
beforeAll(async () => { colyseus = await boot(app); });
afterAll(async () => { await colyseus.shutdown(); });
afterEach(async () => { await colyseus.cleanup(); });

const look = { kind: 'cat', color: 2, prop: 'wine' };
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

describe('party room', () => {
  it('adds a player with sanitized name and look', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', { title: '테스트' });
    const c = await colyseus.connectTo(room, { name: '  유진 ', look });
    await room.waitForNextPatch();
    const p = room.state.players.get(c.sessionId)!;
    expect(p.name).toBe('유진');
    expect(p.kind).toBe('cat');
    expect(p.prop).toBe('wine');
    expect(p.battery).toBe('charging');
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

  it('toggles the battery status', async () => {
    const room = await colyseus.createRoom<PartyRoom>('party', {});
    const a = await colyseus.connectTo(room, { name: 'A', look });
    a.send('battery', { level: 'low' });
    await wait(80);
    expect(room.state.players.get(a.sessionId)!.battery).toBe('low');
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
    expect(await res.text()).toContain('액자 밖으로');
  });
  it('still answers the game routes', async () => {
    expect((await fetch('http://localhost:2568/health')).status).toBe(200);
    expect(Array.isArray(await (await fetch('http://localhost:2568/rooms')).json())).toBe(true);
  });
});
