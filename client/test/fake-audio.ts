/** A pretend AudioContext that records what the synth asks for, so sounds can be checked without speakers. */
export class FakeParam {
  value: number;
  /** loudest value an envelope was scheduled to reach (0 = never scheduled) */
  peak = 0;
  constructor(v = 0) { this.value = v; }
  private see(v: number) { this.peak = Math.max(this.peak, Math.abs(v)); return this; }
  setValueAtTime(v: number) { return this.see(v); }
  linearRampToValueAtTime(v: number) { return this.see(v); }
  exponentialRampToValueAtTime(v: number) { if (!(v > 0)) throw new Error('exponential ramp to ' + v); return this.see(v); }
  setTargetAtTime(v: number) { return this.see(v); }
  cancelScheduledValues() { return this; }
}
export class FakeNode {
  outs: FakeNode[] = [];
  starts: number[] = []; stops: number[] = [];
  gain = new FakeParam(1); frequency = new FakeParam(440); detune = new FakeParam(); Q = new FakeParam(1); pan = new FakeParam();
  threshold = new FakeParam(); knee = new FakeParam(); ratio = new FakeParam(); attack = new FakeParam(); release = new FakeParam();
  type = ''; buffer: unknown = null; loop = false;
  constructor(public kind: string, public ctx: FakeCtx) { ctx.nodes.push(this); }
  /** feeds another node's setting (vibrato, FM) rather than the sound itself */
  modulates = false;
  connect(n: FakeNode | FakeParam) { if (n instanceof FakeNode) this.outs.push(n); else this.modulates = true; return n; }
  disconnect() { this.outs = []; }
  start(t = 0) { this.starts.push(t); }
  stop(t = 0) { this.stops.push(t); }
}
export class FakeCtx {
  nodes: FakeNode[] = [];
  currentTime = 0;
  sampleRate = 4000;
  state = 'running';
  destination = new FakeNode('destination', this);
  createGain() { return new FakeNode('gain', this); }
  createOscillator() { return new FakeNode('osc', this); }
  createBiquadFilter() { return new FakeNode('filter', this); }
  createBufferSource() { return new FakeNode('source', this); }
  createStereoPanner() { return new FakeNode('panner', this); }
  createDynamicsCompressor() { return new FakeNode('compressor', this); }
  createConvolver() { return new FakeNode('convolver', this); }
  createBuffer(ch: number, n: number) { const d = Array.from({ length: ch }, () => new Float32Array(n)); return { getChannelData: (c: number) => d[c] }; }
  resume() { this.state = 'running'; return Promise.resolve(); }
  suspend() { this.state = 'suspended'; return Promise.resolve(); }
  /** Does `from` eventually reach `to`? */
  reaches(from: FakeNode, to: FakeNode): boolean {
    const seen = new Set<FakeNode>(); const q = [from];
    while (q.length) { const n = q.pop()!; if (n === to) return true; if (seen.has(n)) continue; seen.add(n); q.push(...n.outs); }
    return false;
  }
}
