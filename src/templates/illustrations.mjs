import assets from '../content/generated-assets.json' with { type: 'json' };
import { copy } from '../content/copy.mjs';

export function heroArt(lang) {
  const asset = assets.hero;
  return `<img class="hero-image" src="/assets/media/${asset.file}" width="${asset.width}" height="${asset.height}" alt="${copy[lang].heroAlt}" fetchpriority="high">`;
}

export function productArt(product, lang) {
  const asset = assets[product.id];
  if (!asset) throw new Error(`Missing artwork for ${product.id}`);
  return `<div class="product-art"><img src="/assets/media/${asset.file}" width="${asset.width}" height="${asset.height}" alt="${product.name} — ${copy[lang].generatedLabel}" loading="lazy"><span class="art-caption">${copy[lang].generatedLabel}</span></div>`;
}
