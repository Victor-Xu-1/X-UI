import { enter,stopAnimation } from './ui-animation.js';
import { motionAllowed,subscribeMotion } from './motion-policy.js';

export function initReveals(){
  const hero=[...document.querySelectorAll('.hero-copy>.eyebrow,.hero h1>span,.hero-description,.hero-actions,.product-hero-grid>.product-hero-art,.product-hero-grid>div:first-child>.eyebrow,.product-name,.product-hero h1>span,.product-lead,.product-license')];
  hero.forEach((element,index)=>enter(element,{delay:Math.min(index*65,390),distance:28,duration:700}));
  const molecular=document.querySelector('.hero-molecular');
  if(molecular)enter(molecular,{delay:140,distance:32,duration:900});
  if(!('IntersectionObserver' in window))return;
  const selector='.section-head,.product-card,.about-grid,.capability,.use-case-explorer,.research-intro,.proof-copy,.research-illustration,.selection-note-inner,.contact-inner,.facts-grid>div,.site-footer .footer-main';
  const observer=new IntersectionObserver(entries=>{
    let index=0;
    for(const entry of entries){
      if(!entry.isIntersecting&&motionAllowed())continue;
      const element=entry.target,waiting=element.classList.contains('will-reveal');
      element.classList.remove('will-reveal');observer.unobserve(element);
      if(waiting)enter(element,{delay:Math.min(index++*65,195),distance:26,duration:650});
    }
  },{threshold:.06,rootMargin:'0px 0px 20px 0px'});
  const elements=[...document.querySelectorAll(selector)];
  const waiting=motionAllowed()?elements.filter(element=>element.getBoundingClientRect().top>innerHeight):[];
  waiting.forEach(element=>element.classList.add('will-reveal'));
  elements.forEach(element=>observer.observe(element));
  document.addEventListener('focusin',event=>{
    // Pointer focus must not move a pressed control before pointerup/click.
    if(!event.target.matches?.(':focus-visible'))return;
    for(let element=event.target;element&&element!==document.body;element=element.parentElement){
      stopAnimation(element);
      if(element.classList.contains('will-reveal')){element.classList.remove('will-reveal');observer.unobserve(element);}
    }
  });
  subscribeMotion(allowed=>{if(!allowed){document.querySelectorAll('.will-reveal').forEach(element=>element.classList.remove('will-reveal'));observer.disconnect();}});
}
