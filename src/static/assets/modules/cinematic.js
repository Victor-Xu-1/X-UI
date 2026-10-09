import { motionAllowed, motionPauseReason, subscribeMotion } from './motion-policy.js';

export function initCinematic() {
  const ports = [...document.querySelectorAll('[data-cinematic]')];
  if (!ports.length) return;
  const copy = JSON.parse(document.querySelector('[data-cinematic-copy]').textContent);
  const visible = new Map();
  let active = ports.find(port => port.dataset.autostart === 'true');
  let scene, loading, failed = false, disposed = false, applying = false, dragging;
  let localPause = false;

  function phase(port, value) {
    port.dataset.phase = value;
    port.setAttribute('aria-busy', String(value === 'loading'));
    const status = port.querySelector('[data-concept-status]');
    status.textContent = value === 'loading' ? copy.loading : value === 'error' ? copy.unavailable : value === 'ready' ? copy.ready : '';
    port.querySelector('[data-concept-host]').tabIndex = value === 'ready' ? 0 : -1;
    port.querySelector('[data-concept-retry]').hidden = value !== 'error';
    port.querySelector('[data-concept-reset]').disabled = value !== 'ready';
    port.querySelector('[data-concept-open]').setAttribute('aria-pressed', String(value === 'ready'));
    port.querySelector('[data-concept-image]').hidden = value !== 'ready';
  }
  function sync() {
    const playing = !!active && !disposed && !failed && active.dataset.phase === 'ready' && visible.get(active) && !document.hidden && motionAllowed() && !localPause;
    if (playing) scene?.play(); else scene?.stop();
    ports.forEach(port => { port.dataset.playing = String(port === active && playing); });
    ports.forEach(port => {
      const button = port.querySelector('[data-concept-open]');
      button.querySelector('[data-concept-open-label]').textContent = port.dataset.phase === 'ready' ? !motionAllowed() ? motionPauseReason() === 'system' ? copy.reduced : copy.paused : localPause ? copy.resume : copy.pause : copy.explore;
      button.disabled = port.dataset.phase === 'error' || port.dataset.phase === 'loading' || port.dataset.phase === 'ready' && !motionAllowed();
      button.setAttribute('aria-pressed', String(port.dataset.phase === 'ready' && localPause));
      button.querySelector('[data-concept-symbol]').textContent = port.dataset.phase === 'ready' && !localPause && motionAllowed() ? 'Ⅱ' : '◌';
    });
  }
  async function prepare(port) {
    if (disposed) return;
    scene?.stop();
    if (active && active !== port) phase(active, 'poster');
    active = port; localPause = false;
    if (failed) { phase(port, 'error'); return; }
    phase(port, 'loading');
    if (applying) return;
    applying = true;
    const preset = port.dataset.preset;
    try {
      if (!loading) {
        loading = Promise.race([
          import('./cinematic-scene.js'),
          new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error('Concept load deadline')), 20000); loadingCleanup = () => clearTimeout(timer); }),
        ]).finally(() => loadingCleanup());
      }
      const { CinematicScene } = await loading;
      if (disposed || active !== port || port.dataset.preset !== preset) return;
      if (!scene) {
        scene = new CinematicScene(copy.environment);
        scene.canvas.addEventListener('cinematic-context-lost', () => {
          failed = true; scene.stop();
          if (active) phase(active, 'error'); sync();
        });
      }
      await scene.attach(port.querySelector('[data-concept-host]'), preset);
      if (disposed || failed) return;
      if (active === port && port.dataset.preset === preset) phase(port, 'ready');
      else if (active !== port) phase(port, 'poster');
      sync();
    } catch {
      failed = true; scene?.stop();
      if (active) phase(active, 'error');
      sync();
    } finally {
      applying = false;
      if (!disposed && !failed && active && (active !== port || active.dataset.preset !== preset)) void prepare(active);
    }
  }
  let loadingCleanup = () => {};
  ports.forEach(port => {
    const host = port.querySelector('[data-concept-host]');
    port.querySelector('[data-concept-open]').addEventListener('click', () => {
      if (active === port && port.dataset.phase === 'ready') { localPause = !localPause; sync(); }
      else void prepare(port);
    });
    port.querySelector('[data-concept-image]').addEventListener('click', () => { if (active === port) { scene?.stop(); active = null; } phase(port, 'poster'); sync(); });
    port.querySelector('[data-concept-reset]').addEventListener('click', () => { if (active === port) { localPause = true; scene?.reset(); sync(); } });
    port.querySelector('[data-concept-retry]').addEventListener('click', () => location.reload());
    port.querySelectorAll('[data-concept-preset]').forEach(button => button.addEventListener('click', () => {
      port.dataset.preset = button.dataset.conceptPreset;
      port.querySelectorAll('[data-concept-preset]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      const label = button.querySelector('span').textContent;
      port.querySelector('[data-concept-perspective]').textContent = label;
      host.setAttribute('aria-label', copy.concept + ' · ' + label + ' · ' + copy.hint);
      void prepare(port);
    }));
    host.addEventListener('pointerdown', event => {
      if (active !== port || port.dataset.phase !== 'ready' || event.button !== 0) return;
      localPause = true; sync(); dragging = { id: event.pointerId, x: event.clientX, y: event.clientY };
      host.setPointerCapture(event.pointerId);
    });
    host.addEventListener('pointermove', event => {
      if (!dragging || dragging.id !== event.pointerId || active !== port) return;
      scene.rotate((event.clientY - dragging.y) * .006, (event.clientX - dragging.x) * .006);
      dragging.x = event.clientX; dragging.y = event.clientY;
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(name => host.addEventListener(name, () => { dragging = null; }));
    host.addEventListener('keydown', event => {
      if (active !== port || port.dataset.phase !== 'ready') return;
      const values = { ArrowLeft: [0, -.12], ArrowRight: [0, .12], ArrowUp: [-.12, 0], ArrowDown: [.12, 0] };
      if (!values[event.key]) return;
      event.preventDefault(); localPause = true; scene.rotate(...values[event.key]); sync();
    });
    if ('ResizeObserver' in window) new ResizeObserver(() => { if (active === port && !failed) scene?.resize(); }).observe(host);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        visible.set(target, isIntersecting);
        if (isIntersecting && target === active && target.dataset.phase === 'poster') void prepare(target);
      }); sync();
    }, { threshold: .12 });
    ports.forEach(port => observer.observe(port));
  } else { ports.forEach(port => visible.set(port, true)); if (active) void prepare(active); }
  subscribeMotion(sync); document.addEventListener('visibilitychange', sync);
  addEventListener('pagehide', event => { scene?.stop(); if (!event.persisted) { disposed = true; scene?.dispose(); } });
  addEventListener('pageshow', () => { if (!disposed) sync(); });
}
