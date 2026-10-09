import { commercialCopy } from '../content/commercial-copy.mjs';
import { escape,externalLink } from './layout.mjs';

export function useCases(product,lang) {
  const c=commercialCopy[lang],cases=c.products[product.id];
  if(cases?.length!==3)throw new Error('Missing curated product use cases');
  return `<section id="use-cases" class="section use-case-section"><div class="container">
    <div class="section-head"><div><p class="eyebrow">${escape(c.useCasesLabel)}</p><h2>${escape(c.useCasesTitle)}</h2></div></div>
    <div class="use-case-explorer" data-use-cases>
      <div class="use-case-tabs" data-use-case-list aria-label="${escape(c.selectUseCase)}">${cases.map((item,i)=>`<a id="case-${product.id}-${i}" href="#case-panel-${product.id}-${i}" data-use-case-tab aria-controls="case-panel-${product.id}-${i}"><span class="case-number">0${i+1}</span><strong>${escape(item.problem)}</strong><span class="case-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>
      <div class="use-case-panels">${cases.map((item,i)=>`<section class="use-case-panel" id="case-panel-${product.id}-${i}" data-use-case-panel aria-labelledby="case-${product.id}-${i}">
        <div class="case-benefit"><p class="eyebrow">${escape(c.benefitLabel)}</p><h3>${escape(item.benefit)}</h3></div>
        <div class="case-next"><p class="eyebrow">${escape(c.nextStepLabel)}</p><p>${escape(item.nextStep)}</p>${externalLink(product.guide,c.viewGuide,'text-link')}</div>
      </section>`).join('')}</div>
    </div>
  </div></section>`;
}
