// Native 3Dmol owns drag/pinch. This module owns normalized wheel and keyboard input.
export function bindMolecularGestures(element,{scene,ready,sync}) {
  const pointers=new Set();
  let cooling=false,timer,tap,previousTap;
  const reset=()=>{scene().reset();scene().interacted=false;};
  const schedule=()=>{
    clearTimeout(timer);
    cooling=true;
    timer=setTimeout(()=>{cooling=false;sync();},1800);
    sync();
  };
  const start=event=>{
    if(!ready())return;
    pointers.add(event.pointerId);clearTimeout(timer);cooling=false;
    tap=event.pointerType==='touch'&&pointers.size===1?{id:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now()}:null;
    scene().interacted=true;sync();
  };
  const end=event=>{
    if(!pointers.delete(event.pointerId))return;
    if(ready()&&tap?.id===event.pointerId&&performance.now()-tap.time<300){
      if(previousTap&&tap.time-previousTap.time<380&&Math.hypot(tap.x-previousTap.x,tap.y-previousTap.y)<20){reset();previousTap=null;}
      else previousTap=tap;
    }
    tap=null;if(!pointers.size)schedule();
  };
  const cancel=event=>{if(pointers.size)scene()?.endGesture(event);pointers.clear();tap=null;previousTap=null;clearTimeout(timer);cooling=false;sync();};
  element.addEventListener('pointerdown',start,{capture:true});
  element.addEventListener('pointermove',event=>{if(tap&&Math.hypot(event.clientX-tap.x,event.clientY-tap.y)>8)tap=null;});
  addEventListener('pointerup',end);addEventListener('pointercancel',event=>{tap=null;scene()?.endGesture(event);end(event);});
  element.addEventListener('wheel',event=>{
    if(!ready())return;
    event.preventDefault();
    const unit=event.deltaMode===1?16:event.deltaMode===2?element.clientHeight:1;
    const delta=Math.max(-240,Math.min(240,event.deltaY*unit));
    scene().interacted=true;scene().zoom(Math.exp(-delta*.002));schedule();
  },{passive:false});
  element.addEventListener('dblclick',event=>{
    if(!ready())return;
    event.preventDefault();reset();schedule();
  });
  element.addEventListener('keydown',event=>{
    if(!ready()||event.altKey||event.ctrlKey||event.metaKey)return;
    const current=scene();
    const actions={ArrowLeft:()=>current.rotate(5,'vy'),ArrowRight:()=>current.rotate(-5,'vy'),ArrowUp:()=>current.rotate(5,'vx'),ArrowDown:()=>current.rotate(-5,'vx'),'+':()=>current.zoom(1.12),'=':()=>current.zoom(1.12),'-':()=>current.zoom(1/1.12),Home:()=>current.reset(),'0':()=>current.reset()};
    if(!actions[event.key])return;
    event.preventDefault();current.interacted=!['Home','0'].includes(event.key);actions[event.key]();schedule();
  });
  addEventListener('blur',cancel);addEventListener('pagehide',cancel);
  document.addEventListener('visibilitychange',event=>{if(document.hidden)cancel(event);});
  return {busy:()=>pointers.size>0||cooling};
}
