export function initImageViewer() {
  const dialog = document.querySelector('.image-viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  let picture;
  const caption = dialog.querySelector('.viewer-caption p');
  const status = dialog.querySelector('.viewer-status');
  const original = dialog.querySelector('.viewer-original');
  let returnFocus;
  let request = 0;
  let pending;
  function cancelLoad() {
    request++;
    if (pending) { pending.onload = null; pending.onerror = null; pending = null; }
  }
  document.querySelectorAll('[data-image-viewer]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); cancelLoad();
      const currentRequest = request;
      const sourceImage = link.querySelector('img');
      returnFocus = link;
      caption.textContent = sourceImage.alt;
      original.href = link.href;
      picture?.remove(); picture = null;
      status.textContent = dialog.dataset.loadingLabel;
      status.hidden = false;
      document.body.classList.add('viewer-open');
      if (!dialog.open) dialog.showModal();
      pending = new Image();
      pending.alt = sourceImage.alt;
      pending.className = 'viewer-image';
      pending.onload = () => {
        if (request !== currentRequest || !dialog.open) return;
        picture = pending;
        dialog.querySelector('.viewer-canvas').append(picture);
        status.hidden = true;
        pending = null;
      };
      pending.onerror = () => {
        if (request !== currentRequest || !dialog.open) return;
        status.textContent = dialog.dataset.errorLabel; pending = null;
      };
      pending.src = link.href;
    });
  });
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not([disabled]), a[href]')];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    cancelLoad(); document.body.classList.remove('viewer-open');
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });
}
