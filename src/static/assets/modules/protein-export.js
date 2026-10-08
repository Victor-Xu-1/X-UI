// Export the actual rendered view with its source identity, not a fabricated result.
export async function downloadProteinImage(uri, { id, name, representation, light, legend }) {
  const image = new Image();
  image.src = uri;
  await image.decode();
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  const footer = Math.max(90, Math.round(canvas.width / 16));
  canvas.height = image.naturalHeight + footer;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('image_export_unavailable');
  context.fillStyle = light ? '#f3f6f8' : '#12161b';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0);
  const padding = Math.round(footer / 5);
  context.fillStyle = light ? '#395262' : '#cad7df';
  context.font = `${Math.round(footer / 6)}px Arial, sans-serif`;
  context.textBaseline = 'middle';
  context.fillText(`${id} · ${name} · ${representation}`, padding, image.naturalHeight + footer / 3, canvas.width * .7);
  context.textAlign = 'right';
  context.fillText('RCSB PDB · x-science.ai', canvas.width - padding, image.naturalHeight + footer / 3, canvas.width * .28);
  context.textAlign = 'left';
  let x = padding;
  for (const { label, color } of legend) {
    context.fillStyle = color;
    context.beginPath(); context.arc(x + 4, image.naturalHeight + footer * .7, 4, 0, Math.PI * 2); context.fill();
    context.fillStyle = light ? '#395262' : '#cad7df';
    context.fillText(label, x + 15, image.naturalHeight + footer * .7);
    x += context.measureText(label).width + 36;
  }
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('image_export_failed');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${id}-${representation}-x-science.png`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
