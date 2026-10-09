import { escape } from './layout.mjs';
import { cinematicCopy } from '../content/cinematic-copy.mjs';
import { products } from '../content/products.mjs';

export function motionControl(lang) {
  const c = cinematicCopy[lang];
  return `<button class="motion-control" type="button" data-script-only hidden data-motion-toggle data-pause="${escape(c.pause)}" data-resume="${escape(c.resume)}" data-reduced="${escape(c.reduced)}" aria-pressed="false"><span aria-hidden="true">◌</span><span data-motion-label>${escape(c.pause)}</span></button>`;
}
export function cinematicPort(lang, { id = 'hero', poster, autostart = false, selector = false, compact = false }) {
  const c = cinematicCopy[lang];
  return `<figure class="cinematic-port ${compact ? 'cinematic-compact' : ''}" data-cinematic data-preset="${id}" data-autostart="${autostart}" data-phase="poster">
    <div class="cinematic-visual"><div class="cinematic-poster">${poster}</div><div class="cinematic-host" data-concept-host tabindex="-1" role="img" aria-label="${escape(c.concept + ' · ' + c.hint)}"></div>
      <div class="cinematic-coordinate" aria-hidden="true"><span>XS / ${id === 'hero' ? '01' : products.findIndex(p => p.id === id) + 1}</span><span>◈</span></div>
      <div class="cinematic-annotation"><span class="concept-dot" aria-hidden="true"></span><span data-concept-perspective>${escape(c.perspectives[Math.max(0, products.findIndex(p => p.id === id))])}</span></div>
      <div class="cinematic-status" data-concept-status role="status"></div>
      <div class="cinematic-controls" data-script-only hidden><button type="button" data-concept-open aria-pressed="false"><span data-concept-open-label>${escape(c.explore)}</span> <span data-concept-symbol aria-hidden="true">◌</span></button><button type="button" data-concept-image hidden>${escape(c.image)}</button><button type="button" data-concept-reset disabled aria-label="${escape(c.reset)}" title="${escape(c.reset)}">↺</button><button type="button" data-concept-retry hidden>${escape(c.retry)}</button></div>
    </div>
    <figcaption>${escape(c.concept)}</figcaption>
    ${selector ? `<div class="concept-perspectives" role="group" aria-label="${escape(c.choose)}" data-script-only hidden>${products.map((p,i) => `<button type="button" data-concept-preset="${p.id}" aria-pressed="${p.id === id}"><small>0${i + 1}</small><span>${escape(c.perspectives[i])}</span></button>`).join('')}</div>` : ''}
  </figure>`;
}
