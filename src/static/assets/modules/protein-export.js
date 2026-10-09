// Export a branded illustration without scientific identities or annotations.
export async function downloadProteinImage(uri,{caption,form,light}) {
  const image=new Image();image.src=uri;await image.decode();
  const canvas=document.createElement('canvas');canvas.width=image.naturalWidth;
  const footer=Math.max(80,Math.round(canvas.width*.055));canvas.height=image.naturalHeight+footer;
  const context=canvas.getContext('2d');if(!context)throw new Error('image_export_unavailable');
  context.fillStyle=light?'#ffffff':'#101c24';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0);
  const pad=Math.round(canvas.width*.025);context.font=Math.round(footer*.23)+'px Arial, sans-serif';context.textBaseline='middle';context.fillStyle=light?'#395262':'#cad7df';
  context.fillText('X-Science · '+caption,pad,image.naturalHeight+footer*.5,canvas.width*.72);
  context.textAlign='right';context.fillText('x-science.ai',canvas.width-pad,image.naturalHeight+footer*.5);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('image_export_failed');
  const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='x-science-illustration-'+form+'.png';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
