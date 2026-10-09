import { proteinPalette,proteinViewerSettings,fittingZoom } from './protein-presets.js';
import { settleSurface } from './protein-surface.js';
import { ligandSelection,chainColorScheme } from './protein-selection.js';

// A document owns one persistent renderer; all controls reuse its deposited model.
export class ProteinScene {
  constructor(library,element) {
    this.library=library;this.element=element;this.viewer=library.createViewer(element,proteinViewerSettings);
    if(!this.viewer)throw new Error('webgl_unavailable');
    this.context=this.viewer.getRenderer().getContext();
    if(!this.context||this.context.isContextLost())throw new Error('webgl_unavailable');
    this.context.canvas.addEventListener('webglcontextlost',()=>{this.viewer.spin(false);element.dispatchEvent(new Event('protein-context-lost'));});
    this.size=[element.clientWidth,element.clientHeight];
  }
  load(text,metadata) {
    this.viewer.spin(false);this.viewer.removeAllSurfaces();this.viewer.removeAllLabels();this.viewer.removeAllModels();
    this.model=this.viewer.addModel(text,'pdb',{keepH:false,altLoc:'A',cartoonQuality:10,noComputeSecondaryStructure:true});
    if(this.model.selectedAtoms({}).length!==metadata.atomCount)throw new Error('structure_atom_count_mismatch');
    this.metadata=metadata;
    if(this.model.selectedAtoms(ligandSelection(metadata)).length!==metadata.ligand.atomCount)throw new Error('ligand_atom_count_mismatch');
    for(const data of Object.values(metadata.views))if(this.model.selectedAtoms(data.selection).length!==data.atomCount)throw new Error('display_selection_mismatch');
    this.viewer.setStyle({},{});
    const neutral=[...this.viewer.getView()];neutral.splice(4,4,...metadata.quaternion);this.viewer.setView(neutral);
    this.selection=metadata.views.interface.selection;
    this.frame();this.initialView=[...this.viewer.getView()];
  }
  frame() {
    this.viewer.zoomTo(this.selection);
    this.viewer.zoom(fittingZoom(this.element.clientWidth,this.element.clientHeight));this.viewer.render();
    const points=this.viewer.modelToScreen(this.model.selectedAtoms(this.selection));
    const xs=points.map(point=>point.x),ys=points.map(point=>point.y);
    const fill=Math.min(this.element.clientWidth*.86/(Math.max(...xs)-Math.min(...xs)),this.element.clientHeight*.8/(Math.max(...ys)-Math.min(...ys)));
    if(Number.isFinite(fill)&&fill>0)this.viewer.zoom(Math.max(.5,Math.min(2.2,fill)));
  }
  async represent(kind) {
    this.viewer.spin(false);this.viewer.removeAllSurfaces();this.viewer.setStyle({},{});
    const protein={and:[this.selection,{hetflag:false}]},colorscheme=chainColorScheme(this.metadata);
    if(kind==='surface'){
      this.viewer.setStyle(protein,{sphere:{hidden:true,colorscheme}});
      await settleSurface(this.viewer.addSurface(this.library.SurfaceType.VDW,{opacity:.56,colorscheme},protein));
    }else this.viewer.setStyle(protein,{cartoon:{colorscheme,arrows:true,thickness:.3,opacity:1}});
    const colors={prop:'elem',map:{C:proteinPalette.ligand,N:'#4264b8',O:'#d45351',S:'#b0983c'}};
    this.viewer.setStyle(ligandSelection(this.metadata),{stick:{radius:.27,colorscheme:colors},sphere:{scale:.28,colorscheme:colors}});
    if(this.metadata.id==='5FQD')this.viewer.setStyle({resn:'ZN',chain:'B',resi:1437},{sphere:{radius:.8,color:proteinPalette.zinc}});
    this.element.dataset.displayedAtoms=String(this.model.selectedAtoms(this.selection).length);
    this.viewer.render();
  }
  background(light) {
    this.viewer.setBackgroundColor(light?proteinPalette.light:proteinPalette.dark);
    this.viewer.setViewStyle({style:'outline',width:.009,color:light?'#718b94':'#0b121a',maxpixels:.55});this.viewer.render();
  }
  capture() {
    const view = [...this.viewer.getView()];
    const width = this.element.clientWidth, height = this.element.clientHeight;
    if (width <= 0 || height <= 0) throw new Error('invalid_capture_size');
    const canvas = this.element.querySelector('canvas');
    const gl = this.viewer.getRenderer().getContext();
    if (!gl || gl.isContextLost()) throw new Error('webgl_unavailable');
    const edge = Math.min(2400, gl.getParameter(gl.MAX_RENDERBUFFER_SIZE), gl.getParameter(gl.MAX_TEXTURE_SIZE));
    // Use a figure-sized physical target even on a narrow or high-DPR phone.
    const scale = Math.min(2048 / width, edge / width, Math.min(edge, 1800) / height, Math.sqrt(3_700_000 / (width * height)));
    const target = [Math.floor(width * scale), Math.floor(height * scale)];
    const dpr = window.devicePixelRatio || 1;
    try {
      if (target[1] < canvas.height) this.viewer.setHeight((target[1] + .001) / dpr);
      this.viewer.setWidth((target[0] + .001) / dpr);
      this.viewer.setHeight((target[1] + .001) / dpr);
      this.viewer.setView(view);
      this.viewer.render();
      const outputCanvas = this.viewer.getCanvas();
      if (!outputCanvas || Math.abs(outputCanvas.width - target[0]) > 1 || Math.abs(outputCanvas.height - target[1]) > 1) throw new Error('capture_size_mismatch');
      return this.viewer.pngURI();
    } finally {
      this.viewer.resize();
      this.viewer.setView(view);
      this.viewer.render();
    }
  }


  spin(enabled){this.viewer.spin(enabled?'vy':false,.085);}
  reset(){if(this.initialView){this.viewer.setView([...this.initialView]);this.frame();this.viewer.render();}}
  rotate(angle,axis){this.viewer.rotate(angle,axis);this.viewer.render();}
  zoom(factor){this.viewer.zoom(factor);this.viewer.render();}
  resize(){const size=[this.element.clientWidth,this.element.clientHeight];this.viewer.resize();if(this.model&&size.some((v,i)=>v!==this.size[i])){this.frame();this.viewer.render();}this.size=size;}
}
