import { loadProteinLibrary } from './protein-library.js';
import { loadStructure } from './structure-data.js';
import { ProteinScene } from './protein-scene.js';
import { downloadProteinImage } from './protein-export.js';
import { motionAllowed, subscribeMotion } from './motion-policy.js';
import { mountMolecularAtmosphere } from './molecular-atmosphere.js';
import { yieldForInput } from './yield-task.js';

export function initProteinViewer() {
  document.querySelectorAll('[data-protein-viewer]').forEach(root=>root.dataset.proteinMode==='ambient'?mountMolecularAtmosphere(root):mountProteinViewer(root));
}

function mountProteinViewer(root) {
  const data = JSON.parse(root.querySelector('[data-protein-data]').textContent);
  const { copy, structures } = data;
  const canvas = root.querySelector('[data-protein-canvas]');
  const controls = root.querySelector('[data-protein-controls]');
  const select = root.querySelector('[data-protein-select]');
  const representationButtons = [...root.querySelectorAll('[data-representation]')];
  const spinButton = root.querySelector('[data-protein-spin]');
  const statusLayer = root.querySelector('[data-protein-status-layer]');
  const status = root.querySelector('[data-protein-status]');
  const retry = root.querySelector('[data-protein-retry]');
  const zoomButtons = [...root.querySelectorAll('[data-protein-zoom]')];
  const backgroundButton = root.querySelector('[data-protein-background]');
  const exportButton = root.querySelector('[data-protein-export]');
  const exportStatus = root.querySelector('[data-protein-export-status]');
  const wanted = { id: structures[0].id, representation: 'cartoon' };
  const cache = new Map();
  let scene;
  let constructorAttempted = false;
  let visible = false;
  let busy = false;
  let started = false;
  let failedContext = false;
  let reloadRequired = false;
  let spinWanted = motionAllowed();
  let activeId;
  let appliedRepresentation;
  let controller;
  let lightBackground = true;

  function setPhase(phase) {
    root.dataset.phase = phase;
    if (phase === 'ready') root.dataset.poster = 'hidden';
    root.setAttribute('aria-busy', String(phase === 'loading'));
    statusLayer.hidden = phase === 'ready';
    status.textContent = phase === 'unsupported' ? copy.structureUnsupported : phase === 'error' ? copy.structureError : copy.structureLoading;
    retry.hidden = phase !== 'error' && phase !== 'unsupported';
    controls.disabled = phase !== 'ready';
    root.querySelector('[data-protein-ready]').textContent = phase === 'ready' ? copy.structureReady : '';
    zoomButtons.forEach(button => { button.disabled = phase !== 'ready'; });
    syncSpin();
  }
  function syncSpin() {
    const enabled = !!scene && root.dataset.phase === 'ready' && visible && !document.hidden && spinWanted && motionAllowed();
    scene?.spin(enabled);
    root.dataset.spinning = String(enabled);
    spinButton.setAttribute('aria-pressed', String(enabled));
    spinButton.querySelector('[data-spin-label]').textContent = spinWanted && motionAllowed() ? copy.pause : copy.spin;
    spinButton.disabled = !motionAllowed() || root.dataset.phase !== 'ready';
    root.querySelector('[data-protein-motion-note]').hidden = motionAllowed();
  }
  async function applyWanted() {
    if (busy || failedContext || reloadRequired) return;
    busy = true;
    const snapshot = { ...wanted };
    let surfaceAttempted = false;
    const model = structures.find(item => item.id === snapshot.id);
    if (!model) { busy = false; setPhase('error'); return; }
    const job = new AbortController();
    controller = job;
    setPhase('loading');
    exportStatus.hidden = true;
    try {
      const [library, text] = await Promise.all([
        loadProteinLibrary(),
        activeId === model.id ? null : cache.get(model.id) || loadStructure(model, job.signal),
      ]);
      await yieldForInput(job.signal);
      if (failedContext || reloadRequired) return;
      if (!scene) {
        if (constructorAttempted) { setPhase('unsupported'); return; }
        constructorAttempted = true;
        try { scene = new ProteinScene(library, canvas); }
        catch { failedContext = true; setPhase('unsupported'); return; }
      }
      if (activeId !== model.id) {
        cache.set(model.id, text);
        scene.load(text, model);
        activeId = model.id;
      }
      await yieldForInput(job.signal);
      // Surface work settles before another selection/style is allowed to mutate models.
      surfaceAttempted = true;
      await scene.represent(snapshot.representation);
      job.signal.throwIfAborted();
      if (failedContext) return;
      appliedRepresentation = snapshot.representation;
      select.value = model.id;
      representationButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.representation === snapshot.representation)));
      setPhase('ready');
    } catch {
      job.abort();
      // An aborted page-hide fetch must remain recoverable if the document returns.
      if (surfaceAttempted) { reloadRequired = true; root.dataset.recovery = 'reload'; }
      setPhase('error');
    } finally {
      busy = false;
      if (!failedContext && !reloadRequired && (wanted.id !== snapshot.id || wanted.representation !== snapshot.representation)) void applyWanted();
    }
  }

  select.addEventListener('change', () => { wanted.id = select.value; wanted.representation='cartoon'; void applyWanted(); });
  representationButtons.forEach(button => button.addEventListener('click', () => {
    const kind = button.dataset.representation;
    if (kind === appliedRepresentation && root.dataset.phase === 'ready') return;
    wanted.representation = kind;
    void applyWanted();
  }));
  spinButton.addEventListener('click', () => { spinWanted = !spinWanted; syncSpin(); });
  root.querySelector('[data-protein-reset]').addEventListener('click', () => { spinWanted = false; scene?.reset(); syncSpin(); });
  backgroundButton.addEventListener('click', () => {
    lightBackground = !lightBackground;
    root.dataset.background = lightBackground ? 'light' : 'dark';
    backgroundButton.setAttribute('aria-pressed', String(lightBackground));
    scene?.background(lightBackground);
  });
  exportButton.addEventListener('click', async () => {
    if (busy || root.dataset.phase !== 'ready') return;
    busy = true; spinWanted = false; syncSpin(); controls.disabled = true;
    zoomButtons.forEach(button => { button.disabled = true; });
    canvas.style.pointerEvents = 'none';
    exportStatus.hidden = true;
    try {
      await downloadProteinImage(scene.capture(), {caption:data.glue.caption,form:structures.findIndex(item=>item.id===activeId)+1,light:lightBackground});
      exportStatus.textContent = copy.exportReady;
    } catch {
      exportStatus.textContent = copy.exportError;
    } finally {
      busy = false; controls.disabled = root.dataset.phase !== 'ready';
      zoomButtons.forEach(button => { button.disabled = root.dataset.phase !== 'ready'; });
      canvas.style.removeProperty('pointer-events');
      exportStatus.hidden = false;
      syncSpin();
      if (wanted.id !== activeId || wanted.representation !== appliedRepresentation) void applyWanted();
    }
  });
  zoomButtons.forEach(button => button.addEventListener('click', () => { spinWanted = false; scene?.zoom(button.dataset.proteinZoom === 'in' ? 1.15 : 1 / 1.15); syncSpin(); }));
  retry.addEventListener('click', () => {
    if (failedContext || reloadRequired || constructorAttempted && !scene) location.reload();
    else { wanted.representation = 'cartoon'; void applyWanted(); }
  });
  canvas.addEventListener('pointerdown', () => { spinWanted = false; syncSpin(); });
  canvas.addEventListener('keydown', event => {
    if (busy || root.dataset.phase !== 'ready') return;
    const actions = { ArrowLeft: () => scene.rotate(5, 'y'), ArrowRight: () => scene.rotate(-5, 'y'), ArrowUp: () => scene.rotate(5, 'x'), ArrowDown: () => scene.rotate(-5, 'x'), '+': () => scene.zoom(1.15), '=': () => scene.zoom(1.15), '-': () => scene.zoom(1 / 1.15) };
    if (!actions[event.key]) return;
    event.preventDefault(); spinWanted = false; actions[event.key](); syncSpin();
  });
  const contextLost = () => { failedContext = true; setPhase('unsupported'); };
  canvas.addEventListener('webglcontextlost', contextLost, true);
  canvas.addEventListener('protein-context-lost', contextLost);
  subscribeMotion(syncSpin);
  document.addEventListener('visibilitychange', syncSpin);
  addEventListener('pagehide', () => { controller?.abort(); scene?.spin(false); });
  addEventListener('pageshow', syncSpin);
  if ('ResizeObserver' in window) new ResizeObserver(() => { if (scene && !failedContext) scene.resize(); }).observe(canvas);
  if (!('IntersectionObserver' in window)) { visible = true; started = true; void applyWanted(); return; }
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    if (visible && !started) { started = true; void applyWanted(); }
    syncSpin();
  }, { threshold: .12 });
  observer.observe(root.querySelector('.protein-stage'));
}
