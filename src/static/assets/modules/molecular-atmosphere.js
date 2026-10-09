import { loadProteinLibrary } from './protein-library.js';
import { loadStructure } from './structure-data.js';
import { ProteinScene } from './protein-scene.js';
import { motionAllowed,subscribeMotion } from './motion-policy.js';
import { bindMolecularGestures } from './molecular-gestures.js';
import { yieldForInput } from './yield-task.js';

export function mountMolecularAtmosphere(root) {
  const {structures}=JSON.parse(root.querySelector('[data-protein-data]').textContent);
  const canvas=root.querySelector('[data-protein-canvas]'),status=root.querySelector('[data-ambient-status]');
  let scene,visible=false,started=false,failed=false;
  const controller=new AbortController();
  const gestures=bindMolecularGestures(canvas,{scene:()=>scene,ready:()=>!!scene&&!failed&&root.dataset.phase==='ready',sync});
  function sync(){
    const playing=!!scene&&!failed&&root.dataset.phase==='ready'&&visible&&!document.hidden&&motionAllowed()&&!gestures.busy();
    scene?.spin(playing);root.dataset.spinning=String(playing);
  }
  function fail(){failed=true;root.dataset.phase='error';status.hidden=false;canvas.tabIndex=-1;canvas.setAttribute('aria-disabled','true');root.querySelector('[data-ambient-hint]').hidden=true;sync();}
  async function start(){
    started=true;root.dataset.phase='loading';
    try{
      const [library,text]=await Promise.all([loadProteinLibrary(),loadStructure(structures[0],controller.signal)]);
      await yieldForInput(controller.signal);
      if(failed)return;
      scene=new ProteinScene(library,canvas,{ambient:true});scene.load(text,structures[0]);
      await yieldForInput(controller.signal);
      await scene.represent('ambient');
      controller.signal.throwIfAborted();
      if(failed)return;root.dataset.phase='ready';canvas.tabIndex=0;canvas.setAttribute('aria-disabled','false');root.querySelector('[data-ambient-hint]').hidden=false;sync();
    }catch{controller.abort();fail();}
  }
  canvas.addEventListener('protein-context-lost',fail);subscribeMotion(sync);
  document.addEventListener('visibilitychange',sync);
  addEventListener('pagehide',()=>{controller.abort();scene?.spin(false);});addEventListener('pageshow',sync);
  if('ResizeObserver' in window)new ResizeObserver(()=>{if(scene&&!failed)scene.resize();}).observe(canvas);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);if(visible&&!started)void start();sync();},{threshold:.08}).observe(root);
  else{visible=true;void start();}
}
