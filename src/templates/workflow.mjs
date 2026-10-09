import { copy } from '../content/copy.mjs';
import { interactionCopy } from '../content/interaction-copy.mjs';
import { products, productPath } from '../content/products.mjs';
import { arrow } from './icons.mjs';
import { escape } from './layout.mjs';
import { workflowMap } from './workflow-map.mjs';

const stages = [
  ['x-pharma', 'x-patentsar'], ['x-science', 'x-dde'],
  ['x-dde'], ['x-synth'],
];

export function workflowExplorer(lang) {
  const c = copy[lang];
  const ui = interactionCopy[lang];
  return `<div class="workflow-explorer" data-workflow>
    <p class="workflow-prompt">${ui.chooseStage}</p>
    <div class="workflow-track" data-stage-list aria-label="${ui.chooseStage}">${stages.map((ids, i) => `<div class="workflow-step">
      <div class="step-top"><span>0${i + 1}</span>${arrow}</div>
      <h3><a href="#stage-panel-${i}" class="stage-button" id="stage-${i}" data-stage="${i}" aria-controls="stage-panel-${i}">${c.workflowSteps[i]}</a></h3>
      <div class="step-products">${ids.map(id => { const p = products.find(p => p.id === id); return `<a href="${productPath(p, lang)}">${p.name}</a>`; }).join('')}</div>
    </div>`).join('')}</div>
    <div class="stage-panels">${stages.map((ids, i) => `<section class="stage-panel" id="stage-panel-${i}" data-stage-panel="${i}" aria-labelledby="stage-${i}">
      <div class="stage-intro"><span class="stage-number" aria-hidden="true">0${i + 1}</span><div><h3>${c.workflowSteps[i]}</h3><p>${ui.stageDescriptions[i]}</p>${workflowMap(i)}</div></div>
      <div class="stage-recommendations" aria-label="${ui.stageTools}">${ids.map(id => { const p = products.find(p => p.id === id); return `<a class="stage-tool" href="${productPath(p, lang)}"><span><strong>${p.name}</strong><small>${escape(p.label[lang])}</small></span>${arrow}</a>`; }).join('')}</div>
    </section>`).join('')}</div>
  </div>`;
}
