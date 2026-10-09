import { readFile, readdir, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, relative, basename, extname } from 'node:path';

// Canonical source assets remain available for provenance; browsers use immutable copies.
export async function fingerprintAssets(output) {
  const assets = resolve(output, 'assets'), compiled = resolve(assets, 'build');
  await mkdir(compiled, { recursive: true });
  const urls = {};
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = resolve(directory, entry.name);
      if (file === compiled) continue;
      if (entry.isDirectory()) { await visit(file); continue; }
      if (!/\.(png|webp|svg|pdb)$/.test(entry.name) && !file.endsWith('3Dmol-min.js')) continue;
      const digest = createHash('sha256').update(await readFile(file)).digest('hex').slice(0, 16);
      const name = basename(file, extname(file)) + '-' + digest + extname(file);
      await copyFile(file, resolve(compiled, name));
      urls['/assets/' + relative(assets, file).replaceAll('\\', '/')] = '/assets/build/' + name;
    }
  }
  await visit(assets);
  return urls;
}
