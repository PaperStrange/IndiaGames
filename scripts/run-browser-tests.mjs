import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const temporaryDirectory = resolve('work/browser-tmp');
mkdirSync(temporaryDirectory, { recursive: true });
const windows = process.platform === 'win32';
const child = spawn(process.execPath, ['node_modules/playwright/cli.js', 'test', ...process.argv.slice(2)], {
    stdio: 'inherit', detached: !windows, env: { ...process.env, TMPDIR: temporaryDirectory, TEMP: temporaryDirectory, TMP: temporaryDirectory,
        NO_PROXY: [process.env.NO_PROXY, '127.0.0.1', 'localhost'].filter(Boolean).join(','),
        no_proxy: [process.env.no_proxy, '127.0.0.1', 'localhost'].filter(Boolean).join(',') },
});
let expired = false;
function terminate(signal) {
    try {
        if (windows) child.kill(signal);
        else process.kill(-child.pid, signal);
    } catch (error) { if (error.code !== 'ESRCH') throw error; }
}
// 进程级计时器独立于浏览器和测试步骤；超时后结束本次测试的进程组。
const deadline = setTimeout(() => {
    expired = true;
    console.error('Browser verification exceeded six minutes. This run is failed.');
    terminate('SIGTERM');
    setTimeout(() => terminate('SIGKILL'), 5000);
}, 360000);
child.once('error', error => { clearTimeout(deadline); console.error(error); process.exitCode = 1; });
child.once('exit', code => { clearTimeout(deadline); process.exitCode = expired ? 124 : (code ?? 1); });
process.once('SIGINT', () => terminate('SIGTERM'));
process.once('SIGTERM', () => terminate('SIGTERM'));
