import { test, expect, type Locator, type Page } from 'playwright/test';
import { createHash, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { initialNotebook } from '../../lib/notebook';

test.beforeEach(async ({ context, page }, testInfo) => {
    // 独立身份仅作用于本地测试 Worker；公开部署的身份校验仍由 Sites 提供。
    await context.setExtraHTTPHeaders({ 'oai-authenticated-user-id': `browser-qa-${randomUUID()}` });
    if (testInfo.project.name === 'phone' && testInfo.title.startsWith('move-ink action')) {
        // 在客户端首次读取前写入真实服务，避免测试准备本身制造跨客户端版本冲突。
        const stored = await (await page.request.get('/api/notebook')).json();
        stored.notebook ||= initialNotebook();
        stored.notebook.pages[0].blocks.push({ id: randomUUID(), kind: 'text',
            text: 'The last line of this leaf is already occupied.', x: 68, y: 850, h: 50 });
        const seeded = await page.request.put('/api/notebook', {
            headers: { 'X-Notebook-Version': String(stored.version) }, data: stored.notebook,
        });
        expect(seeded.ok()).toBe(true);
    }
    await page.goto('/');
    await expect(page.getByLabel('Page title', { exact: true })).toHaveValue('A little curiosity');
    await expect(page.getByRole('button', { name: 'Synced', exact: true })).toBeVisible();
});

async function drawOverSample(page: Page) {
    const surface = page.getByRole('group', { name: /^Notebook page/ });
    await surface.scrollIntoViewIfNeeded();
    // 使用 SVG 的真实投影定位手势，保留浏览器实际 pointer 事件和应用坐标转换。
    const points = await surface.evaluate(element => {
        const matrix = (element as SVGSVGElement).getScreenCTM();
        if (!matrix) throw new Error('The writing surface has no screen transform.');
        return [[110, 238], [160, 265], [210, 235]].map(([x, y]) => {
            const point = new DOMPoint(x, y).matrixTransform(matrix);
            return { x: point.x, y: point.y };
        });
    });
    await page.mouse.move(points[0].x, points[0].y);
    await page.mouse.down();
    await page.mouse.move(points[1].x, points[1].y, { steps: 8 });
    await page.mouse.move(points[2].x, points[2].y, { steps: 8 });
    await page.mouse.up();
}

async function nextAndBack(page: Page) {
    await page.getByRole('button', { name: 'Next notebook page', exact: true }).click();
    await expect(page.getByLabel('Page title', { exact: true })).not.toHaveValue('A little curiosity');
    await page.getByRole('button', { name: 'Previous notebook page', exact: true }).click();
    await expect(page.getByLabel('Page title', { exact: true })).toHaveValue('A little curiosity');
}

async function expectReachableWithoutScrolling(button: Locator) {
    // 只读取视口与命中结果；不能让 Playwright 自动滚动掩盖真实用户遇到的遮挡。
    await expect.poll(() => button.evaluate(element => {
        const box = element.getBoundingClientRect();
        const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
        return box.width > 0 && box.height >= 44 && box.top >= 0 && box.left >= 0
            && box.bottom <= innerHeight && box.right <= innerWidth && !!hit && element.contains(hit);
    })).toBe(true);
}

test('move-ink action is reachable without scrolling or toolbar obstruction', async ({ page }, testInfo) => {
    const phone = testInfo.project.name === 'phone';
    if (phone) await page.setViewportSize({ width: 390, height: 700 });
    await page.getByRole('switch', { name: 'Reply when handwriting pauses' }).click();
    await drawOverSample(page);
    const recovery = page.getByRole('region', { name: 'Unsent ink' });
    const move = recovery.getByRole('button', { name: 'Move ink to a fresh leaf' });
    await expect(recovery).toContainText('overlaps');
    await expectReachableWithoutScrolling(move);
    const stage = await page.locator('.canvas-stage').boundingBox();
    if (!stage) throw new Error('The notebook viewport is missing.');
    expect(stage.height).toBeGreaterThan(120);
    await page.mouse.move(stage.x + stage.width / 2, stage.y + stage.height / 2);
    await page.mouse.wheel(0, 500);
    await expect.poll(() => page.locator('.canvas-stage').evaluate(element => element.scrollTop)).toBeGreaterThan(100);
    await expectReachableWithoutScrolling(move);
    await expectReachableWithoutScrolling(recovery.getByRole('button', { name: 'Keep as annotation' }));
    await expectReachableWithoutScrolling(recovery.getByRole('button', { name: 'Read this ink' }));
    await page.screenshot({ path: `work/browser-results/recovery-visible-${testInfo.project.name}.png` });
    let action = move;
    if (phone) {
        await recovery.getByRole('button', { name: 'Read this ink' }).click();
        const notice = page.locator('.ink-space-toast');
        await expect(notice).toContainText('Your ink is saved.', { timeout: 45000 });
        action = notice.getByRole('button', { name: 'Move ink', exact: true });
        await expectReachableWithoutScrolling(action);
        await page.screenshot({ path: 'work/browser-results/recovery-action-phone.png' });
    }
    const target = await action.boundingBox();
    if (!target) throw new Error('The move action is missing.');
    // 点击已验证的屏幕坐标，不调用会自动滚动的 locator.click。
    await page.mouse.click(target.x + target.width / 2, target.y + target.height / 2);
    await expect(page.getByLabel('Page title', { exact: true })).toHaveValue('A little curiosity · a new thought');
    await expect(page.getByRole('button', { name: 'Synced', exact: true })).toBeVisible();
    const saved = await (await page.request.get('/api/notebook')).json();
    expect(saved.notebook.pages[0].strokes).toHaveLength(0);
    expect(saved.notebook.pages[1].strokes.length).toBeGreaterThan(0);
    await expect(recovery).toHaveCount(0);
    await expect(page.locator('.ink-space-toast')).toHaveCount(0);
    await expect(page.getByText('Your ink has its own leaf.', { exact: false })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Ink options', exact: true })).toBeVisible();
    // 移动不是流程终点：直接续写，确认不会再次弹出恢复面板，并核对新增笔迹已保存。
    await drawOverSample(page);
    await expect(recovery).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Synced', exact: true })).toBeVisible();
    const continued = await (await page.request.get('/api/notebook')).json();
    expect(continued.notebook.pages[1].strokes).toHaveLength(saved.notebook.pages[1].strokes.length + 1);
    expect(continued.notebook.pages[1].strokes[0]).toEqual(saved.notebook.pages[1].strokes[0]);
    await page.reload();
    await page.getByRole('button', { name: 'Next notebook page', exact: true }).click();
    await expect(page.getByLabel('Page title', { exact: true })).toHaveValue(continued.notebook.pages[1].title);
    await expect(recovery).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Ink options', exact: true })).toHaveAttribute('aria-expanded', 'false');
    await page.screenshot({ path: `work/browser-results/continued-writing-${testInfo.project.name}.png` });
});

test('overlapping ink moves intact, survives page turns and reload, and can remain an annotation', async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    const toggle = page.getByRole('switch', { name: 'Reply when handwriting pauses' });
    await toggle.click(); await expect(toggle).not.toBeChecked();
    await drawOverSample(page);
    await expect(page.getByRole('region', { name: 'Unsent ink' })).toContainText('overlaps');
    await expect(page.getByRole('button', { name: 'Synced', exact: true })).toBeVisible();
    const before = await (await page.request.get('/api/notebook')).json();
    const mark = before.notebook.pages[0].strokes[0];
    expect(mark.points.length).toBeGreaterThan(2);
    await nextAndBack(page);
    await toggle.click(); await expect(toggle).toBeChecked();
    await page.waitForTimeout(5500);
    await expect(page.locator('.flow-ink')).toHaveCount(0);
    await expect(page.getByRole('region', { name: 'Unsent ink' })).toBeVisible();
    await page.screenshot({ path: `work/browser-results/ink-${test.info().project.name}.png`, fullPage: true });
    await page.getByRole('button', { name: 'Move ink to a fresh leaf' }).click();
    await expect(page.getByLabel('Page title', { exact: true })).toHaveValue('A little curiosity · a new thought');
    await expect(page.getByRole('button', { name: 'Synced', exact: true })).toBeVisible();
    const moved = await (await page.request.get('/api/notebook')).json();
    expect(moved.notebook.pages[0].strokes).toHaveLength(0);
    expect(moved.notebook.pages[0].blocks).toEqual(before.notebook.pages[0].blocks);
    const destination = moved.notebook.pages[1];
    expect(destination.strokes[0].id).toBe(mark.id);
    expect(destination.strokes[0].points.map((point: number[]) => point[2])).toEqual(mark.points.map((point: number[]) => point[2]));
    expect(destination.inkSourcePageId).toBe(before.notebook.pages[0].id);
    await page.reload();
    await page.getByRole('button', { name: 'Next notebook page', exact: true }).click();
    await expect(page.getByLabel('Page title', { exact: true })).toHaveValue(destination.title);
    await page.waitForTimeout(5500);
    await expect(page.locator('.flow-ink')).toHaveCount(0);
    await expect(page.getByRole('region', { name: 'Unsent ink' })).toHaveCount(0);
    await page.getByRole('button', { name: 'Ink options', exact: true }).click();
    await page.getByRole('button', { name: 'Keep as annotation' }).click();
    await expect(page.getByRole('region', { name: 'Unsent ink' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Synced', exact: true })).toBeVisible();
    await page.reload();
    await page.getByRole('button', { name: 'Next notebook page', exact: true }).click();
    await expect(page.getByLabel('Page title', { exact: true })).toHaveValue(destination.title);
    await page.waitForTimeout(5500);
    await expect(page.locator('.flow-ink')).toHaveCount(0);
    const restored = await (await page.request.get('/api/notebook')).json();
    expect(restored.notebook.pages[1].strokes[0].purpose).toBe('annotation');
    expect(restored.notebook.pages[1].strokes[0].id).toBe(mark.id);
    expect(errors).toEqual([]);
});

test('turning a page during the fade leaves the unsent thought visible on return', async ({ page }) => {
    const thought = 'Keep my thought here until I choose to continue.';
    await page.getByRole('textbox', { name: 'Write to your companion' }).fill(thought);
    await page.getByRole('button', { name: 'Send thought', exact: true }).click();
    await expect(page.locator('.flow-ink')).toHaveCount(1);
    await nextAndBack(page);
    await page.waitForTimeout(5500);
    await expect(page.locator('.flow-ink')).toHaveCount(0);
    await expect(page.getByRole('region', { name: 'Unsent ink' })).toHaveCount(0);
    await expect(page.locator('.ink-user').filter({ hasText: thought })).toBeVisible();
    await page.getByRole('button', { name: 'Ink options', exact: true }).click();
    await page.getByRole('button', { name: 'Keep as annotation' }).click();
    await expect(page.getByRole('button', { name: 'Synced', exact: true })).toBeVisible();
    const saved = await (await page.request.get('/api/notebook')).json();
    const written = saved.notebook.pages.flatMap((value: { blocks: { text: string; purpose?: string; pendingInput?: boolean }[] }) => value.blocks)
        .find((block: { text: string }) => block.text === thought);
    expect(written.purpose).toBe('annotation'); expect(written.pendingInput).toBe(false);
});

test('photo upload, crop, retake, original download and recovery use the real application', async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.getByRole('button', { name: 'Your paper notebook', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Your paper notebook', exact: true });
    await dialog.getByLabel('Choose a notebook photo', { exact: true }).setInputFiles('public/demo/harry-potter-notebook-demo.jpg');
    await expect(dialog.getByAltText('Prepared notebook photo')).toBeVisible();
    await dialog.getByLabel('Physical page label').fill('QA paper page');
    await dialog.getByRole('button', { name: 'Rotate 90°' }).click();
    const crop = dialog.getByRole('slider', { name: 'left crop' });
    await expect(crop).toBeEnabled();
    await crop.focus(); await crop.press('ArrowRight');
    await expect(crop).toHaveValue('1');
    await dialog.getByRole('button', { name: 'Save paper page', exact: true }).click();
    await expect(dialog.getByRole('region', { name: 'Saved paper source' })).toBeVisible();
    await expect.poll(() => dialog.getByAltText('Reading copy of QA paper page').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const initial = (await (await page.request.get('/api/captures?notebookId=main')).json()).captures[0];
    expect(initial.rotation).toBe(90); expect(initial.crop.left).toBe(.01);
    const originalDownload = page.waitForEvent('download');
    await dialog.getByRole('button', { name: 'Download original' }).click();
    const original = await originalDownload;
    const expected = await readFile('public/demo/harry-potter-notebook-demo.jpg');
    expect(await readFile((await original.path())!)).toEqual(expected);
    await dialog.getByLabel('Choose a notebook photo', { exact: true }).setInputFiles('tests/fixtures/notebook-reference.png');
    await dialog.getByRole('button', { name: 'Save paper page', exact: true }).click();
    await expect(dialog.getByRole('region', { name: 'Saved paper source' })).toContainText('retake');
    const exportDownload = page.waitForEvent('download');
    await dialog.getByRole('button', { name: 'Export sources & revisions' }).click();
    const backup = await exportDownload;
    const backupPath = (await backup.path())!;
    const bundle = JSON.parse(await readFile(backupPath, 'utf8'));
    expect(bundle.sources).toHaveLength(2);
    expect(bundle.sources[1].capture.parentId).toBe(initial.id);
    expect(bundle.sources[0].capture.originalHash).toBe(createHash('sha256').update(expected).digest('hex'));
    await dialog.getByLabel('Restore paper source recovery file').setInputFiles(backupPath);
    await expect(dialog.getByRole('region', { name: 'Saved paper source' })).toContainText('retake');
    await expect(dialog.locator('.capture-status')).toHaveCount(0);
    await expect(dialog.getByRole('alert')).toHaveCount(0);
    expect((await (await page.request.get('/api/captures?notebookId=main')).json()).captures).toHaveLength(2);
    await page.screenshot({ path: `work/browser-results/paper-${test.info().project.name}.png`, fullPage: true });
    expect(errors).toEqual([]);
});
