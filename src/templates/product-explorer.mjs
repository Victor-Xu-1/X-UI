import { escape, externalLink } from './layout.mjs';
import { cinematicCopy } from '../content/cinematic-copy.mjs';
import { workflowMap } from './workflow-map.mjs';

export function productExplorer(product, lang) {
  const c = cinematicCopy[lang], details = c.products[product.id];
  return `<div class="product-explorer" data-product-explorer><p class="workflow-prompt">${escape(c.stages)}</p><div class="product-stage-tabs" data-product-tablist aria-label="${escape(c.stages)}">${product.steps.map((step,i) => `<a id="product-stage-${i}" href="#product-panel-${i}" data-product-tab aria-controls="product-panel-${i}"><span>0${i+1}</span><strong>${escape(step[lang])}</strong><span aria-hidden="true">→</span></a>`).join('')}</div>
    <div class="product-stage-panels">${product.steps.map((step,i) => `<section id="product-panel-${i}" class="product-stage-panel" data-product-panel aria-labelledby="product-stage-${i}"><div class="product-stage-map">${workflowMap(i, product.id)}<span>${product.name} / 0${i+1}</span></div><div class="product-stage-copy"><h3>${escape(step[lang])}</h3><dl><div><dt>${escape(c.material)}</dt><dd>${escape(details.materials[i])}</dd></div><div><dt>${escape(c.review)}</dt><dd>${escape(details.reviews[i])}</dd></div></dl>${externalLink(product.guide, c.next, 'text-link')}</div></section>`).join('')}</div><p class="explainer-note">${escape(c.stageNote)}</p></div>`;
}
