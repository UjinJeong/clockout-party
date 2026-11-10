// Turns the demo build's index.html into the page body claude.ai publishes
// (no doctype/html/head/body wrapper — the publisher adds its own skeleton).
// Always run this after `npm run build:demo`, so the published page never
// drifts from the code it loads.
//   node scripts/artifact-html.mjs dist-demo/index.html out.html
import { readFileSync, writeFileSync } from 'node:fs';

const [src = 'dist-demo/index.html', out = 'dist-demo/artifact.html'] = process.argv.slice(2);
const html = readFileSync(src, 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? '';
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
if (!head || !body) throw new Error(`${src}: could not find <head> and <body>`);
const keep = head
  .split('\n')
  .filter(l => !/<meta charset|<meta name="viewport"/i.test(l))
  .map(l => l.trim())
  .filter(Boolean);
writeFileSync(out, [...keep, body.trim(), ''].join('\n'));
console.log(`wrote ${out}`);
