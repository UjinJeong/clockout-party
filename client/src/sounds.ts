/**
 * Developer-only sound check (served by `npm run dev` at /sounds.html, never built):
 * renders every effect and a few bars of each place's music offline and reports
 * peak / loudness, the same chain the party uses (bus level → limiter).
 * window.renders holds WAV data URLs for listening.
 */
import { THEMES } from '@party/shared';
import { SFX, type SfxName } from './audio/sfx';
import { renderBars } from './audio/music';
import { noise } from './audio/synth';
import { MUSIC_LEVEL, SFX_LEVEL } from './audio/sound';

const RATE = 44100;
type Row = { name: string; secs: number; peak: number; rms: number; clipped: number };
const rows: Row[] = [];
const wavs: Record<string, string> = {};

async function render(name: string, secs: number, level: number, build: (c: OfflineAudioContext, out: AudioNode) => void) {
  const c = new OfflineAudioContext(2, Math.ceil(secs * RATE), RATE);
  const limit = c.createDynamicsCompressor();
  limit.threshold.value = -10; limit.knee.value = 8; limit.ratio.value = 6; limit.attack.value = 0.004; limit.release.value = 0.2;
  limit.connect(c.destination);
  const bus = c.createGain(); bus.gain.value = level; bus.connect(limit);
  build(c, bus);
  const buf = await c.startRendering();
  let peak = 0, sum = 0, clipped = 0;
  for (let ch = 0; ch < 2; ch++) for (const v of buf.getChannelData(ch)) { const a = Math.abs(v); peak = Math.max(peak, a); sum += v * v; if (a >= 0.999) clipped++; }
  rows.push({ name, secs, peak: +peak.toFixed(3), rms: +Math.sqrt(sum / (buf.length * 2)).toFixed(4), clipped });
  wavs[name] = wav(buf);
}

function wav(b: AudioBuffer): string {
  const n = b.length, out = new DataView(new ArrayBuffer(44 + n * 2));
  const w = (o: number, s: string) => [...s].forEach((ch, i) => out.setUint8(o + i, ch.charCodeAt(0)));
  w(0, 'RIFF'); out.setUint32(4, 36 + n * 2, true); w(8, 'WAVEfmt '); out.setUint32(16, 16, true);
  out.setUint16(20, 1, true); out.setUint16(22, 1, true); out.setUint32(24, RATE, true); out.setUint32(28, RATE * 2, true);
  out.setUint16(32, 2, true); out.setUint16(34, 16, true); w(36, 'data'); out.setUint32(40, n * 2, true);
  const l = b.getChannelData(0), r = b.getChannelData(1);
  for (let i = 0; i < n; i++) out.setInt16(44 + i * 2, Math.max(-1, Math.min(1, (l[i] + r[i]) / 2)) * 32767, true);
  let s = ''; const u = new Uint8Array(out.buffer); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000));
  return 'data:audio/wav;base64,' + btoa(s);
}

(async () => {
  for (const name of Object.keys(SFX) as SfxName[]) await render(name, name === 'lift' ? 4 : 2.2, SFX_LEVEL, (c, out) => SFX[name](c, out, 0.05, 1));
  // the worst case: a crowd all cheering at once, right next to you
  await render('crowd-cheers x8', 2.5, SFX_LEVEL, (c, out) => { for (let i = 0; i < 8; i++) SFX.cheers(c, out, 0.05 + i * 0.04, 0.9 + i * 0.03); });
  for (const t of THEMES) {
    await render(`music-${t}`, 20, MUSIC_LEVEL, (c, out) => { renderBars(c, out, t, 6); });
    await render(`music-${t}-night`, 16, MUSIC_LEVEL, (c, out) => { renderBars(c, out, t, 4, true); });
  }
  void noise;
  (window as unknown as { report: Row[]; renders: Record<string, string> }).report = rows;
  (window as unknown as { renders: Record<string, string> }).renders = wavs;
  document.getElementById('out')!.textContent = rows.map(r => `${r.name.padEnd(20)} peak ${r.peak}  rms ${r.rms}  clipped ${r.clipped}`).join('\n');
})();
