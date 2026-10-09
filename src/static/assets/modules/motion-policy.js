// One preference governs automatic visual motion throughout this document.
const system = matchMedia('(prefers-reduced-motion: reduce)');
const listeners = new Set();
let paused = false;
try { paused = localStorage.getItem('x-science-motion') === 'paused'; } catch { /* Private browsing may deny preference storage. */ }
export const motionAllowed = () => !paused && !system.matches;
export const motionPauseReason = () => system.matches ? 'system' : paused ? 'user' : null;
export function subscribeMotion(listener) { listeners.add(listener); return () => listeners.delete(listener); }
function publish() {
  document.documentElement.dataset.motion = motionAllowed() ? 'running' : 'paused';
  document.querySelectorAll('[data-motion-toggle]').forEach(button => {
    button.setAttribute('aria-pressed', String(!motionAllowed()));
    button.disabled = system.matches;
    button.querySelector('[data-motion-label]').textContent = system.matches ? button.dataset.reduced : paused ? button.dataset.resume : button.dataset.pause;
  });
  listeners.forEach(listener => listener(motionAllowed()));
}
export function initMotionPolicy() {
  document.querySelectorAll('[data-motion-toggle]').forEach(button => button.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('x-science-motion', paused ? 'paused' : 'running'); } catch { /* In-memory preference still applies. */ }
    publish();
  }));
  system.addEventListener('change', publish);
  publish();
}
