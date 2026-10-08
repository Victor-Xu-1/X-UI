import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname, sep } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 18427);
const nginx = await readFile(resolve(root, '../ops/nginx/site-common.conf'), 'utf8');
const csp = nginx.match(/add_header Content-Security-Policy "([^"]+)" always;/)?.[1];
if (!csp) throw new Error('The managed production CSP is required for preview');
const headers = { 'Content-Security-Policy': csp, 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Cache-Control': 'no-store' };
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.pdb': 'chemical/x-pdb', '.woff2': 'font/woff2' };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let target = resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + sep)) { response.writeHead(403, headers); response.end('Forbidden'); return; }
    try {
      if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html');
      const bytes = await readFile(target);
      response.writeHead(200, { ...headers, 'Content-Type': types[extname(target)] || 'application/octet-stream' });
      response.end(bytes);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      response.writeHead(404, { ...headers, 'Content-Type': 'text/html; charset=utf-8' });
      response.end(await readFile(resolve(root, '404.html')));
    }
  } catch (error) {
    console.error(`Preview error: ${error.code || error.name}`);
    response.writeHead(500, { 'Content-Type': 'text/plain' }); response.end('Preview request failed');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/`));
function shutdown() { server.close(() => process.exit(0)); }
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);
