import { activeMarker } from './active-marker.js';
import { animate,enter,resizeHeight,stopAnimation } from './ui-animation.js';
// Shared keyboard/selection contract for meaningful, progressively enhanced tabs.
export function enhanceTabset(list,tabs,panels) {
  if(!list||tabs.length!==panels.length||!tabs.length)throw new Error('Invalid tabset');
  list.setAttribute('role','tablist');
  panels.forEach(panel=>{panel.setAttribute('role','tabpanel');panel.tabIndex=0;});
  const marker=activeMarker(list),container=panels[0].parentElement;
  let selected=-1;
  function select(index,focus=false,historyMode=null) {
    const changed=selected!==index,previous=selected,height=previous>=0?container.getBoundingClientRect().height:0;
    if(changed){stopAnimation(container);panels.forEach(panel=>{stopAnimation(panel);[...panel.children].forEach(stopAnimation);});}
    tabs.forEach((tab,i)=>{
      const active=i===index;
      tab.setAttribute('role','tab');tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;
      panels[i].hidden=!active;tab.closest('.workflow-step')?.classList.toggle('stage-active',active);
    });
    list.dataset.activeTab=String(index);
    if(changed)marker(tabs[index],previous>=0);
    if(previous>=0&&changed){
      const panel=panels[index],nextHeight=container.getBoundingClientRect().height,direction=index>previous?1:-1;
      resizeHeight(container,height,nextHeight);
      animate(panel,[{opacity:0,transform:`translateX(${direction*18}px)`},{opacity:1,transform:'translateX(0)'}],{duration:380});
      [...panel.children].forEach((child,i)=>enter(child,{delay:50+i*55,distance:12,duration:420}));
    }
    selected=index;
    if(focus)tabs[index].focus({preventScroll:true});
    else if(panels.some(panel=>panel.hidden&&panel.contains(document.activeElement)))panels[index].focus({preventScroll:true});
    if(historyMode&&location.hash!=='#'+panels[index].id)history[historyMode+'State'](null,'','#'+panels[index].id);
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();select(index,false,'push');});
    tab.addEventListener('keydown',event=>{
      const indices={ArrowRight:(index+1)%tabs.length,ArrowLeft:(index+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1,' ':index};
      if(!(event.key in indices))return;event.preventDefault();select(indices[event.key],true,'replace');
    });
  });
  function fromHash(){
    let hash;try{hash=decodeURIComponent(location.hash.slice(1));}catch{return -1;}
    return panels.findIndex(panel=>panel.id===hash);
  }
  select(Math.max(0,fromHash()));
  addEventListener('hashchange',()=>{const index=fromHash();if(index>=0||!location.hash)select(Math.max(0,index));});
}
