import { loadProteinLibrary } from './protein-library.js';
import { loadStructure } from './structure-data.js';
import { ProteinScene } from './protein-scene.js';
import { motionAllowed,subscribeMotion } from './motion-policy.js';

export function mountMolecularAtmosphere(root) {
  const {structures}=JSON.parse(root.querySelector('[data-protein-data]').textContent);
  const canvas=root.querySelector('[data-protein-canvas]'),status=root.querySelector('[data-ambient-status]');
  let scene,visible=false,started=false,failed=false;
  const controller=new AbortController();
  function sync(){
    const playing=!!scene&&!failed&&root.dataset.phase==='ready'&&visible&&!document.hidden&&motionAllowed();
    scene?.spin(playing);root.dataset.spinning=String(playing);
  }
  function fail(){failed=true;root.dataset.phase='error';status.hidden=false;sync();}
  async function start(){
    started=true;root.dataset.phase='loading';
    try{
      const library=await loadProteinLibrary();scene=new ProteinScene(library,canvas,{ambient:true});
      const text=await loadStructure(structures[0],controller.signal);scene.load(text,structures[0]);await scene.represent('ambient');
      if(failed)return;root.dataset.phase='ready';sync();
    }catch{fail();}
  }
  canvas.addEventListener('protein-context-lost',fail);subscribeMotion(sync);
  document.addEventListener('visibilitychange',sync);
  addEventListener('pagehide',()=>{controller.abort();scene?.spin(false);});addEventListener('pageshow',sync);
  if('ResizeObserver' in window)new ResizeObserver(()=>{if(scene&&!failed)scene.resize();}).observe(canvas);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);if(visible&&!started)void start();sync();},{threshold:.08}).observe(root);
  else{visible=true;void start();}
}
