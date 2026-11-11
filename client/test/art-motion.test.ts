import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('moving or original paintings', () => {
  let store: Record<string, string>;
  let reduce = false;
  beforeEach(() => {
    vi.resetModules();
    store = {}; reduce = false;
    (globalThis as any).localStorage = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; } };
    (globalThis as any).matchMedia = () => ({ matches: reduce });
  });

  it('moving by default, originals when the device asks for less motion', async () => {
    const m = await import('../src/ui/artMotion');
    expect(m.artMotion()).toBe('live');
    reduce = true;
    expect(m.artMotion()).toBe('still');
  });

  it('remembers the choice and tells whoever is listening (the walls, the viewer)', async () => {
    const m = await import('../src/ui/artMotion');
    const heard: string[] = [];
    const off = m.onArtMotion(v => heard.push(v));
    m.setArtMotion('still');
    expect(m.artMotion()).toBe('still');
    reduce = true; m.setArtMotion('live');
    expect(m.artMotion()).toBe('live'); // an explicit choice beats the device default
    off(); m.setArtMotion('still');
    expect(heard).toEqual(['still', 'live']);
  });

  it('the wall paintings stop breathing in "still" and start again in "live"', async () => {
    const m = await import('../src/ui/artMotion');
    const wall = await import('../src/world/livingWall');
    m.setArtMotion('still');
    for (let i = 0; i < 60; i++) wall.tickLivingWall(1 / 30);
    expect(wall.wallStrength()).toBeLessThan(0.01);
    m.setArtMotion('live');
    for (let i = 0; i < 60; i++) wall.tickLivingWall(1 / 30);
    expect(wall.wallStrength()).toBeGreaterThan(0.95);
  });
});
