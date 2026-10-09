import { animate,enter,resizeHeight,stopAnimation } from './ui-animation.js';

export function captureCatalog(container,cards){
  const state={height:container.getBoundingClientRect().height,positions:new Map()};
  for(const card of cards)if(!card.hidden)state.positions.set(card,card.getBoundingClientRect());
  cards.forEach(stopAnimation);
  stopAnimation(container);
  return state;
}
export function moveCatalog(container,cards,before){
  const height=container.getBoundingClientRect().height;
  let incoming=0;
  for(const card of cards){
    if(card.hidden)continue;
    const previous=before.positions.get(card),next=card.getBoundingClientRect();
    if(previous&&previous.bottom>0&&previous.top<innerHeight){
      const x=previous.left-next.left,y=previous.top-next.top;
      if(Math.abs(x)+Math.abs(y)>1)animate(card,[{transform:`translate(${x}px,${y}px)`},{transform:'translate(0,0)'}],{duration:540});
    }else if(!card.classList.contains('will-reveal'))enter(card,{delay:Math.min(incoming++*45,135),distance:18,duration:440});
  }
  resizeHeight(container,before.height,height);
}
