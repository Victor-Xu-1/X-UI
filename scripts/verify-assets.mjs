import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { languages, languagePath } from '../src/content/locales.mjs';
import { products, productPath } from '../src/content/products.mjs';
import { redesignCopy } from '../src/content/redesign-copy.mjs';
import { cinematicCopy } from '../src/content/cinematic-copy.mjs';
import { structureCatalog, structureLabels } from '../src/content/structures.mjs';
import provenance from '../src/content/structure-provenance.json' with { type: 'json' };
import poster from '../src/content/structure-poster.json' with { type: 'json' };
import lighting from '../src/content/scene-environment.json' with { type:'json' };
import artwork from '../src/content/generated-assets.json' with { type: 'json' };
import notices from '../ASSET-NOTICES.json' with { type: 'json' };

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
let checks = 0;
function complete(value, reference, location) {
  assert.equal(typeof value, typeof reference, `${location}: mismatched type`); checks++;
  if (typeof value === 'string') { assert.ok(value.trim(), `${location}: missing text`); checks++; }
  else if (Array.isArray(reference)) {
    assert.equal(value.length, reference.length, `${location}: incomplete list`); checks++;
    value.forEach((item, i) => complete(item, reference[i], `${location}.${i}`));
  } else if (reference && typeof reference === 'object') {
    assert.deepEqual(Object.keys(value).sort(), Object.keys(reference).sort(), `${location}: missing keys`); checks++;
    for (const key of Object.keys(reference)) complete(value[key], reference[key], `${location}.${key}`);
  }
}
async function exact(file, expectedBytes, expectedHash) {
  const data = await readFile(resolve(dist, file));
  assert.equal(data.length, expectedBytes, `${file}: changed size`); checks++;
  assert.equal(createHash('sha256').update(data).digest('hex'), expectedHash, `${file}: changed bytes`); checks++;
  return data;
}

for (const language of languages) {
  complete(redesignCopy[language], redesignCopy.en, `redesign.${language}`);
  complete(cinematicCopy[language], cinematicCopy.en, `cinematic.${language}`);
  complete(structureLabels[language], structureLabels.en, `structures.${language}`);
}
assert.deepEqual(Object.keys(artwork).sort(), ['hero', ...products.map(product => product.id), 'science-editorial'].sort()); checks++;
for (const asset of Object.values(artwork)) {
  await exact('assets/media/' + asset.file, asset.bytes, asset.sha256);
  assert.match(asset.role, /concept/i); checks++;
  assert.ok(asset.width > 0 && asset.height > 0); checks++;
}
for (const asset of notices.reusedAssets) await exact('assets/media/' + asset.file, asset.size, asset.sha256);
for (const asset of notices.thirdPartyAssets) await exact('assets/' + asset.file, asset.bytes, asset.sha256);
const font = await readFile(resolve(dist, 'assets/fonts/inter-variable.woff2'));
assert.equal(font.subarray(0, 4).toString('ascii'), 'wOF2'); checks++;
const logo = await readFile(resolve(dist, 'assets/logo.png'));
assert.equal(createHash('sha256').update(logo).digest('hex'), notices.userLogo.sha256); checks++;

assert.deepEqual(structureCatalog.map(item => item.id), ['1UBQ', '4HHB', '2LYZ']); checks++;
for (const model of structureCatalog) {
  const data = await exact(model.file.slice(1), model.bytes, model.sha256);
  const records = data.toString('utf8').split(/\r?\n/).filter(line => /^(ATOM  |HETATM)/.test(line));
  assert.equal(records.length, model.atomCount); checks++;
  assert.equal(records.filter(line => line.startsWith('ATOM  ')).length, model.proteinAtoms); checks++;
  const chains = [...new Set(records.filter(line => line.startsWith('ATOM  ')).map(line => line.slice(21, 22)))].sort();
  assert.deepEqual(chains, model.chainIds); checks++;
  assert.equal(chains.length, model.chainCount); checks++;
  const displayed = records.filter(line => line.startsWith('ATOM  ') || line.slice(17, 20) === 'HEM');
  assert.deepEqual([...new Set(displayed.map(line => line.slice(76, 78).trim().toUpperCase()))].sort(), model.elements); checks++;
  assert.ok(model.resolution > 0 && model.bytes < 1024 * 1024); checks++;
  assert.equal(model.source, `https://www.rcsb.org/structure/${model.id}`); checks++;
  complete(model.names, structureCatalog[0].names, `${model.id}.names`);
  assert.ok(data.toString('utf8').includes('HELIX '), `${model.id}: deposited secondary annotations required`); checks++;
  assert.ok(provenance.structures.find(item => item.id === model.id).primary_citation); checks++;
}
await exact(poster.file, poster.bytes, poster.sha256);
await exact(lighting.asset.file.slice(1),lighting.asset.bytes,lighting.asset.sha256);
assert.equal(lighting.asset.mapping,'CubeUVReflectionMapping');checks++;
assert.equal(lighting.asset.colorSpace,'LinearSRGBColorSpace');checks++;
assert.equal(lighting.asset.flipY,false);checks++;
assert.equal(poster.pdbId, structureCatalog[0].id); checks++;
assert.equal(poster.coordinateSha256, structureCatalog[0].sha256); checks++;
assert.equal(poster.renderer, '3Dmol.js 2.5.5'); checks++;

for (const language of languages) for (const path of [languagePath(language), ...products.map(product => productPath(product, language))]) {
  const html = await readFile(resolve(dist, '.' + path, 'index.html'), 'utf8');
  const conceptPayload = JSON.parse(html.match(/<script type="application\/json" data-cinematic-copy>(.*?)<\/script>/s)[1]);
  assert.deepEqual(conceptPayload.environment,lighting.asset);checks++;
  const expected = !path.includes('/products/') || path.endsWith('/products/x-dde/');
  assert.equal((html.match(/data-protein-viewer /g) || []).length, expected ? 1 : 0, `${path}: viewer placement`); checks++;
  if (!expected) continue;
  const raw = html.match(/<script type="application\/json" data-protein-data>(.*?)<\/script>/s)?.[1];
  const payload = JSON.parse(raw);
  assert.equal(payload.language, language); checks++;
  assert.equal(payload.structures.length, 3); checks++;
  for (const text of Object.values(payload.copy)) { assert.ok(typeof text === 'string' && text.trim()); checks++; }
  for (const item of payload.structures) { assert.equal(item.names[language], structureCatalog.find(model => model.id === item.id).names[language]); checks++; }
  assert.ok(html.includes('aria-describedby="protein-keyboard-hint"') && html.includes('<noscript>')); checks++;
}
const csp = await readFile(resolve(root, 'ops/nginx/site-common.conf'), 'utf8');
assert.ok(csp.includes("script-src 'self';") && csp.includes("worker-src 'self' blob:;")); checks++;
assert.ok(!csp.includes('unsafe-eval')); checks++;
for (const absent of ['assets/media/generated/hero.webp', 'assets/media/synon-concept.png']) {
  await assert.rejects(stat(resolve(dist, absent)), { code: 'ENOENT' }); checks++;
}
console.log(`PASS: ${checks} focused multilingual, artwork, coordinate, dependency, license and molecular-page checks.`);
