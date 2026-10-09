import { settleSurface } from './protein-surface.js';
import { chainColorScheme,ligandSelection } from './protein-selection.js';
import { proteinPalette } from './protein-presets.js';

// One studio material language for the decorative and interactive scenes.
export async function renderProteinMaterial(viewer,library,selection,metadata,kind) {
  const colorscheme=chainColorScheme(metadata);
  const protein={and:[selection,{hetflag:false}]};
  viewer.setStyle(protein,{cartoon:{colorscheme,arrows:true,thickness:.42,opacity:1}});
  await settleSurface(viewer.addSurface(library.SurfaceType.MS,{opacity:kind==='surface'?.9:.72,colorscheme},protein));
  const colors={prop:'elem',map:proteinPalette.elements};
  viewer.setStyle(ligandSelection(metadata),{stick:{radius:.23,colorscheme:colors},sphere:{scale:.28,colorscheme:colors}});
  if(metadata.id==='5FQD')viewer.setStyle({resn:'ZN',chain:'B',resi:1437},{sphere:{radius:.8,color:proteinPalette.zinc}});
}

// An orthographic bounding sphere keeps every orientation inside the viewport.
export function fitAmbientFrame(viewer,element,atoms) {
  const view=viewer.getView(),center={x:-view[0],y:-view[1],z:-view[2]};
  const radius=Math.max(...atoms.map(a=>Math.hypot(a.x-center.x,a.y-center.y,a.z-center.z)))+4;
  const points=viewer.modelToScreen([center,{...center,x:center.x+1},{...center,y:center.y+1},{...center,z:center.z+1}]);
  const sx=Math.hypot(...points.slice(1).map(p=>p.x-points[0].x)),sy=Math.hypot(...points.slice(1).map(p=>p.y-points[0].y));
  const scale=Math.min(element.clientWidth*.47/(radius*sx),element.clientHeight*.47/(radius*sy));
  if(!Number.isFinite(scale)||scale<=0)throw new Error('invalid_ambient_frame');
  viewer.zoom(scale);viewer.setSlab(-1.3*radius,1.3*radius);viewer.render();
}
