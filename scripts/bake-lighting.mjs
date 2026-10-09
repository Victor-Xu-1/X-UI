// Optional asset maintenance; Chrome/Playwright/Sharp are external dev tools.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve,dirname,join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const output=process.argv[2];if(!output)throw new Error('Pass an external output directory; source assets are not overwritten');
const target=resolve(output);assert.ok(!target.startsWith(root),'Keep generated evidence outside source');await mkdir(target,{recursive:true});
const require=createRequire(import.meta.url);
const dependency=name=>process.env.X_UI_RUNTIME_NODE_MODULES?join(process.env.X_UI_RUNTIME_NODE_MODULES,name):name;
const {chromium}=require(dependency('playwright'));const sharp=require(dependency('sharp'));
const metadata=JSON.parse(await readFile(join(root,'src/content/scene-environment.json'),'utf8'));
const routes=new Map([['/room-spec.json',Buffer.from(JSON.stringify(metadata.bake.roomSpec))],['/bake.js',await readFile(join(root,'scripts/lighting/bake.js'))]]);
for(const name of ['three.module.js','three.core.js'])routes.set('/assets/vendor/three-0.186.1/'+name,await readFile(join(root,'src/static/assets/vendor/three-0.186.1',name)));
const server=createServer((request,response)=>{
  const path=new URL(request.url,'http://127.0.0.1').pathname;
  response.setHeader('Content-Security-Policy',"default-src 'self';script-src 'self';connect-src 'self';object-src 'none'");
  if(path==='/'){response.setHeader('Content-Type','text/html');response.end('<!doctype html><title>X-UI lighting bake</title><script type="module" src="/bake.js"></script>');}
  else if(routes.has(path)){response.setHeader('Content-Type',path.endsWith('.json')?'application/json':'text/javascript');response.end(routes.get(path));}
  else {response.writeHead(path==='/favicon.ico'?204:404);response.end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let browser;
try {
  browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage();await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>window.lightingBake||window.lightingError,{timeout:30000});
  const bake=await page.evaluate(()=>window.lightingBake);assert.ok(bake,'Original lighting bake failed');
  const png=await sharp(Buffer.from(bake.rgba,'base64'),{raw:{width:bake.width,height:bake.height,channels:4}}).png({compressionLevel:9,adaptiveFiltering:true}).toBuffer();
  const sha256=createHash('sha256').update(png).digest('hex');const filename=`lighting-cubeuv-${sha256.slice(0,12)}.png`;
  await writeFile(join(target,filename),png,{flag:'wx'});
  const receipt={file:filename,bytes:png.length,sha256,width:bake.width,height:bake.height,minRGB:bake.minRGB,maxRGB:bake.maxRGB,renderer:metadata.provenance.renderer,browser:browser.version(),samePinnedAsset:sha256===metadata.asset.sha256};
  await writeFile(join(target,'lighting-receipt.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(receipt));
} finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
