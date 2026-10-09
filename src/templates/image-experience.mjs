import { escape } from './layout.mjs';
import { experienceCopy } from '../content/experience-copy.mjs';
import { copy } from '../content/copy.mjs';
import assets from '../content/generated-assets.json' with { type:'json' };
import { products } from '../content/products.mjs';

export function motionControl(lang) {
  const c = experienceCopy[lang];
  return `<button class="motion-control" type="button" data-script-only hidden data-motion-toggle data-pause="${escape(c.pause)}" data-resume="${escape(c.resume)}" data-reduced="${escape(c.reduced)}" aria-pressed="false"><span aria-hidden="true">◌</span><span data-motion-label>${escape(c.pause)}</span></button>`;
}
export function imageExperience(lang,{id='hero',gallery=false,compact=false,priority=false,link,wide=false}={}) {
  const c=experienceCopy[lang], shared=copy[lang], asset=assets[id];
  if(!asset)throw new Error('Unknown concept image');
  const name=id==='hero'?c.overview:id==='science-editorial'?'X-Science':products.find(p=>p.id===id).name;
  const known=[{id:'hero',name:c.overview,...assets.hero},...products.map(p=>({id:p.id,name:p.name,...assets[p.id]})),{id:'science-editorial',name:'X-Science',...assets['science-editorial']}].map(({id,name,file,width,height})=>({id,name,file:'/assets/media/'+file,width,height,alt:name+' · '+shared.generatedLabel}));
  const entries=known.filter(entry=>gallery?entry.id!=='science-editorial':entry.id===id);
  const payload={initial:id,entries:gallery?entries:entries.filter(entry=>entry.id===id),copy:Object.fromEntries(['loading','ready','unavailable','retry','pause','resume','reduced','paused'].map(key=>[key,c[key]]))};
  const frameId=`image-frame-${id}`;
  return `<figure class="image-experience ${compact?'image-compact':''} ${wide?'image-wide':''}" data-image-motion data-image-phase="initial" data-image-playing="false">
    <div class="image-stage" id="${frameId}"${gallery?` role="tabpanel" tabindex="0" aria-labelledby="image-choice-0"`:''}>
      <div class="image-pan"><div class="image-drift"><img data-scene-image src="/assets/media/${asset.file}" width="${asset.width}" height="${asset.height}" alt="${escape(name+' · '+shared.generatedLabel)}" loading="${priority?'eager':'lazy'}"${priority?' fetchpriority="high"':''}></div></div>
      <div class="image-light" aria-hidden="true"></div>
      ${link?`<a class="image-card-link" href="${escape(link)}" tabindex="-1" aria-hidden="true"></a>`:''}
      <div class="image-status" data-image-status role="status"></div>
    </div>
    <figcaption><span data-image-name>${escape(name)}</span><span>${escape(shared.generatedLabel)}</span></figcaption>
    <div class="image-scene-controls">${compact?'':`<button type="button" data-image-pause data-script-only hidden aria-pressed="false"><span data-image-pause-label>${escape(c.pause)}</span><span aria-hidden="true">◌</span></button>`}<button type="button" data-image-retry data-script-only hidden>${escape(c.retry)}</button>${compact?'':`<a href="/assets/media/${asset.file}" data-full-concept target="_blank" rel="noopener noreferrer">${escape(c.fullImage)}<span aria-hidden="true">↗</span></a>`}</div>
    ${gallery?`<div class="image-perspectives" role="tablist" aria-label="${escape(c.galleryLabel)}" data-script-only hidden>${entries.map((entry,i)=>`<button id="image-choice-${i}" type="button" role="tab" data-image-choice="${entry.id}" aria-selected="${entry.id===id}" aria-controls="${frameId}" tabindex="${entry.id===id?'0':'-1'}"><small>0${i+1}</small><span>${escape(entry.name)}</span></button>`).join('')}</div>`:''}
    <script type="application/json" data-image-payload>${JSON.stringify(payload).replaceAll('<','\\u003c')}</script>
  </figure>`;
}
