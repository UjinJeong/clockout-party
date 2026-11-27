import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawn, type ChildProcess } from 'node:child_process';
import { NOTES_KEPT } from '@party/shared';
import { createBoardStore, type BoardStore } from '../src/boardStore';

// A real Redis for the saved kind, when this machine has one (Render's Key Value speaks the same).
const PORT = 6390 + Math.floor(Math.random() * 400);
let redis: ChildProcess | null = null;
beforeAll(async () => {
  try {
    redis = spawn('redis-server', ['--port', String(PORT), '--save', '', '--appendonly', 'no'], { stdio: 'ignore' });
    redis.on('error', () => { redis = null; });
    await new Promise(r => setTimeout(r, 400));
  } catch { redis = null; }
});
afterAll(() => { redis?.kill(); });

const kinds: [string, () => Promise<BoardStore>][] = [
  ['in memory', async () => createBoardStore({})],
  ['in Redis', async () => createBoardStore({ url: `redis://127.0.0.1:${PORT}`, prefix: `t${Math.random().toString(36).slice(2, 8)}:` })],
];

describe.each(kinds)('guest book and hearts kept %s', (kind, make) => {
  const skip = () => kind === 'in Redis' && !redis;
  it('keeps the newest notes per theme, oldest first', async () => {
    if (skip()) return;
    const s = await make();
    for (let k = 0; k < NOTES_KEPT + 3; k++) await s.addNote('gallery', { name: '손님', text: 'n' + k, ts: k });
    await s.addNote('pool', { name: '수영', text: '시원해요', ts: 1 });
    const g = await s.load('gallery');
    expect(g.notes).toHaveLength(NOTES_KEPT);
    expect(g.notes[0].text).toBe('n3');
    expect(g.notes.at(-1)!.text).toBe('n' + (NOTES_KEPT + 2));
    expect((await s.load('pool')).notes.map(n => n.text)).toEqual(['시원해요']);
    await s.close();
  });
  it('remembers who hearted what, and a heart taken back', async () => {
    if (skip()) return;
    const s = await make();
    await s.setLike('gallery', '7', 'v1', true);
    await s.setLike('gallery', '7', 'v2', true);
    await s.setLike('gallery', '3', 'v1', true);
    await s.setLike('gallery', '3', 'v1', false);
    const g = await s.load('gallery');
    expect(Object.fromEntries(Object.entries(g.voters).map(([k, v]) => [k, [...v].sort()]))).toEqual({ '7': ['v1', 'v2'] });
    await s.close();
  });
});

describe('when the saved kind is broken', () => {
  it('says so in .kind and loading gives an empty board instead of failing', async () => {
    const s = createBoardStore({ url: 'redis://127.0.0.1:1' });   // nothing listens there
    const g = await s.load('gallery');
    expect(g).toEqual({ notes: [], voters: {} });
    await expect(s.addNote('gallery', { name: 'a', text: 'b', ts: 1 })).resolves.toBeUndefined();
    expect(s.kind).toBe('redis');
    await s.close();
  });
});
