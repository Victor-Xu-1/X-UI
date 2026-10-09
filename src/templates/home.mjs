import { copy } from '../content/copy.mjs';
import { redesignCopy } from '../content/redesign-copy.mjs';
import { products, productPath, languagePath } from '../content/products.mjs';
import { externalLink, escape, layout } from './layout.mjs';
import { arrow } from './icons.mjs';
import { card } from './cards.mjs';
import { interactionCopy } from '../content/interaction-copy.mjs';
import { workflowExplorer } from './workflow.mjs';
import { proteinExplorer } from './protein-explorer.mjs';
import { imageExperience } from './image-experience.mjs';

export function homePage(lang) {
  const c = copy[lang];
  const d = redesignCopy[lang];
  const ui = interactionCopy[lang];
  const dde = products.find(product => product.id === 'x-dde');
  const flagship = products.find(product => product.id === 'x-science');
  const body = `<section class="hero"><div class="container hero-grid">
    <div class="hero-copy"><p class="eyebrow">${escape(d.heroEyebrow)}</p>
      <h1>${d.heroLines.map(line => `<span>${escape(line)}</span>`).join('')}</h1>
      <p class="hero-description">${escape(d.heroText)}</p>
      <div class="hero-actions"><a class="button button-primary" href="#software">${escape(d.heroCta)}${arrow}</a><a class="button button-outline" href="${productPath(flagship, lang)}">${escape(d.secondaryCta)}${arrow}</a></div>
    </div>
    <div class="hero-visual hero-molecular">${proteinExplorer(lang,{ambient:true})}</div>
  </div><div class="container hero-bottom"><span>${escape(c.heroFoot)}</span><a href="#software">${escape(d.heroCta)}${arrow}</a></div></section>
  <section id="software" class="section software-section"><div class="container">
    <div class="section-head"><div><p class="eyebrow">${escape(d.collectionEyebrow)}</p><h2>${escape(d.collectionTitle)}</h2></div><p class="section-intro">${escape(d.collectionText)}</p></div>
    <div class="catalog-tools" data-script-only hidden><label class="catalog-search"><span class="search-symbol" aria-hidden="true">⌕</span><span class="visually-hidden">${escape(ui.search)}</span><input type="search" id="catalog-search" placeholder="${escape(ui.searchPlaceholder)}" autocomplete="off" maxlength="120" aria-controls="product-collection"></label><p>${escape(ui.searchHint)}</p></div>
    <div class="collection-toolbar"><div class="filters" role="group" aria-label="${escape(c.filterLabel)}" data-script-only hidden>${Object.entries(c.categories).map(([key, label]) => `<button type="button" class="filter ${key === 'all' ? 'active' : ''}" data-filter="${key}" aria-pressed="${key === 'all'}">${escape(label)}</button>`).join('')}</div><output class="collection-count" aria-live="polite"><span id="product-count">${products.length}</span> ${escape(c.count)}</output></div>
    <div id="product-collection" class="product-grid collection-grid">${products.map((product, index) => card(product, lang, index)).join('')}</div>
    <div class="catalog-empty" hidden><span aria-hidden="true">↗</span><h3>${escape(ui.emptyTitle)}</h3><p>${escape(ui.emptyText)}</p><button class="button button-dark" type="button" data-reset-catalog>${escape(ui.reset)}</button></div>
  </div></section>
  <section id="workflow" class="section research-section"><div class="container">
    <div class="research-intro"><div><p class="eyebrow">${escape(d.methodologyEyebrow)}</p><h2>${escape(d.methodologyTitle)}</h2></div><p>${escape(d.methodologyText)}</p></div>
    ${workflowExplorer(lang)}<p class="workflow-note">${escape(c.workflowNote)}</p>
  </div></section>
  <section class="section proof-section"><div class="container proof-grid">
    <div class="proof-copy"><p class="eyebrow">${escape(d.proofEyebrow)}</p><h2>${escape(d.proofTitle)}</h2><p>${escape(d.proofText)}</p><a class="text-link" href="${productPath(dde, lang)}">X-DDE · ${escape(c.details)}${arrow}</a></div>
    <div class="research-illustration">${imageExperience(lang,{id:'x-dde',compact:true})}</div>
  </div></section>
  <section id="about" class="section about-section"><div class="container about-grid">
    <div><p class="eyebrow">${escape(d.creatorEyebrow)}</p><h2>${escape(d.creatorTitle)}</h2><div class="creator-signature"><span>VX</span><div><strong>Victor Xu</strong><small>${escape(ui.creatorRole)}</small></div></div></div>
    <div class="about-copy"><p>${escape(d.creatorText)}</p><p>${escape(c.aboutText2)}</p><div class="about-links">${externalLink('https://github.com/Victor-Xu-1', d.sourceLink, 'text-link')}${externalLink('https://www.linkedin.com/in/victor-xu-416797427', 'LinkedIn', 'text-link')}</div></div>
  </div></section>
  <section class="contact-section"><div class="contact-art">${imageExperience(lang,{id:'hero',compact:true})}</div><div class="container contact-inner"><div><p class="eyebrow">${escape(d.contactEyebrow)}</p><h2>${escape(d.contactTitle)}</h2><p>${escape(d.contactText)}</p></div>${externalLink('https://www.linkedin.com/in/victor-xu-416797427', c.collaborate, 'button button-dark')}</div></section>`;
  return layout({ lang, path: languagePath(lang), body });
}
