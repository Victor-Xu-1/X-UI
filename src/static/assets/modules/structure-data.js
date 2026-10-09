// Fetch only the catalog's local immutable coordinates and verify their exact bytes.
export async function loadStructure(metadata, signal) {
  if (!/^\/assets\/structures\/[A-Z0-9]{4}\.pdb$/.test(metadata.file)) throw new Error('invalid_structure_path');
  if (!crypto.subtle) throw new Error('secure_context_required');
  const boundedSignal = AbortSignal.any([signal, AbortSignal.timeout(20_000)]);
  if (!/^[a-f0-9]{64}$/.test(metadata.sha256)) throw new Error('invalid_structure_digest');
  const name = metadata.file.split('/').pop().replace('.pdb', '-' + metadata.sha256.slice(0, 16) + '.pdb');
  const response = await fetch('/assets/build/' + name, { signal: boundedSignal });
  if (!response.ok) throw new Error(`structure_http_${response.status}`);
  const data = await response.arrayBuffer();
  if (data.byteLength !== metadata.bytes || data.byteLength > 8 * 1024 * 1024) throw new Error('structure_size_mismatch');
  const digest = await crypto.subtle.digest('SHA-256', data);
  const hash = [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
  if (hash !== metadata.sha256) throw new Error('structure_hash_mismatch');
  const text = new TextDecoder().decode(data);
  if (!/^ATOM\s/m.test(text) || !/^END\s*$/m.test(text)) throw new Error('invalid_structure_data');
  return text;
}
