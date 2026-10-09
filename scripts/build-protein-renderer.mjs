import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const vendor = resolve(dirname(fileURLToPath(import.meta.url)), '../src/vendor/3dmol');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
function within(root, relative) {
  const file = resolve(root, relative);
  assert.ok(file.startsWith(root + sep), 'Renderer path must stay within its owned directory');
  return file;
}
async function pinned(relative, bytes, hash) {
  const source = await readFile(within(vendor, relative));
  assert.equal(source.length, bytes, `${relative}: upstream size changed`);
  assert.equal(sha256(source), hash, `${relative}: upstream hash changed`);
  return source.toString('utf8');
}

export async function buildProteinRenderer(outputDirectory) {
  const manifest = JSON.parse(await readFile(resolve(vendor, 'manifest.json'), 'utf8'));
  assert.equal(manifest.forkId, 'xscience-gloss-1');
  assert.deepEqual(manifest.patches.map(p => p.id), ['lambert.vert', 'lambert.frag', 'lambertdouble.vert', 'lambertdouble.frag']);
  let source = await pinned(manifest.upstream.bundle, manifest.upstream.bytes, manifest.upstream.sha256);
  const inputs = [];
  for (const patch of manifest.patches) {
    const original = await pinned(patch.source, patch.sourceBytes, patch.sourceSha256);
    const replacement = await readFile(within(vendor, patch.replacement), 'utf8');
    assert.ok(replacement.includes('vStudioNormal') && replacement.includes('void main()'), `${patch.id}: invalid studio source`);
    const literal = JSON.stringify(original);
    const pieces = source.split(literal);
    assert.equal(pieces.length, 2, `${patch.id}: expected exactly one upstream shader literal`);
    source = pieces.join(JSON.stringify(replacement));
    inputs.push({ id: patch.id, sha256: sha256(replacement) });
  }
  const output = within(resolve(outputDirectory), manifest.output);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, source);
  for (const notice of manifest.notices) {
    const input = notice === 'NOTICE.txt' ? notice : 'upstream/' + notice;
    await copyFile(within(vendor, input), within(dirname(output), notice));
  }
  return { file: manifest.output, bytes: Buffer.byteLength(source), sha256: sha256(source), inputs };
}
