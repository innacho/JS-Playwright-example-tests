const { test, expect } = require('@playwright/test');
import { at } from '../config';

async function loadPage(page, baseURL) {
    const responsePromise = page.waitForResponse(`${baseURL}/api/public/banner-cards`);
    await page.goto('./');
    await responsePromise;
}

test.describe.configure({ mode: 'parallel' });
test.describe('ws tests', () => {
    let baseURL;
    let shortBaseURL;

    test.beforeEach(async ({ }) => {
        baseURL = at.url;
        let urlParts = baseURL.split(':');
        shortBaseURL = urlParts[1];
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === 'failed') {
            await page.screenshot({ path: './test-results/screenshot-on-failure.png' });
        }
    });

    test(`ws opens`, async ({ page }) => {
        let wsOpened = false;

        const wsEventPromise = new Promise((resolve) => {
            page.on('websocket', ws => {
                expect(ws.url()).toContain(shortBaseURL);
                wsOpened = true;
                resolve();
            });
        });
        await loadPage(page, baseURL);

        await Promise.race([
            wsEventPromise,
            page.waitForTimeout(7000).then(() => {
                throw new Error('WebSocket event did not occure within the expected time');
            }),
        ]);

        expect(wsOpened).toBeTruthy();
    });

    test(`ws subscribes on jackpots`, async ({ page }) => {
        let wsEventJackpot = false;

        const wsEventPromise = new Promise((resolve) => {
            page.on('websocket', ws => {
                ws.on('framesent', event => {
                    try {
                        const message = JSON.parse(event.payload);
                        if (message.rId == 1) {
                            expect(message.dest).toContain('jackpot');
                            wsEventJackpot = true;
                            resolve();
                        }
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                });
            });
        });
        await loadPage(page, baseURL);

        await Promise.race([
            wsEventPromise,
            page.waitForTimeout(7000).then(() => {
                throw new Error('WebSocket event did not occur within the expected time');
            }),
        ]);

        expect(wsEventJackpot).toBeTruthy();
    });

    test(`ws subscribes on win-stats`, async ({ page }) => {
        let wsEventWinStats = false;
        const wsEventPromise = new Promise((resolve) => {
            page.on('websocket', ws => {
                ws.on('framesent', event => {
                    try {
                        const message = JSON.parse(event.payload);
                        if (message.rId == 2) {
                            expect(message.dest).toContain('win-stats');
                            wsEventWinStats = true;
                            resolve();
                        }
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                });
            });
        });

        await loadPage(page, baseURL);

        await Promise.race([
            wsEventPromise,
            page.waitForTimeout(7000).then(() => {
                throw new Error("WebSocket event did not occur within the expected time");
            }),
        ]);
        expect(wsEventWinStats).toBeTruthy();
    });

    test(`ws gets guest kiosk info`, async ({ page }) => {
        let wsEventKiosk = false;
        const wsEventPromise = new Promise((resolve) => {
            page.on('websocket', ws => {
                ws.on('framereceived', event => {
                    try {
                        const message = JSON.parse(event.payload);
                        if (message.success === true && message.mode === 'Complete') {
                            expect(message.data['kiosk-id']).toEqual('guest');
                            wsEventKiosk = true;
                            resolve();
                        }
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                });
            });
        });
        await loadPage(page, baseURL);
        await Promise.race([
            wsEventPromise,
            page.waitForTimeout(10000).then(() => {
                throw new Error("WebSocket event did not occur within the expected time");
            }),
        ]);
        expect(wsEventKiosk).toBeTruthy();
    });

    test(`ws gets jackpot info`, async ({ page }) => {
        let wsEventGetJackpot = false;
        const wsEventPromise = new Promise((resolve) => {
            page.on('websocket', ws => {
                ws.on('framereceived', event => {
                    try {
                        const message = JSON.parse(event.payload);
                        if (message.rId == 1) {
                            expect(message.data[0].jackpotId).toBeDefined();
                            wsEventGetJackpot = true;
                            resolve();
                        }
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                });
            });
        });

        await loadPage(page, baseURL);

        await Promise.race([
            wsEventPromise,
            page.waitForTimeout(10000).then(() => {
                throw new Error("WebSocket event did not occur within the expected time");
            }),
        ]);

        expect(wsEventGetJackpot).toBeTruthy();
    });

    test(`ws gets best win info`, async ({ page }) => {
        let wsEventGetBestWin = false;
        const wsEventPromise = new Promise((resolve) => {
            page.on('websocket', ws => {
                ws.on('framereceived', event => {
                    try {
                        const message = JSON.parse(event.payload);
                        if (message.rId == 2) {
                            expect(message.data.lastBigWins[0].timestamp).toBeDefined();
                            wsEventGetBestWin = true;
                            resolve();
                        }
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                });
            });
        });
        await loadPage(page, baseURL);
        await Promise.race([
            wsEventPromise,
            page.waitForTimeout(10000).then(() => {
                throw new Error("WebSocket event did not occur within the expected time");
            }),
        ]);
        expect(wsEventGetBestWin).toBeTruthy();
    });
});