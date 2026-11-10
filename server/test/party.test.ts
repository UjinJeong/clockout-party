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
