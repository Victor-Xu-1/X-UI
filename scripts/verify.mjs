import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { products, productPath } from '../src/content/products.mjs';
import { locales, languages, languagePath } from '../src/content/locales.mjs';
import { copy } from '../src/content/copy.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const paths = languages.flatMap((lang) => [languagePath(lang), ...products.map((p) => productPath(p, lang))]);
let checks = 0;
for (const lang of languages) {
  assert.deepEqual(Object.keys(copy[lang]).sort(), Object.keys(copy.en).sort(), `${lang} must translate the complete shared UI`); checks++;
  for (const product of products) {
    for (const field of ['label', 'headline', 'summary', 'audience', 'environment', 'boundary']) { assert.ok(product[field][lang]?.trim(), `${lang}: ${product.id}.${field}`); checks++; }
    for (const item of [...product.features, ...product.steps]) { assert.ok(item[lang]?.trim()); checks++; }
  }
}
for (const path of paths) {
  const html = await readFile(resolve(root, '.' + path, 'index.html'), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path} must have one h1`); checks++;
  assert.match(html, /<meta name="description" content="[^\"]+"/, `${path} needs a description`); checks++;
  assert.match(html, /rel="canonical" href="https:\/\/x-science\.ai\//); checks++;
  for (const lang of languages) { assert.ok(html.includes(`hreflang="${locales[lang].html}"`)); checks++; }
  assert.equal((html.match(/data-language-target=/g) || []).length, languages.length); checks++;
  assert.ok(!html.includes('undefined') && !html.includes('null</'), `${path} contains missing translations`); checks++;
  const jsonld = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  assert.ok(JSON.parse(jsonld[1])['@type']); checks++;
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^\"]*)"/g)) {
    const clean = url.split('#')[0];
    if (!clean) continue;
    const filename = resolve(root, '.' + clean, ...(clean.endsWith('/') ? ['index.html'] : []));
    assert.ok((await stat(filename)).isFile(), `${path}: missing ${clean}`); checks++;
  }
  for (const [, attributes] of html.matchAll(/<img\b([^>]+)>/g)) { assert.match(attributes, attributes.includes('aria-hidden="true"') ? /alt=""/ : /alt="[^\"]+"/); checks++; }
  assert.ok(!html.includes('http://localhost') && !html.includes('127.0.0.1'), 'Local development URLs must not reach production'); checks++;
  assert.ok(!html.includes('pharma-intelligence-platform') && !html.includes('synon-biomed-v0.1.0'), 'Private repositories must not be exposed'); checks++;
}
assert.equal(new Set(products.map((p) => p.id)).size, 6); checks++;
assert.ok((await stat(resolve(root, 'assets/social.png'))).size > 1000); checks++;
console.log(`PASS: ${checks} generated-page, metadata, accessibility and local-link checks across ${paths.length} pages.`);
