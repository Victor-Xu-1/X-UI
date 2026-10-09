import { copy } from '../content/copy.mjs';
import { products, languagePath, productPath } from '../content/products.mjs';
import { layout, escape, headlineLines, externalLink } from './layout.mjs';
import { arrow, glyph } from './icons.mjs';
import { card } from './cards.mjs';
import { interactionCopy } from '../content/interaction-copy.mjs';
import { redesignCopy } from '../content/redesign-copy.mjs';
import { proteinExplorer } from './protein-explorer.mjs';
import { imageExperience } from './image-experience.mjs';
import { useCases } from './use-cases.mjs';

export function productPage(product, lang) {
  const c = copy[lang];
  const ui = interactionCopy[lang];
  const d = redesignCopy[lang];
  const sections = [['capabilities', ui.sectionLabels[0]], ['use-cases', ui.sectionLabels[1]], ['before-you-choose', ui.sectionLabels[2]]];
  const related = products.filter((p) => p.id !== product.id).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, 2);
  const image = product.imageKind === 'screenshot' ? `<figure class="product-capture"><a class="image-zoom-link" data-image-viewer href="/assets/media/${product.image}" target="_blank" rel="noopener noreferrer" aria-label="${c.fullImage}"><img src="/assets/media/${product.image}" alt="${escape(product.caption[lang])}" loading="lazy" width="${product.imageWidth}" height="${product.imageHeight}"><span class="image-zoom-label">${c.fullImage}<span aria-hidden="true">↗</span></span></a><figcaption>${escape(product.caption[lang])} ${externalLink(product.imageSource, c.imageSource)}</figcaption></figure>` : '';
  const body = `<section class="product-hero"><div class="container">
    <a class="back-link" href="${languagePath(lang)}#software">${arrow}${c.back}</a>
    <div class="product-hero-grid"><div><p class="eyebrow">${escape(product.label[lang])}</p><div class="product-name">${glyph(product.id)}<span>${escape(product.name)}</span></div><h1>${headlineLines(product.headline[lang])}</h1><p class="product-lead">${escape(product.summary[lang])}</p>
      <div class="hero-actions">${externalLink(product.release?.url || product.docs, product.release ? c.releases : c.install, 'button button-primary', arrow)}${externalLink(product.repository, c.source, 'button button-outline')}</div>
      <div class="product-license">${c.openSource} · ${product.license}${product.release ? ` · ${product.release.version}` : ''}</div>
    </div><div class="product-hero-art">${product.id==='x-dde'?proteinExplorer(lang):imageExperience(lang, { id: product.id, priority: true })}</div></div>
  </div></section>
  <section class="product-facts"><div class="container facts-grid"><div><span>${c.audience}</span><p>${escape(product.audience[lang])}</p></div><div><span>${c.environment}</span><p>${escape(product.environment[lang])}</p></div><div><span>${c.license}</span><p>${product.license}</p></div></div></section>
  <nav class="product-section-nav" aria-label="${ui.sectionNavigation}"><div class="container">${sections.map(([id, label]) => `<a href="#${id}" data-section-link>${escape(label)}</a>`).join('')}</div></nav>
  <section id="capabilities" class="section product-features"><div class="container"><p class="eyebrow">${escape(d.productCapabilitiesLabel)}</p><h2>${c.capabilities}</h2><div class="capability-grid">${product.features.map((feature, index) => `<div class="capability"><span>0${index + 1}</span><h3>${escape(feature[lang])}</h3></div>`).join('')}</div>${image}</div></section>
  ${useCases(product,lang)}
  <section id="before-you-choose" class="selection-note"><div class="container"><div class="selection-note-inner"><h2>${c.boundaryTitle}</h2><div><p>${escape(product.boundary[lang])}</p><small>${c.facts} ${externalLink(product.repository + '/blob/' + product.revision + '/README.md', 'README')}</small></div></div></div></section>
  <section class="section related-section"><div class="container"><div class="section-head"><div><p class="eyebrow">${c.next}</p><h2>${c.nextTitle}</h2></div><a class="text-link" href="${languagePath(lang)}#software">${c.back}${arrow}</a></div><div class="product-grid related-grid">${related.map((p, index) => card(p, lang, products.indexOf(p))).join('')}</div></div></section>`;
  return layout({ lang, path: productPath(product, lang), product, title: `${product.name} — ${product.label[lang]} | X-Science`, description: product.summary[lang], body });
}
