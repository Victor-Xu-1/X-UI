import { motionAllowed,motionPauseReason,subscribeMotion } from './motion-policy.js';

export function initImageMotion() {
  document.querySelectorAll('[data-image-motion]').forEach(mount);
}
function mount(root) {
  const data=JSON.parse(root.querySelector('[data-image-payload]').textContent);
  let photo=root.querySelector('[data-scene-image]');
  const status=root.querySelector('[data-image-status]');
  const pause=root.querySelector('[data-image-pause]'), retry=root.querySelector('[data-image-retry]');
  const choices=[...root.querySelectorAll('[data-image-choice]')];
  let visible=false,wanted=true,revision=0,pending,pointerFrame=0,current=data.initial,requested=current;
  const version=new URL(import.meta.url).search;
  const url=entry=>entry.file+version;
  function sync() {
    const allowed=motionAllowed(), playing=allowed&&wanted&&visible&&!document.hidden&&root.dataset.imagePhase==='ready';
    root.dataset.imagePlaying=String(playing);
    if(pause){pause.disabled=!allowed;pause.setAttribute('aria-pressed',String(!wanted));pause.querySelector('[data-image-pause-label]').textContent=!allowed?motionPauseReason()==='system'?data.copy.reduced:data.copy.paused:wanted?data.copy.pause:data.copy.resume;}
  }
  function phase(value) {
    root.dataset.imagePhase=value;root.setAttribute('aria-busy',String(value==='loading'));
    status.textContent=value==='loading'?data.copy.loading:value==='error'?data.copy.unavailable:value==='ready'?data.copy.ready:'';
    if(retry)retry.hidden=value!=='error';sync();
  }
  async function choose(id) {
    const entry=data.entries.find(item=>item.id===id);if(!entry)return;
    requested=id;const request=++revision;pending?.removeAttribute('src');phase('loading');
    const image=new Image();image.decoding='async';pending=image;
    let timer;
    try {
      image.src=url(entry);
      await Promise.race([image.decode(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Image deadline')),15000);})]);
      if(request!==revision)return;
      image.width=entry.width;image.height=entry.height;image.alt=entry.alt;image.setAttribute('data-scene-image','');
      photo.replaceWith(image);photo=image;wirePhoto(image);
      root.querySelector('[data-image-name]').textContent=entry.name;
      const link=root.querySelector('[data-full-concept]');if(link)link.href=image.src;
      current=id;root.dataset.currentImage=id;
      choices.forEach(button=>{const selected=button.dataset.imageChoice===id;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;});
      root.querySelector('[role="tabpanel"]')?.setAttribute('aria-labelledby',choices.find(button=>button.dataset.imageChoice===id)?.id);
      phase('ready');
    } catch {if(request===revision)phase('error');}
    finally{clearTimeout(timer);if(request===revision)pending=null;}
  }
  choices.forEach((button,index)=>{
    button.addEventListener('click',()=>void choose(button.dataset.imageChoice));
    button.addEventListener('keydown',event=>{
      const targets={ArrowRight:(index+1)%choices.length,ArrowLeft:(index+choices.length-1)%choices.length,Home:0,End:choices.length-1};
      if(!(event.key in targets))return;event.preventDefault();const next=choices[targets[event.key]];next.focus({preventScroll:true});void choose(next.dataset.imageChoice);
    });
  });
  pause?.addEventListener('click',()=>{wanted=!wanted;if(!wanted)resetPointer();sync();});retry?.addEventListener('click',()=>void choose(requested));
  const resetPointer=()=>{cancelAnimationFrame(pointerFrame);pointerFrame=0;root.style.removeProperty('--image-x');root.style.removeProperty('--image-y');};
  if(matchMedia('(pointer:fine)').matches){
    const stage=root.querySelector('.image-stage');let bounds,point;
    stage.addEventListener('pointerenter',()=>{bounds=stage.getBoundingClientRect();});
    stage.addEventListener('pointermove',event=>{
      if(!motionAllowed()||!wanted||!bounds)return;point={x:event.clientX,y:event.clientY};
      if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;if(!motionAllowed()||!wanted||document.hidden)return;bounds=stage.getBoundingClientRect();root.style.setProperty('--image-x',`${(point.x-bounds.left-bounds.width/2)/bounds.width*10}px`);root.style.setProperty('--image-y',`${(point.y-bounds.top-bounds.height/2)/bounds.height*8}px`);});
    });stage.addEventListener('pointerleave',resetPointer);
  }
  subscribeMotion(allowed=>{if(!allowed)resetPointer();sync();});document.addEventListener('visibilitychange',sync);
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);sync();},{threshold:.1}).observe(root.querySelector('.image-stage'));}else{visible=true;sync();}
  const loaded=()=>{if(photo.naturalWidth>0&&current===requested)phase('ready');};
  function wirePhoto(image){image.addEventListener('load',()=>{if(image===photo)loaded();});image.addEventListener('error',()=>{if(image===photo)phase('error');});}
  wirePhoto(photo);
  if(photo.complete)phase(photo.naturalWidth>0?'ready':'error');else phase('loading');
  addEventListener('pagehide',()=>{revision++;pending?.removeAttribute('src');resetPointer();root.dataset.imagePlaying='false';});
  addEventListener('pageshow',()=>{if(root.dataset.imagePhase==='loading'&&requested!==current)void choose(requested);else if(photo.complete)loaded();sync();});
}
