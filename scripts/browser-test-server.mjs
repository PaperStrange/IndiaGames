import { globSync } from 'node:fs';
import { mkdir, mkdtemp, readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';
import { Miniflare } from 'miniflare';

await mkdir('work/browser-server', { recursive: true });
const directory = await mkdtemp(resolve('work/browser-server/run-'));
const modules = globSync('**/*.js', { cwd: 'dist/server' }).map(path => ({ type: 'ESModule', path: resolve('dist/server', path) }));
const entry = modules.findIndex(module => module.path === resolve('dist/server/index.js'));
if (entry < 0) throw new Error('Run npm run build before browser verification.');
modules.unshift(...modules.splice(entry, 1));
// 独立运行实际生产 Worker 与真实 D1/R2，测试数据仅保存到 work 目录。
const runtime = new Miniflare({ modules, host: '127.0.0.1', port: 4175,
    compatibilityDate: '2026-05-15', compatibilityFlags: ['nodejs_compat'], cf: false,
    d1Databases: ['DB'], r2Buckets: ['BUCKET'], d1Persist: `${directory}/d1`, r2Persist: `${directory}/r2`,
    assets: { directory: resolve('dist/client'), binding: 'ASSETS', routerConfig: { has_user_worker: true } },
});
await (await runtime.getD1Database('DB')).prepare('SELECT 1 AS ready').first();
const databases = globSync('d1/**/*.sqlite', { cwd: directory }).filter(path => !path.includes('metadata'));
if (databases.length !== 1) throw new Error('Expected one isolated notebook database.');
const database = new DatabaseSync(resolve(directory, databases[0]));
for (const migration of globSync('drizzle/*.sql').sort()) database.exec(await readFile(migration, 'utf8'));
database.close();
const address = await runtime.ready;
const health = await fetch(new URL('/api/notebook', address), { signal: AbortSignal.timeout(5000) });
if (!health.ok) throw new Error(`Notebook initialization failed: ${await health.text()}`);
console.log(`Browser test application ready at ${address}`);
let closing = false;
async function close() {
    if (closing) return;
    closing = true; await runtime.dispose(); process.exit(0);
}
process.once('SIGTERM', close); process.once('SIGINT', close);
