import { afterEach, describe, expect, it } from 'vitest';
import { playThroughSilentSwitch } from '../src/audio/sound';

const nav = navigator as Navigator & { audioSession?: { type: string } };
afterEach(() => { delete nav.audioSession; });

describe('iPhone silent switch', () => {
  it('asks for playback while sound is on, and gives it back when muted', () => {
    nav.audioSession = { type: 'auto' };
    playThroughSilentSwitch(true);
    expect(nav.audioSession.type).toBe('playback');
    playThroughSilentSwitch(false);
    expect(nav.audioSession.type).toBe('auto');
  });
  it('does nothing on browsers without it (not an iPhone)', () => {
    expect(() => playThroughSilentSwitch(true)).not.toThrow();
  });
});
