import { build } from 'esbuild';
import { resolve, relative } from 'node:path';
import { rm, writeFile, readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fingerprintAssets } from './build-public-assets.mjs';

export async function buildFrontend(root, output) {
  if (output !== resolve(root, 'dist')) throw new Error('Frontend output must be the owned dist directory');
  const urls = await fingerprintAssets(output);
  const result = await build({
    absWorkingDir: root,
    entryPoints: { app: 'src/static/assets/app.js', site: 'src/static/assets/styles/site.css' },
    outdir: resolve(output, 'assets/build'),
    entryNames: '[name]-[hash]', chunkNames: '[name]-[hash]', assetNames: '[name]-[hash]',
    bundle: true, splitting: true, format: 'esm', target: 'es2022', minify: true,
    metafile: true, legalComments: 'none', loader: { '.woff2': 'file' },
    define: { __PROTEIN_LIBRARY_URL__: JSON.stringify(urls['/assets/vendor/3dmol-xscience/3Dmol-min.js']) },
  });
  const outputs = Object.entries(result.metafile.outputs);
  const publicPath = path => '/' + relative(output, resolve(root, path)).replaceAll('\\', '/');
  const entry = source => outputs.find(([, info]) => info.entryPoint === source)?.[0];
  const app = entry('src/static/assets/app.js'), css = entry('src/static/assets/styles/site.css');
  if (!app || !css) throw new Error('Missing frontend entry');
  urls['/assets/app.js'] = publicPath(app);
  urls['/assets/styles/site.css'] = publicPath(css);
  const imports = outputs.find(([file]) => file === app)[1].imports.filter(item => item.kind === 'import-statement').map(item => publicPath(item.path));
  const font = outputs.find(([file]) => file.endsWith('.woff2'))?.[0];
  if (!font) throw new Error('Missing bundled font');
  const manifest = { schema: 1, app: urls['/assets/app.js'], css: urls['/assets/styles/site.css'], preloads: [publicPath(app), ...imports], font: publicPath(font), assets: urls, outputs: {} };
  for (const [file, info] of outputs) manifest.outputs[publicPath(file)] = { bytes: info.bytes, entryPoint: info.entryPoint, imports: info.imports.map(item => ({ kind: item.kind, path: publicPath(item.path) })) };
  manifest.files = {};
  for (const name of await readdir(resolve(output, 'assets/build'))) {
    const bytes = await readFile(resolve(output, 'assets/build', name));
    manifest.files['/assets/build/' + name] = { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
  }
  await writeFile(resolve(output, 'asset-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  // Only the compiled application is served, never a competing unbundled path.
  for (const path of ['assets/app.js', 'assets/modules', 'assets/styles']) await rm(resolve(output, path), { recursive: true, force: true });
  const preload = manifest.preloads.map(url => `<link rel="modulepreload" href="${url}" fetchpriority="high">`).join('');
  return html => {
    const rewritten = html.replace(/\/assets\/[^\s"'<>]+/g, url => url.endsWith('.pdb') ? url : urls[url] || url);
    return rewritten.replace('<meta charset="utf-8">', '<meta charset="utf-8">' + preload);
  };
}
