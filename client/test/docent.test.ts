import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { QUESTIONS, typingSteps } from '../src/living/docent';
import { ANSWERS } from '../src/living/answers';
import ART from '../src/world/artworks.json';

describe('fixed docent answers', () => {
  it('has the four questions', () => expect(QUESTIONS).toHaveLength(4));
  it('answers every question for every painting', () => {
    for (const a of ART as { i: number; title: string }[]) {
      const set = ANSWERS[a.i];
      expect(set, a.title).toBeDefined();
      expect(set).toHaveLength(4);
      for (const t of set) {
        expect(t.length, `${a.title}: ${t}`).toBeGreaterThan(60);
        expect(t.length, `${a.title}: ${t}`).toBeLessThan(260);
      }
    }
  });
  it('never calls Claude from the painting room', () => {
    const src = readFileSync('src/living/viewer.js', 'utf8');
    expect(src).not.toMatch(/use\(\s*['"]sample['"]\s*\)/);
    expect(src).not.toMatch(/\bsample\(/);
  });
});

describe('typing rhythm', () => {
  const text = '먼저 눈을 보세요. 그다음, 입술로 내려오면 돼요!';
  const steps = typingSteps(text);
  it('rebuilds the exact text', () => expect(steps.map(s => s.chunk).join('')).toBe(text));
  it('types in small pieces', () => expect(Math.max(...steps.map(s => s.chunk.length))).toBeLessThanOrEqual(3));
  it('pauses longer after a sentence than mid-word', () => {
    const after = (ch: string) => steps.find(s => s.chunk.endsWith(ch))!.wait;
    const mid = steps.filter(s => /[가-힣]$/.test(s.chunk)).map(s => s.wait);
    expect(after('.')).toBeGreaterThan(Math.max(...mid));
    expect(after(',')).toBeGreaterThan(Math.max(...mid));
  });
  it('is the same every time for the same text', () => expect(typingSteps(text)).toEqual(steps));
});
