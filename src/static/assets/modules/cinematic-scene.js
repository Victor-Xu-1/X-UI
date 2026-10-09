// The document owns one movable canvas; a single worker owns all Three work.
export class CinematicScene {
  constructor(environment) {
    if (!('Worker' in window) || !HTMLCanvasElement.prototype.transferControlToOffscreen) throw new Error('Worker 3D is unavailable');
    this.canvas = document.createElement('canvas'); this.canvas.setAttribute('aria-hidden','true');
    const canvas = this.canvas.transferControlToOffscreen();
    this.pending = new Map(); this.sequence = 0;
    const url = new URL('./cinematic-worker.js', import.meta.url);
    url.search = new URL(import.meta.url).search;
    this.worker = new Worker(url, { type:'module', name:'X-Science concept' });
    this.worker.addEventListener('error', event => { event.preventDefault(); this.fail(); });
    this.worker.addEventListener('messageerror', () => this.fail());
    this.worker.addEventListener('message', ({ data }) => {
      if (this.disposed) return;
      if (data.type === 'lost' || data.type === 'error') { this.fail(); return; }
      if (data.type === 'stats' && this.host) {
        this.host.dataset.frames = String(data.frames); this.host.dataset.drawCalls = String(data.calls); this.host.dataset.triangles = String(data.triangles);
        this.host.dataset.bufferWidth = String(data.width); this.host.dataset.bufferHeight = String(data.height);
      }
      if ((data.type === 'ready' || data.type === 'initialized') && this.pending.has(data.id)) {
        const pending = this.pending.get(data.id); clearTimeout(pending.timer); this.pending.delete(data.id); pending.resolve();
      }
    });
    this.initialized = this.request({ type:'init', environment, canvas }, [canvas]);
  }
  request(message, transfer = []) {
    if (this.disposed) return Promise.reject(new Error('Scene unavailable'));
    const id = ++this.sequence;
    return new Promise((resolve,reject) => {
      const timer = setTimeout(() => this.fail(), 25000);
      this.pending.set(id,{resolve,reject,timer});
      try { this.worker.postMessage({ ...message,id },transfer); }
      catch { this.fail(); }
    });
  }
  fail() {
    if (this.disposed) return;
    this.disposed = true; this.worker.terminate();
    for (const pending of this.pending.values()) { clearTimeout(pending.timer); pending.reject(new Error('Scene unavailable')); }
    this.pending.clear(); this.canvas.dispatchEvent(new Event('cinematic-context-lost'));
  }
  size() { return { width:Math.max(1,this.host.clientWidth), height:Math.max(1,this.host.clientHeight), dpr:devicePixelRatio||1, motionHz:innerWidth<760?30:60 }; }
  async attach(host,preset) {
    this.stop(); this.host = host; host.append(this.canvas);
    await this.initialized;
    await this.request({ type:'attach', preset, size:this.size() });
  }
  send(message) { if (!this.disposed) this.worker.postMessage(message); }
  resize() { if (this.host) this.send({ type:'resize', size:this.size() }); }
  rotate(x,y) { this.send({ type:'rotate',x,y }); }
  reset() { this.send({ type:'reset' }); }
  play() { this.send({ type:'play' }); }
  stop() { this.send({ type:'stop' }); }
  dispose() { if (!this.disposed) { this.send({ type:'dispose' }); this.fail(); } this.canvas.remove(); }
}
