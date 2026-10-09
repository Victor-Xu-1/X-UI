import { readFile, writeFile, readdir, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';

// Linux deployment text must not inherit a Windows working-tree line ending.
export async function packageOperations(root, scratch, archive) {
  const staging = await mkdtemp(resolve(scratch, 'ops-'));
  if (dirname(staging) !== scratch) throw new Error('Operations staging path escaped its owner');
  async function copyText(source, destination) {
    await mkdir(destination);
    for (const entry of await readdir(source, { withFileTypes: true })) {
      if (entry.name === '__pycache__') continue;
      const input = resolve(source, entry.name), output = resolve(destination, entry.name);
      if (entry.isDirectory()) await copyText(input, output);
      else if (entry.isFile()) {
        const text = await readFile(input, 'utf8');
        if (text.includes('\0')) throw new Error('Unexpected binary deployment source');
        await writeFile(output, text.replaceAll('\r\n', '\n'));
      } else throw new Error('Deployment source must contain only regular files');
    }
  }
  try {
    await copyText(resolve(root, 'ops'), resolve(staging, 'ops'));
    const result = spawnSync('tar', ['-czf', archive, '-C', staging, 'ops'], { stdio: 'inherit' });
    if (result.status !== 0) throw new Error('Unable to package deployment operations');
  } finally { await rm(staging, { recursive: true, force: true }); }
}
