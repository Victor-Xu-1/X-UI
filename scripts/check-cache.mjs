import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const software = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
for (const [, value] of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)) assert.equal(new URL(value, 'https://x-science.ai').searchParams.get('v'), software.version);
let imports = 0;
for (const file of ['app.js', ...(await readdir(resolve(root, 'dist/assets/modules'))).map(name => 'modules/' + name)]) {
  const source = await readFile(resolve(root, 'dist/assets', file), 'utf8');
  for (const [, value] of source.matchAll(/from ['"](\.\/[^'"]+\.js[^'"]*)['"]/g)) {
    assert.equal(new URL(value, 'https://x-science.ai').searchParams.get('v'), software.version); imports++;
  }
}
assert.ok(imports >= 10);
assert.match(await readFile(resolve(root, 'ops/nginx/site-common.conf'), 'utf8'), /add_header Cache-Control "no-cache" always;/);
console.log(`PASS: current release asset URLs, ${imports} module imports and managed revalidation headers.`);
