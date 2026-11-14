import { readdir, lstat, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

export async function buildInputs(root) {
  const files = [];
  const sha = bytes => createHash('sha256').update(bytes).digest('hex');
  async function add(relative) {
    const file = path.join(root, relative), stat = await lstat(file);
    if (stat.isSymbolicLink()) throw new Error(`Build input symlink rejected: ${relative}`);
    if (stat.isDirectory()) {
      for (const name of (await readdir(file)).sort()) await add(`${relative}/${name}`);
    } else if (stat.isFile()) files.push({ path: relative, sha256: sha(await readFile(file)) });
    else throw new Error(`Unexpected build input: ${relative}`);
  }
  for (const item of ['index.html', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'src', 'public', 'scripts']) await add(item);
  files.sort((a, b) => a.path.localeCompare(b.path, 'en'));
  return { sha256: sha(Buffer.from(JSON.stringify(files))), files };
}
