import { describe, expect, it } from 'vitest';
import { MAPS, isWalkable, type Theme } from '@party/shared';
import { wallPieces } from '../src/world/walls';

// The walls you see must be exactly the walls you bump into: a tall wall drawn
// across an open doorway looks like walking through a wall.
describe.each(['gallery', 'home'] as Theme[])('%s walls', theme => {
  const map = MAPS[theme];
  const pieces = wallPieces(map, 3.3, 1.0);

  it('draws a piece for every wall in the map', () => {
    expect(pieces.length).toBe(map.walls.length);
    for (const w of map.walls) {
      expect(pieces.some(p => Math.abs(p.x - (w.x0 + w.x1) / 2) < 1e-6 && p.z0 === w.z0 && p.z1 === w.z1)).toBe(true);
    }
  });

  it('never draws a wall where you can walk through', () => {
    for (const p of pieces) {
      for (let z = p.z0 + 0.05; z < p.z1; z += 0.1) {
        // standing right on the wall line must be blocked wherever a wall is drawn
        expect(isWalkable({ x: p.x, z }, map, 0.01), `${theme} wall at x=${p.x} z=${z.toFixed(2)}`).toBe(false);
      }
    }
  });

  it('leaves every doorway visibly open', () => {
    const xs = [...new Set(pieces.map(p => p.x))];
    for (const x of xs) {
      let open = 0;
      for (let z = map.bounds.z0; z <= map.bounds.z1; z += 0.1) {
        if (isWalkable({ x, z }, map)) {
          open++;
          expect(pieces.some(p => p.x === x && z > p.z0 && z < p.z1), `${theme} door at x=${x} z=${z.toFixed(2)}`).toBe(false);
        }
      }
      expect(open, `${theme} partition at x=${x} has a doorway`).toBeGreaterThan(10);
    }
  });

  it('is tall at the back and low toward the camera', () => {
    for (const p of pieces) expect(p.h).toBe(p.z1 <= 0 ? 3.3 : 1.0);
  });
});
