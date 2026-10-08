import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { products, productPath } from '../src/content/products.mjs';
import { locales, languages, languagePath, defaultLanguage } from '../src/content/locales.mjs';
import { copy } from '../src/content/copy.mjs';
import { interactionCopy } from '../src/content/interaction-copy.mjs';
import { siteOrigin, sourceRepository } from '../src/content/site.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const software = JSON.parse(await readFile(resolve(root, '../package.json'), 'utf8'));
const paths = languages.flatMap((lang) => [languagePath(lang), ...products.map((p) => productPath(p, lang))]);
let checks = 0;
for (const lang of languages) {
  assert.deepEqual(Object.keys(copy[lang]).sort(), Object.keys(copy.en).sort(), `${lang} must translate the complete shared UI`); checks++;
  assert.deepEqual(Object.keys(interactionCopy[lang]).sort(), Object.keys(interactionCopy.en).sort(), `${lang} must translate every interaction`); checks++;
  for (const [key, value] of Object.entries(interactionCopy[lang])) {
    if (Array.isArray(value)) assert.equal(value.length, interactionCopy.en[key].length, `${lang}.${key} has missing items`);
    for (const text of Array.isArray(value) ? value : [value]) { assert.ok(typeof text === 'string' && text.trim(), `${lang}.${key} is empty`); checks++; }
  }
  for (const product of products) {
    for (const field of ['label', 'headline', 'summary', 'audience', 'environment', 'boundary']) { assert.ok(product[field][lang]?.trim(), `${lang}: ${product.id}.${field}`); checks++; }
    for (const item of [...product.features, ...product.steps]) { assert.ok(item[lang]?.trim()); checks++; }
  }
}
for (const path of paths) {
  const html = await readFile(resolve(root, '.' + path, 'index.html'), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path} must have one h1`); checks++;
  assert.match(html, /<meta name="description" content="[^\"]+"/, `${path} needs a description`); checks++;
  assert.ok(html.includes(`rel="canonical" href="${siteOrigin}${path}"`)); checks++;
  for (const lang of languages) { assert.ok(html.includes(`hreflang="${locales[lang].html}"`)); checks++; }
  assert.equal((html.match(/data-language-target=/g) || []).length, languages.length); checks++;
  assert.ok(!html.includes('undefined') && !html.includes('null</'), `${path} contains missing translations`); checks++;
  const jsonld = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  assert.ok(JSON.parse(jsonld[1])['@type']); checks++;
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^\"]*)"/g)) {
    const clean = url.split(/[?#]/)[0];
    if (!clean) continue;
    const filename = resolve(root, '.' + clean, ...(clean.endsWith('/') ? ['index.html'] : []));
    assert.ok((await stat(filename)).isFile(), `${path}: missing ${clean}`); checks++;
  }
  for (const [, attributes] of html.matchAll(/<img\b([^>]+)>/g)) { assert.match(attributes, attributes.includes('aria-hidden="true"') ? /alt=""/ : /alt="[^\"]+"/); checks++; }
  assert.ok(!html.includes('http://localhost') && !html.includes('127.0.0.1'), 'Local development URLs must not reach production'); checks++;
  assert.ok(!html.includes('pharma-intelligence-platform') && !html.includes('synon-biomed-v0.1.0'), 'Private repositories must not be exposed'); checks++;
  assert.ok(!html.includes('Synon Biomed'), `${path} uses retired display branding`); checks++;
  assert.ok(!html.includes('github.com/Victor-Xu-1/synon-biomed/'), `${path} uses a retired repository link`); checks++;
  assert.ok(!/diffsbdd/i.test(html), `${path} contains an excluded product`); checks++;
  if (path.includes('/products/')) { assert.match(html, /class="product-hero-art">.*?loading="eager" fetchpriority="high"/s, `${path} must prioritize its first-screen artwork`); checks++; }
}
const researchAgent = products.find(product => product.id === 'x-science');
assert.equal(researchAgent?.name, 'X-Science'); checks++;
assert.equal(researchAgent.repository, 'https://github.com/Victor-Xu-1/X-Science'); checks++;
assert.ok(!products.some(product => product.id === 'synon-biomed')); checks++;
for (const lang of languages) {
  assert.equal(productPath(researchAgent, lang), languagePath(lang) + 'products/x-science/'); checks++;
  const html = await readFile(resolve(root, '.' + productPath(researchAgent, lang), 'index.html'), 'utf8');
  assert.ok(html.includes(`<img class="product-glyph" src="/assets/logo.png?v=${software.version}"`)); checks++;
}
assert.deepEqual(products.map((p) => p.id), ['x-science', 'x-pharma', 'x-dde', 'x-synth', 'x-patentsar']); checks++;
assert.ok((await stat(resolve(root, 'assets/social.png'))).size > 1000); checks++;
const siteInfo = JSON.parse(await readFile(resolve(root, 'site-info.json'), 'utf8'));
assert.equal(siteInfo.version, software.version); checks++;
assert.equal(defaultLanguage, 'en'); checks++;
assert.equal(siteInfo.defaultLanguage, 'en'); checks++;
assert.equal(languagePath('en'), '/'); checks++;
assert.equal(languagePath('zh'), '/zh/'); checks++;
const defaultHome = await readFile(resolve(root, 'index.html'), 'utf8');
assert.match(defaultHome, /<html lang="en">/); checks++;
assert.ok(defaultHome.includes(`hreflang="x-default" href="${siteOrigin}/"`)); checks++;
assert.equal(siteInfo.siteOrigin, siteOrigin); checks++;
assert.equal(siteInfo.sourceRepository, sourceRepository); checks++;
assert.equal(siteInfo.sourceLicense, 'MIT'); checks++;
assert.equal(software.homepage, siteOrigin); checks++;
assert.equal(new URL(siteOrigin).protocol, 'https:'); checks++;
assert.equal(software.license, 'MIT'); checks++;
assert.ok(defaultHome.includes(`property="og:image" content="${siteOrigin}/assets/social.png"`)); checks++;
console.log(`PASS: ${checks} generated-page, metadata, accessibility and local-link checks across ${paths.length} pages.`);
