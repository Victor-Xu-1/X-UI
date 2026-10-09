// Core controls become interactive before the optional molecular implementation loads.
export function initMolecularLoader() {
  const root = document.querySelector('[data-protein-viewer]');
  if (!root) return;
  let started = false;
  async function start() {
    if (started) return;
    started = true;
    let timer;
    try {
      const module = await Promise.race([
        import('./protein-viewer.js'),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('molecular_module_timeout')), 15000); }),
      ]);
      module.initProteinViewer();
    } catch {
      root.dataset.phase = 'error';
      if (root.dataset.proteinMode === 'ambient') root.querySelector('[data-ambient-status]').hidden = false;
      else {
        const { copy } = JSON.parse(root.querySelector('[data-protein-data]').textContent);
        root.querySelector('[data-protein-status]').textContent = copy.structureError;
        root.querySelector('[data-protein-status-layer]').hidden = false;
        const retry = root.querySelector('[data-protein-retry]');
        retry.hidden = false; retry.addEventListener('click', () => location.reload(), { once: true });
      }
    } finally { clearTimeout(timer); }
  }
  function afterPaint() { requestAnimationFrame(() => setTimeout(() => void start(), 0)); }
  if (!('IntersectionObserver' in window)) { afterPaint(); return; }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); afterPaint(); }
  }, { rootMargin: '200px' });
  observer.observe(root);
}
