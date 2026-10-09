import { animate,stopAnimation } from './ui-animation.js';

// One marker follows the actual selected control, including wrapped mobile rows.
export function activeMarker(list){
  const marker=document.createElement('span');
  marker.className='active-marker';marker.setAttribute('aria-hidden','true');list.append(marker);list.classList.add('has-active-marker');
  let target;
  function place(next,animated=true){
    target=next;
    if(!next){stopAnimation(marker);marker.hidden=true;return;}
    const before=marker.hidden?null:marker.getBoundingClientRect();stopAnimation(marker);marker.hidden=false;
    const parent=list.getBoundingClientRect(),rect=next.getBoundingClientRect();
    const x=rect.left-parent.left+list.scrollLeft,y=rect.bottom-parent.top+list.scrollTop-2;
    marker.style.width=rect.width+'px';marker.style.transform=`translate(${x}px,${y}px)`;
    if(animated&&before?.width){
      const fromX=before.left-parent.left+list.scrollLeft,fromY=before.top-parent.top+list.scrollTop;
      animate(marker,[{width:before.width+'px',transform:`translate(${fromX}px,${fromY}px)`},{width:rect.width+'px',transform:`translate(${x}px,${y}px)`}],{duration:360});
    }
  }
  marker.hidden=true;
  if('ResizeObserver' in window)new ResizeObserver(()=>place(target,false)).observe(list);
  document.fonts?.ready.then(()=>place(target,false));
  return place;
}
