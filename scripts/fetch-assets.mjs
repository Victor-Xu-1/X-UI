import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assets = [
  { file: 'x-dde-structure.jpg', repository: 'Victor-Xu-1/X-DDE', revision: 'be94cc2dfcbea1bd09e63a19a4820c7278792733', path: 'docs/images/structure-and-pocket.jpg', license: 'Apache-2.0', kind: 'Actual interface capture; v0.4.49 public BRD4–JQ1 example' },
  { file: 'diffsbdd-workbench.png', repository: 'Victor-Xu-1/diffsbdd-workbench', revision: '55f365b195d126ec25f7e7ae00ff253fd4491dac', path: 'docs/workbench.png', license: 'MIT', kind: 'Actual workbench capture using the public DiffSBDD example' },
  { file: 'synon-concept.png', repository: 'Victor-Xu-1/X-Science', revision: 'b13d523be0cec4c4b811fc54397d46f2f562447d', path: 'docs/assets/research-workspace-concept.png', license: 'AGPL-3.0-only; see source repository for component terms', kind: 'AI-generated editorial concept illustration; not an interface or a scientific result' },
];
const directory = resolve(root, 'src/static/assets/media');
await mkdir(directory, { recursive: true });
const notices = await Promise.all(assets.map(async (asset) => {
  const rawUrl = `https://raw.githubusercontent.com/${asset.repository}/${asset.revision}/${asset.path}`;
  const response = await fetch(rawUrl, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`Asset fetch failed: ${asset.file} (${response.status})`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(resolve(directory, asset.file), bytes);
  const notice = { ...asset, source: `https://github.com/${asset.repository}/blob/${asset.revision}/${asset.path}`, sha256: createHash('sha256').update(bytes).digest('hex'), size: bytes.length };
  console.log(`${asset.file}: ${bytes.length} bytes; SHA-256 ${notice.sha256}`);
  return notice;
}));
const noticePath = resolve(root, 'ASSET-NOTICES.json');
let existing = {};
try { existing = JSON.parse(await readFile(noticePath, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
await writeFile(noticePath, JSON.stringify({ ...existing, originalAssets: 'Original website graphics and code: Victor Xu, 2026. Generated artwork is explanatory, not molecular data.', reusedAssets: notices }, null, 2) + '\n');
// Confirm files were written and can be read before the build begins.
await Promise.all(assets.map((asset) => readFile(resolve(directory, asset.file))));
