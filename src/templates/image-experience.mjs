import { escape } from './layout.mjs';
import { experienceCopy } from '../content/experience-copy.mjs';
import { commercialCopy } from '../content/commercial-copy.mjs';
import assets from '../content/generated-assets.json' with { type:'json' };
import { products } from '../content/products.mjs';
export function motionControl(lang) {
  const c=experienceCopy[lang];
  return `<button class="motion-control" type="button" data-script-only hidden data-motion-toggle data-pause="${escape(c.pause)}" data-resume="${escape(c.resume)}" data-reduced="${escape(c.reduced)}" aria-pressed="false"><span aria-hidden="true">◌</span><span data-motion-label>${escape(c.pause)}</span></button>`;
}
export function imageExperience(lang,{id='hero',compact=false,priority=false,link}={}) {
  const c=experienceCopy[lang],shared=commercialCopy[lang],asset=assets[id];
  if(!asset)throw new Error('Unknown editorial image');
  const name=id==='hero'?'X-Science':products.find(p=>p.id===id).name;
  const payload={file:'/assets/media/'+asset.file,copy:Object.fromEntries(['loading','ready','unavailable','retry','pause','resume','reduced','paused'].map(key=>[key,c[key]]))};
  return `<figure class="image-experience ${compact?'image-compact':''}" data-image-motion data-image-phase="initial" data-image-playing="false">
    <div class="image-stage"><div class="image-pan"><div class="image-drift"><img data-scene-image src="/assets/media/${asset.file}" width="${asset.width}" height="${asset.height}" alt="${escape(name+' · '+shared.imageLabel)}" loading="${priority?'eager':'lazy'}"${priority?' fetchpriority="high"':''}></div></div><div class="image-light" aria-hidden="true"></div>
      ${link?`<a class="image-card-link" href="${escape(link)}" tabindex="-1" aria-hidden="true"></a>`:''}<div class="image-status" data-image-status role="status"></div>
    </div>
    <figcaption><span>${escape(shared.imageLabel)}</span></figcaption>
    <div class="image-scene-controls">${compact?'':`<button type="button" data-image-pause data-script-only hidden aria-pressed="false"><span data-image-pause-label>${escape(c.pause)}</span><span aria-hidden="true">◌</span></button>`}<button type="button" data-image-retry data-script-only hidden>${escape(c.retry)}</button>${compact?'':`<a href="/assets/media/${asset.file}" data-full-concept target="_blank" rel="noopener noreferrer">${escape(c.fullImage)}<span aria-hidden="true">↗</span></a>`}</div>
    <script type="application/json" data-image-payload>${JSON.stringify(payload).replaceAll('<','\\u003c')}</script>
  </figure>`;
}
