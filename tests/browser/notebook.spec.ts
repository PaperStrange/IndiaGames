import { test, expect, type Page } from 'playwright/test';
import { createHash, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';

test.beforeEach(async ({ context, page }) => {
    // 独立身份仅作用于本地测试 Worker；公开部署的身份校验仍由 Sites 提供。
    await context.setExtraHTTPHeaders({ 'oai-authenticated-user-id': `browser-qa-${randomUUID()}` });
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
    await expect(page.getByRole('region', { name: 'Unsent ink' })).toBeVisible();
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
    await expect(page.getByRole('region', { name: 'Unsent ink' })).toBeVisible();
    await expect(page.locator('.ink-user').filter({ hasText: thought })).toBeVisible();
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
