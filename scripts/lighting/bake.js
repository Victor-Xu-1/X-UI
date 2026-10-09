import * as T from '/assets/vendor/three-0.186.1/three.module.js';

const spec = await (await fetch('/room-spec.json')).json();
const renderer = new T.WebGLRenderer({ antialias:false, powerPreference:'low-power' });
const room = new T.Scene(); room.background = new T.Color(spec.background);
const panels = spec.panels.map(([color,position,rotation]) => {
  const panel = new T.Mesh(new T.PlaneGeometry(...spec.panelSize),new T.MeshBasicMaterial({color,side:T.DoubleSide}));
  panel.position.set(...position); panel.rotation.set(...rotation); room.add(panel); return panel;
});
const generator = new T.PMREMGenerator(renderer);
let target;
try {
  target = generator.fromScene(room,spec.sigma,spec.near,spec.far,{size:spec.size,position:new T.Vector3(...spec.position)});
  if (target.texture.type !== T.HalfFloatType) throw new Error('Unexpected lighting storage');
  const raw = new Uint16Array(target.width*target.height*4);
  renderer.readRenderTargetPixels(target,0,0,target.width,target.height,raw);
  if (renderer.getContext().getError() !== 0) throw new Error('Lighting readback failed');
  const bytes = new Uint8Array(raw.length);let minRGB=Infinity,maxRGB=-Infinity;
  for (let i=0;i<raw.length;i++) {
    const value=T.DataUtils.fromHalfFloat(raw[i]);
    if (!Number.isFinite(value) || value<0 || value>1) throw new Error('Lighting exceeds linear UNORM range');
    if(i%4!==3){minRGB=Math.min(minRGB,value);maxRGB=Math.max(maxRGB,value);}
    bytes[i]=Math.round(value*255);
  }
  let binary='';for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));
  window.lightingBake={rgba:btoa(binary),width:target.width,height:target.height,minRGB,maxRGB};
} catch { window.lightingError=true; }
finally {
  target?.dispose();generator.dispose();panels.forEach(panel=>{panel.geometry.dispose();panel.material.dispose();});room.clear();renderer.dispose();
}
