import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Every element the UI code looks up by id must exist in the page. A missing
// one only shows up at runtime as "Cannot set properties of null", which is
// exactly how an out-of-date published page broke entering the party.
const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8')
  + readFileSync(join(root, 'src/living/markup.ts'), 'utf8');

function files(dir: string): string[] {
  return readdirSync(dir).flatMap(n => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : /\.(ts|js)$/.test(n) && !n.endsWith('.d.ts') ? [p] : [];
  });
}

describe('page ids', () => {
  const used = new Set<string>();
  for (const f of files(join(root, 'src'))) {
    if (f.includes('/living/')) continue; // the painting viewer brings its own markup (checked via markup.ts)
    for (const m of readFileSync(f, 'utf8').matchAll(/\$\('([\w-]+)'\)/g)) used.add(m[1]);
  }

  it('finds the ids the code uses', () => {
    expect(used.size).toBeGreaterThan(20);
    expect(used.has('view-btn')).toBe(true);
  });

  it.each([...used].sort())('#%s is in the page', id => {
    expect(html).toContain(`id="${id}"`);
  });
});
