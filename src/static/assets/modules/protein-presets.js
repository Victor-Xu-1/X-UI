// Shared colors and camera settings for the visual illustration.
export const proteinPalette={
  ligand:'#a43d65',zinc:'#7e7d96',
  elements:{carbon:'#627887',nitrogen:'#3d60bb',oxygen:'#c9534c',sulfur:'#b59836',zinc:'#7e7d96'},
  light:'#ffffff',dark:'#101c24'
};
export const proteinViewerSettings={
  backgroundColor:proteinPalette.light,orthographic:true,disableFog:true,
  antialias:true,upscale:false,cartoonQuality:10,
  outline:{width:.009,color:'#718b94',maxpixels:.55}
};
export function fittingZoom(width,height){return 1.5/Math.max(1,width/Math.max(1,height));}
