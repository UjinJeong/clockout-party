import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { GALLERY, GALLERY_LAYOUT, HALL_MOTIONS, shownIn } from '@party/shared';
import { ART, slotsFor, ROOM_INFO } from '../src/world/art';
import { motionFor } from '../src/world/livingWall';

describe('the 3D gallery follows the halls list', () => {
  it('viewer halls follow the gallery file (no hand-written list)', () => {
    const src = readFileSync(new URL('../src/living/viewer.js', import.meta.url), 'utf8');
    expect(src).toContain('GALLERY.halls');
    expect(src).not.toMatch(/\{\s*id\s*:\s*'garden'/);
  });
  it('every shown painting has a slot', () => {
    for (const h of GALLERY.halls) {
      expect(slotsFor(h.id).length).toBe(shownIn(GALLERY, h.id));
      expect(ART.filter(a => a.room === h.id).length).toBeLessThanOrEqual(slotsFor(h.id).length);
    }
  });
  it('slots come from the layout', () => {
    for (const s of GALLERY_LAYOUT.spans.slice(1)) expect(slotsFor(s.hall!.id)).toEqual(s.slots);
    expect(slotsFor('nope')).toEqual([]);
  });
  it('a hall moves its paintings the way its file says; the lobby stays still', () => {
    for (const h of GALLERY.halls) expect(motionFor(h.id)).toEqual(HALL_MOTIONS[h.motion]);
    expect(motionFor('lobby')).toEqual(HALL_MOTIONS.still);
  });
  it('room names and colours come from the halls', () => {
    for (const h of GALLERY.halls) expect(ROOM_INFO[h.id].name).toBe(h.name);
  });
});
