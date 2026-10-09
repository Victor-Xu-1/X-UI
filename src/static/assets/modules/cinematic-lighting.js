import * as T from '../vendor/three-0.186.1/three.module.js';

// The checked atlas is original procedural lighting, not a scientific image.
export async function loadConceptLighting(metadata) {
  if (!metadata || !/^\/assets\/media\/environment\/[a-z0-9-]+\.png$/.test(metadata.file)) throw new Error('Invalid lighting asset');
  const response = await fetch(metadata.file, { cache: 'no-cache', signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error('Lighting asset unavailable');
  const buffer = await response.arrayBuffer();
  if (buffer.byteLength !== metadata.bytes || buffer.byteLength > 1024 * 1024) throw new Error('Lighting byte count mismatch');
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', buffer))].map(value => value.toString(16).padStart(2, '0')).join('');
  if (hash !== metadata.sha256) throw new Error('Lighting integrity mismatch');
  const bitmap = await createImageBitmap(new Blob([buffer], { type:'image/png' }), { imageOrientation:'from-image', premultiplyAlpha:'none', colorSpaceConversion:'none' });
  if (bitmap.width !== metadata.width || bitmap.height !== metadata.height) { bitmap.close(); throw new Error('Lighting dimensions mismatch'); }
  const texture = new T.Texture(bitmap);
  texture.mapping = T.CubeUVReflectionMapping;
  texture.colorSpace = T.LinearSRGBColorSpace;
  texture.minFilter = T.LinearFilter; texture.magFilter = T.LinearFilter;
  texture.generateMipmaps = false; texture.flipY = false; texture.needsUpdate = true;
  return texture;
}
