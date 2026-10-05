import { defineConfig } from 'playwright/test';

export default defineConfig({
    testDir: './tests/browser', timeout: 60000, globalTimeout: 300000,
    expect: { timeout: 10000 }, workers: 1, retries: 0,
    outputDir: 'work/browser-results',
    reporter: [['list'], ['json', { outputFile: 'work/browser-results/results.json' }]],
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4175',
        actionTimeout: 10000, navigationTimeout: 20000,
        screenshot: 'only-on-failure', trace: 'retain-on-failure',
        launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE },
    },
    webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
        command: 'node scripts/browser-test-server.mjs', url: 'http://127.0.0.1:4175/api/notebook',
        timeout: 30000, reuseExistingServer: false, stdout: 'pipe', stderr: 'pipe',
    },
    projects: [
        { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
        { name: 'phone', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
        { name: 'tablet', use: { viewport: { width: 820, height: 1180 }, isMobile: true, hasTouch: true } },
    ],
});
