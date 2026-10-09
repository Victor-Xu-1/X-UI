import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const manifest = JSON.parse(await readFile(resolve(dist, 'asset-manifest.json'), 'utf8'));
const html = await readFile(resolve(dist, 'index.html'), 'utf8');
assert.equal(manifest.schema, 1);
for (const [url, expected] of Object.entries(manifest.files)) {
  assert.match(url, /^\/assets\/build\/[A-Za-z0-9_-]+-[A-Za-z0-9]{8,16}\.(?:js|css|woff2|png|webp|svg|pdb)$/);
  const bytes = await readFile(resolve(dist, '.' + url));
  assert.equal(bytes.length, expected.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256);
}
for (const url of [manifest.app, manifest.css, ...manifest.preloads]) {
  assert.ok(manifest.files[url], `Unidentified runtime asset: ${url}`);
  assert.ok(html.includes(`"${url}"`), `Missing critical resource: ${url}`);
}
assert.ok(!html.includes('as="font"'), 'The large font must not outrank core interaction code');
assert.ok((await readFile(resolve(dist, '.' + manifest.css), 'utf8')).includes(manifest.font.split('/').pop()));
assert.equal((html.match(/rel="stylesheet"/g) || []).length, 1);
assert.match(html, /type="module" blocking="render"/);
const app = manifest.outputs[manifest.app];
assert.ok(app.bytes < 24000, 'Core application budget exceeded');
assert.ok(manifest.files[manifest.css].bytes < 50000, 'Stylesheet budget exceeded');
const molecular = app.imports.find(item => item.kind === 'dynamic-import');
assert.ok(molecular && manifest.outputs[molecular.path]?.entryPoint.endsWith('/protein-viewer.js'));
assert.ok(!manifest.preloads.includes(molecular.path), '3D must not block core navigation');
for (const [url, info] of Object.entries(manifest.outputs)) for (const dependency of info.imports) {
  assert.ok(manifest.files[dependency.path], `${url}: missing fingerprinted dependency`);
}
for (const path of ['assets/app.js', 'assets/modules', 'assets/styles']) await assert.rejects(access(resolve(dist, path)), { code: 'ENOENT' });
const nginx = await readFile(resolve(root, 'ops/nginx/site-common.conf'), 'utf8');
assert.match(nginx, /set \$x_science_cache "no-cache";/);
assert.match(nginx, /public, max-age=31536000, immutable/);
assert.match(nginx, /root \/var\/www\/x-science\/shared;/);
assert.match(nginx, /add_header Content-Security-Policy/);
console.log(`PASS: ${Object.keys(manifest.files).length} fingerprinted files, bundle budgets, lazy 3D, one stylesheet and retained-asset cache contract.`);
