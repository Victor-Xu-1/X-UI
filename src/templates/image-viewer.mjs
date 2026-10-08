import { interactionCopy } from '../content/interaction-copy.mjs';

export function imageViewer(lang) {
  const c = interactionCopy[lang];
  return `<dialog class="image-viewer" aria-labelledby="image-viewer-title" data-loading-label="${c.loadingImage}" data-error-label="${c.imageError}">
    <div class="viewer-toolbar"><h2 id="image-viewer-title">${c.imageTitle}</h2><button type="button" class="viewer-close" aria-label="${c.closeImage}"><span aria-hidden="true">×</span></button></div>
    <div class="viewer-canvas"><p class="viewer-status" role="status"></p></div>
    <div class="viewer-caption"><p></p><a class="viewer-original" target="_blank" rel="noopener noreferrer">${c.openOriginal}<span aria-hidden="true">↗</span></a></div>
  </dialog>`;
}
