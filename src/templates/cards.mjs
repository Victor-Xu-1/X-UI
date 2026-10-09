import { productPath } from '../content/products.mjs';
import { copy } from '../content/copy.mjs';
import { escape } from './layout.mjs';
import { arrow } from './icons.mjs';
import { productArt } from './illustrations.mjs';
import { cinematicPort } from './cinematic.mjs';

export function card(product, lang, index = 0) {
  const c = copy[lang];
  return `<article class="product-card" data-category="${product.category}" data-product="${product.id}">
    <div class="art-link">${cinematicPort(lang, { id: product.id, poster: productArt(product, lang), compact: true })}</div>
    <div class="card-body"><div class="card-eyebrow"><span>${escape(product.label[lang])}</span><span class="card-number">0${index + 1}</span></div>
    <h3><a href="${productPath(product, lang)}">${escape(product.name)}</a></h3><p>${escape(product.summary[lang])}</p>
    <div class="card-tags">${product.tags.slice(0, 2).map((tag) => `<span>${escape(tag)}</span>`).join('')}</div>
    <a class="card-link" href="${productPath(product, lang)}" aria-label="${escape(`${c.details} — ${product.name}`)}">${c.details}${arrow}</a></div>
  </article>`;
}
