import { motionAllowed,motionPauseReason,subscribeMotion } from './motion-policy.js';
export function initImageMotion(){document.querySelectorAll('[data-image-motion]').forEach(mount);}
function mount(root) {
  const data=JSON.parse(root.querySelector('[data-image-payload]').textContent);
  let photo=root.querySelector('[data-scene-image]'),visible=false,wanted=true,revision=0,pointerFrame=0,timer;
  const pause=root.querySelector('[data-image-pause]'),retry=root.querySelector('[data-image-retry]'),status=root.querySelector('[data-image-status]');
  const stage=root.querySelector('.image-stage');
  function sync(){
    const allowed=motionAllowed();
    root.dataset.imagePlaying=String(allowed&&wanted&&visible&&!document.hidden&&root.dataset.imagePhase==='ready');
    if(pause){pause.disabled=!allowed;pause.setAttribute('aria-pressed',String(!wanted));pause.querySelector('[data-image-pause-label]').textContent=!allowed?motionPauseReason()==='system'?data.copy.reduced:data.copy.paused:wanted?data.copy.pause:data.copy.resume;}
  }
  function phase(value){root.dataset.imagePhase=value;root.setAttribute('aria-busy',String(value==='loading'));status.textContent=data.copy[value==='loading'?'loading':value==='error'?'unavailable':'ready'];retry.hidden=value!=='error';sync();}
  function wire(image){
    image.addEventListener('load',()=>{if(image===photo){clearTimeout(timer);phase('ready');}});
    image.addEventListener('error',()=>{if(image===photo){clearTimeout(timer);phase('error');}});
  }
  async function reload(){
    const attempt=++revision;phase('loading');const image=new Image();
    try{image.src=data.file;await Promise.race([image.decode(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('image_deadline')),15000);})]);
      if(attempt!==revision)return;image.alt=photo.alt;image.width=photo.width;image.height=photo.height;image.dataset.sceneImage='';photo.replaceWith(image);photo=image;wire(image);phase('ready');
    }catch{if(attempt===revision)phase('error');}finally{clearTimeout(timer);}
  }
  const reset=()=>{cancelAnimationFrame(pointerFrame);pointerFrame=0;root.style.removeProperty('--image-x');root.style.removeProperty('--image-y');};
  pause?.addEventListener('click',()=>{wanted=!wanted;reset();sync();});retry.addEventListener('click',reload);
  if(matchMedia('(pointer:fine)').matches){
    let point;
    stage.addEventListener('pointermove',event=>{
      if(!motionAllowed()||!wanted)return;point={x:event.clientX,y:event.clientY};
      if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;if(!motionAllowed()||!wanted||document.hidden)return;const bounds=stage.getBoundingClientRect();root.style.setProperty('--image-x',((point.x-bounds.left)/bounds.width-.5)*10+'px');root.style.setProperty('--image-y',((point.y-bounds.top)/bounds.height-.5)*8+'px');});
    });stage.addEventListener('pointerleave',reset);
  }
  subscribeMotion(allowed=>{if(!allowed)reset();sync();});document.addEventListener('visibilitychange',sync);
  const observe=entries=>{visible=entries.some(entry=>entry.isIntersecting);if(visible&&root.dataset.imagePhase==='loading'&&!timer)timer=setTimeout(()=>{if(!photo.complete)phase('error');},15000);sync();};
  if('IntersectionObserver' in window)new IntersectionObserver(observe,{threshold:.1}).observe(stage);else{visible=true;sync();}
  wire(photo);phase(photo.complete?(photo.naturalWidth?'ready':'error'):'loading');
  addEventListener('pagehide',()=>{revision++;clearTimeout(timer);reset();root.dataset.imagePlaying='false';});
  addEventListener('pageshow',()=>{if(photo.complete)phase(photo.naturalWidth?'ready':'error');sync();});
}
