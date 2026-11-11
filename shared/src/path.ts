import { AVATAR_RADIUS } from './constants';
import { isWalkable, nearestWalkable, type Vec2, type WorldMap } from './world';

/**
 * A walking route from `from` to `to` that goes around furniture and through
 * doorways: A* on a 25cm grid, then straightened so you walk in long lines
 * instead of zig-zagging cell to cell. Returns the waypoints (start first), or
 * null if there is no way there. A target inside furniture means "next to it".
 */
const STEP = 0.25;
/**
 * Routes keep this much extra room from furniture, so a walker taking small
 * steps (and rounding a little) never clips a corner and stops dead. Only the
 * very start and end may be tighter: a seat's stand-up spot can be snug.
 */
const CLEARANCE = 0.12;

export function findPath(map: WorldMap, from: Vec2, to: Vec2, radius = AVATAR_RADIUS): Vec2[] | null {
  const start = isWalkable(from, map, radius) ? from : nearestWalkable(from, map, radius);
  const goal = isWalkable(to, map, radius) ? to : nearestWalkable(to, map, radius);
  if (lineClear(map, start, goal, radius + CLEARANCE) || Math.hypot(goal.x - start.x, goal.z - start.z) < 0.6 && lineClear(map, start, goal, radius)) {
    return [start, goal];
  }
  const roomy = radius + CLEARANCE;

  const b = map.bounds;
  // the grid sits on round coordinates (multiples of STEP), whatever the map's edges,
  // so narrow gaps between furniture always have a row or column running through them
  const gx = Math.floor(b.x0 / STEP) * STEP, gz = Math.floor(b.z0 / STEP) * STEP;
  const cols = Math.ceil((b.x1 - gx) / STEP) + 1, rows = Math.ceil((b.z1 - gz) / STEP) + 1;
  const cell = (p: Vec2) => [Math.round((p.x - gx) / STEP), Math.round((p.z - gz) / STEP)] as const;
  const at = (c: number, r: number): Vec2 => ({ x: gx + c * STEP, z: gz + r * STEP });
  const open = new Uint8Array(cols * rows); // 0 unknown, 1 walkable, 2 blocked
  const walk = (c: number, r: number) => {
    if (c < 0 || r < 0 || c >= cols || r >= rows) return false;
    const i = r * cols + c;
    if (!open[i]) open[i] = isWalkable(at(c, r), map, roomy) ? 1 : 2;
    return open[i] === 1;
  };

  const [sc, sr] = cell(start), [gc, gr] = cell(goal);
  // the start and goal cells are always usable (they may be snug, like a seat's stand-up spot)
  open[sr * cols + sc] = 1; open[gr * cols + gc] = 1;
  // full precision: with 32-bit costs a rounded-up value made the same route look
  // "better" again and again, and the search never ended
  const g = new Float64Array(cols * rows).fill(Infinity);
  const done = new Uint8Array(cols * rows); // cells already settled: later, staler queue entries are skipped
  const came = new Int32Array(cols * rows).fill(-1);
  const heap: [number, number][] = []; // [f, index]
  const push = (f: number, i: number) => {
    heap.push([f, i]);
    let k = heap.length - 1;
    while (k > 0) { const p = (k - 1) >> 1; if (heap[p][0] <= heap[k][0]) break; [heap[p], heap[k]] = [heap[k], heap[p]]; k = p; }
  };
  const pop = () => {
    const top = heap[0], last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let k = 0;
      for (;;) {
        const l = k * 2 + 1, r = l + 1;
        let m = k;
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
        if (m === k) break;
        [heap[m], heap[k]] = [heap[k], heap[m]]; k = m;
      }
    }
    return top;
  };
  const h = (c: number, r: number) => Math.hypot(c - gc, r - gr);
  const si = sr * cols + sc, gi = gr * cols + gc;
  g[si] = 0; push(h(sc, sr), si);
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  let found = false;
  while (heap.length) {
    const [, i] = pop();
    if (done[i]) continue;
    done[i] = 1;
    if (i === gi) { found = true; break; }
    const c = i % cols, r = (i / cols) | 0;
    for (const [dc, dr] of dirs) {
      const nc = c + dc, nr = r + dr;
      if (!walk(nc, nr)) continue;
      if (dc && dr && (!walk(c + dc, r) || !walk(c, r + dr))) continue; // no squeezing past corners
      const ni = nr * cols + nc, cost = g[i] + (dc && dr ? Math.SQRT2 : 1);
      if (!done[ni] && cost < g[ni] - 1e-9) { g[ni] = cost; came[ni] = i; push(cost + h(nc, nr), ni); }
    }
  }
  if (!found) return null;

  // walk back from the goal, then straighten
  const cells: Vec2[] = [];
  for (let i = gi; i !== -1 && i !== si; i = came[i]) cells.push(at(i % cols, (i / cols) | 0));
  cells.reverse();
  const raw = [start, ...cells.slice(0, -1), goal];
  // straighten: from each point, jump to the furthest one still in clear, roomy sight.
  // (Walkers move one axis at a time, so they stair-step off a diagonal; the extra
  // room keeps those steps clear of corners.) Only a snug start or goal — a seat's
  // stand-up spot, say — makes do with ordinary room for its own leg.
  const snugStart = !isWalkable(start, map, roomy), snugGoal = !isWalkable(goal, map, roomy);
  const out: Vec2[] = [start];
  let k = 0;
  while (k < raw.length - 1) {
    let far = raw.length - 1;
    const room = (a: number, b: number) => ((a === 0 && snugStart) || (b === raw.length - 1 && snugGoal) ? radius : roomy);
    while (far > k + 1 && !lineClear(map, raw[k], raw[far], room(k, far))) far--;
    out.push(raw[far]);
    k = far;
  }
  return out;
}

/** Can you walk straight from a to b without bumping into anything? */
export function lineClear(map: WorldMap, a: Vec2, b: Vec2, radius = AVATAR_RADIUS): boolean {
  const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 0.05));
  for (let k = 0; k <= n; k++) {
    if (!isWalkable({ x: a.x + ((b.x - a.x) * k) / n, z: a.z + ((b.z - a.z) * k) / n }, map, radius)) return false;
  }
  return true;
}
