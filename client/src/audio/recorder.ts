import { VOICE_MAX_BYTES, VOICE_MAX_MS } from '@party/shared';

/** Records a short voice note with the browser's MediaRecorder (Opus where available). */
export class VoiceRecorder {
  private rec: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private chunks: Blob[] = [];
  private started = 0;
  private stopTimer = 0;
  private resolve: ((r: { blob: Blob; ms: number } | null) => void) | null = null;

  static supported() {
    return typeof window.MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
  }

  get recording() { return !!this.rec && this.rec.state === 'recording'; }
  elapsed() { return this.recording ? Date.now() - this.started : 0; }

  /** Starts recording. Resolves when recording actually begins; throws if the mic is unavailable. */
  async start(): Promise<void> {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    const mime = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/mp4', 'audio/webm']
      .find(m => MediaRecorder.isTypeSupported?.(m));
    this.rec = new MediaRecorder(this.stream, { ...(mime ? { mimeType: mime } : {}), audioBitsPerSecond: 32000 });
    this.chunks = [];
    this.rec.ondataavailable = e => { if (e.data.size) this.chunks.push(e.data); };
    this.rec.onstop = () => {
      const ms = Math.min(VOICE_MAX_MS, Date.now() - this.started);
      const blob = new Blob(this.chunks, { type: (this.rec?.mimeType || mime || 'audio/webm').split(';')[0] });
      this.cleanup();
      const ok = blob.size > 0 && blob.size <= VOICE_MAX_BYTES && ms >= 400;
      this.resolve?.(ok ? { blob, ms } : null);
      this.resolve = null;
    };
    this.started = Date.now();
    this.rec.start(250);
    this.stopTimer = window.setTimeout(() => this.rec?.state === 'recording' && this.rec.stop(), VOICE_MAX_MS);
  }

  /** Stops and returns the note, or null if it was too short. */
  stop(): Promise<{ blob: Blob; ms: number } | null> {
    return new Promise(res => {
      if (!this.rec || this.rec.state !== 'recording') { res(null); return; }
      this.resolve = res;
      this.rec.stop();
    });
  }

  cancel() {
    this.resolve = null;
    if (this.rec && this.rec.state === 'recording') { this.rec.onstop = () => this.cleanup(); this.rec.stop(); }
    else this.cleanup();
  }

  private cleanup() {
    window.clearTimeout(this.stopTimer);
    this.stream?.getTracks().forEach(t => t.stop());
    this.stream = null;
    this.rec = null;
  }
}
