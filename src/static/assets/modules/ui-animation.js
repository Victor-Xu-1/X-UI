import { motionAllowed,subscribeMotion } from './motion-policy.js';

export const ease='cubic-bezier(.2,.75,.2,1)';
const active=new Map();
const heightOwners=new WeakMap();
export function stopAnimation(element){active.get(element)?.cancel();active.delete(element);}
export function animate(element,keyframes,options={}){
  stopAnimation(element);
  if(!element?.animate||!motionAllowed()||document.hidden)return null;
  const animation=element.animate(keyframes,{duration:480,easing:ease,...options});
  active.set(element,animation);
  const release=()=>{if(active.get(element)===animation)active.delete(element);};
  animation.finished.then(release,release);
  return animation;
}
function finishAll(){for(const element of active.keys())stopAnimation(element);}
subscribeMotion(allowed=>{if(!allowed)finishAll();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)finishAll();});
addEventListener('pagehide',finishAll);
addEventListener('blur',finishAll);
addEventListener('resize',finishAll,{passive:true});

export function enter(element,{delay=0,distance=22,duration=600}={}){
  return animate(element,[{opacity:0,transform:`translateY(${distance}px)`},{opacity:1,transform:'translateY(0)'}],{duration,delay,fill:'backwards'});
}
export function resizeHeight(element,from,to){
  if(Math.abs(from-to)<1)return;
  const animation=animate(element,[{height:from+'px'},{height:to+'px'}],{duration:480});
  if(!animation)return;
  heightOwners.set(element,animation);element.style.overflow='hidden';
  const clear=()=>{if(heightOwners.get(element)===animation){heightOwners.delete(element);element.style.removeProperty('overflow');}};
  animation.finished.then(clear,clear);
}
