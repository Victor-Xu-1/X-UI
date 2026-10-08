import { copy } from '../content/copy.mjs';
import { products, productPath, languagePath } from '../content/products.mjs';
import { externalLink, escape, layout, multiline } from './layout.mjs';
import { arrow, star } from './icons.mjs';
import { heroArt } from './illustrations.mjs';
import { card } from './cards.mjs';

export function homePage(lang) {
  const c = copy[lang];
  const steps = [
    { number: '01', ids: ['x-pharma', 'x-patentsar'] },
    { number: '02', ids: ['synon-biomed', 'x-dde'] },
    { number: '03', ids: ['x-dde', 'diffsbdd-workbench'] },
    { number: '04', ids: ['x-synth'] },
  ];
  const body = `<section class="hero"><div class="container hero-grid">
    <div class="hero-copy"><p class="eyebrow"><span class="small-star">${star}</span>${c.heroLabel}</p>
      <h1>${escape(c.heroLines[0])}<br><em>${escape(c.heroLines[1])}</em></h1>
      <p class="hero-description">${c.heroText}</p>
      <div class="hero-actions"><a class="button button-lime" href="#software">${c.explore}${arrow}</a>${externalLink('https://github.com/Victor-Xu-1', 'GitHub', 'button button-outline')}</div>
      <p class="hero-foot"><span></span>${c.heroFoot}</p>
    </div>
    <div class="hero-visual">${heroArt(lang)}<span class="concept-label">${c.generatedLabel}</span></div>
  </div><div class="container hero-bottom"><span>01 — EXPLORE WHAT’S NEXT</span><a href="#software" aria-label="${c.explore}">${arrow}</a><span>X-SCIENCE.AI</span></div></section>
  <div class="principles"><div class="container principles-inner">${c.strip.map((text) => `<span>${star}${text}</span>`).join('')}</div></div>
  <section id="software" class="section software-section"><div class="container">
    <div class="section-head"><div><p class="eyebrow">${c.productLabel}</p><h2>${c.productTitle}</h2></div><p class="section-intro">${c.productText}</p></div>
    <div class="collection-toolbar"><div class="filters" role="group" aria-label="${c.filterLabel}">${Object.entries(c.categories).map(([key, label]) => `<button type="button" class="filter ${key === 'all' ? 'active' : ''}" data-filter="${key}" aria-pressed="${key === 'all'}">${label}</button>`).join('')}</div><output class="collection-count" aria-live="polite"><span id="product-count">6</span> ${c.count}</output></div>
    <div class="product-grid">${products.map((product, index) => card(product, lang, index)).join('')}</div>
  </div></section>
  <section class="section workbench-section"><div class="container">
    <div class="section-head"><div><p class="eyebrow">${c.featureLabel}</p><h2>${c.featureTitle}</h2></div><div class="section-intro"><p>${c.featureText}</p><a class="text-link" href="${productPath(products[2], lang)}">${c.details} X-DDE${arrow}</a></div></div>
    <figure class="workbench-figure"><a href="/assets/media/x-dde-structure.jpg" target="_blank" rel="noopener noreferrer" aria-label="${c.fullImage}"><img src="/assets/media/x-dde-structure.jpg" alt="${escape(products[2].caption[lang])}" loading="lazy" width="${products[2].imageWidth}" height="${products[2].imageHeight}"></a><figcaption><span class="capture-dot"></span>${c.actualCaption}</figcaption></figure>
  </div></section>
  <section id="workflow" class="section workflow-section"><div class="container">
    <div class="section-head"><div><p class="eyebrow">${c.workflowLabel}</p><h2>${multiline(c.workflowTitle)}</h2></div><p class="section-intro">${c.workflowText}</p></div>
    <div class="workflow-track">${steps.map((step, index) => `<div class="workflow-step"><div class="step-top"><span>${step.number}</span>${arrow}</div><h3>${c.workflowSteps[index]}</h3><div class="step-products">${step.ids.map((id) => { const product = products.find((p) => p.id === id); return `<a href="${productPath(product, lang)}">${product.name}</a>`; }).join('')}</div></div>`).join('')}</div>
    <p class="workflow-note">${c.workflowNote}</p>
  </div></section>
  <section id="about" class="section about-section"><div class="container about-grid">
    <div><p class="eyebrow">${c.aboutLabel}</p><h2>${multiline(c.aboutTitle)}</h2><div class="creator-signature"><span>VX</span><div><strong>Victor Xu</strong><small>Drug discovery scientist & AI tool builder</small></div></div></div>
    <div class="about-copy"><p>${c.aboutText}</p><p>${c.aboutText2}</p><div class="about-links">${externalLink('https://github.com/Victor-Xu-1', c.profile, 'text-link')}${externalLink('https://www.linkedin.com/in/victor-xu-416797427', 'LinkedIn', 'text-link')}</div></div>
  </div></section>
  <section class="contact-section"><div class="container contact-inner"><div><p class="eyebrow">LET’S EXPLORE</p><h2>${multiline(c.contactTitle)}</h2><p>${c.contactText}</p></div>${externalLink('https://www.linkedin.com/in/victor-xu-416797427', c.collaborate, 'button button-dark')}</div></section>`;
  return layout({ lang, path: languagePath(lang), body });
}
