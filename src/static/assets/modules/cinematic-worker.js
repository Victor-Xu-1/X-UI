import { CinematicRenderer } from './cinematic-renderer.js';

let scene;
let applying = false;
self.addEventListener('message', async ({ data }) => {
  if (!data || typeof data.type !== 'string') return;
  try {
    if (data.type === 'init') {
      if (typeof self.requestAnimationFrame !== 'function') throw new Error('Worker animation is unavailable');
      if (scene) throw new Error('Only one renderer is permitted');
      scene = new CinematicRenderer(data.environment, data.canvas, stats => self.postMessage({ type:'stats', ...stats }));
      data.canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); scene.lost = true; scene.stop(); self.postMessage({ type:'lost' }); });
      self.postMessage({ type:'initialized', id:data.id });
    } else if (data.type === 'attach' && scene) {
      if (applying) throw new Error('Concurrent scene mutation');
      applying = true;
      try { await scene.attach(data.preset, data.size); self.postMessage({ type:'ready', id:data.id }); }
      finally { applying = false; }
    } else if (data.type === 'resize' && scene) scene.resize(data.size);
    else if (data.type === 'rotate' && scene && Number.isFinite(data.x) && Number.isFinite(data.y)) scene.rotate(data.x, data.y);
    else if (data.type === 'reset' && scene) scene.reset();
    else if (data.type === 'play' && scene && !applying) scene.play();
    else if (data.type === 'stop' && scene) scene.stop();
    else if (data.type === 'dispose' && scene) { scene.dispose(); self.close(); }
  } catch {
    scene?.stop(); self.postMessage({ type:'error', id:data.id });
  }
});
