import { mkdir, rm, cp, writeFile, readFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copy } from '../src/content/copy.mjs';
import { products, productPath, observedAt } from '../src/content/products.mjs';
import { homePage } from '../src/templates/home.mjs';
import { productPage } from '../src/templates/product.mjs';
import { layout } from '../src/templates/layout.mjs';
import { languages, languagePath } from '../src/content/locales.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
if (output !== root + sep + 'dist') throw new Error('Build output must be the owned dist directory');
const hosting = JSON.parse(await readFile(resolve(root, '.openai/hosting.json'), 'utf8'));
if (hosting.static?.directory !== 'dist' || !hosting.project_id) throw new Error('Set a valid static Sites hosting manifest first');
await Promise.all(products.filter((p) => p.image).map((p) => readFile(resolve(root, 'src/static/assets/media', p.image))));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, 'src/static'), output, { recursive: true });
const urls = [];
async function page(path, html) {
  const destination = resolve(output, '.' + path);
  if (!destination.startsWith(output + sep) && destination !== output) throw new Error('Page path escapes the output directory');
  await mkdir(destination, { recursive: true });
  await writeFile(resolve(destination, 'index.html'), html);
  urls.push(path);
}
for (const lang of languages) {
  await page(languagePath(lang), homePage(lang));
  for (const product of products) await page(productPath(product, lang), productPage(product, lang));
}
const notFound = layout({ lang: 'en', path: '/404.html', title: 'Page not found | X-Science', body: `<section class="not-found"><div class="container"><p>404 · X-SCIENCE</p><h1>${copy.en.notFound}</h1><a class="button button-dark" href="/">${copy.en.goHome}</a></div></section>` });
await writeFile(resolve(output, '404.html'), notFound.replace('<head>', '<head><meta name="robots" content="noindex">'));
await writeFile(resolve(output, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://x-science.ai/sitemap.xml\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>https://x-science.ai${path}</loc><lastmod>${observedAt}</lastmod></url>`).join('')}</urlset>\n`;
await writeFile(resolve(output, 'sitemap.xml'), sitemap);
await writeFile(resolve(output, 'site-info.json'), JSON.stringify({ name: 'X-Science', version: '1.0.0', languages, contentReviewedAt: observedAt, pageCount: urls.length, products: products.map(({ id, revision }) => ({ id, revision })) }, null, 2) + '\n');
console.log(`Built ${urls.length} pages in ${languages.length} languages, 404, sitemap and local assets in ${output}`);
