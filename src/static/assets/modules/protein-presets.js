// Shared colors and camera settings for the visual illustration.
export const proteinPalette={
  zinc:'#8198aa',
  elements:{C:'#e9edf2',N:'#285ce5',O:'#e44835',S:'#efbd29',ZN:'#8198aa'},
  light:'#ffffff',dark:'#101c24'
};
export const proteinViewerSettings={
  backgroundColor:proteinPalette.light,orthographic:true,disableFog:true,
  antialias:true,upscale:false,cartoonQuality:10
};
export function fittingZoom(width,height){return 1.5/Math.max(1,width/Math.max(1,height));}
