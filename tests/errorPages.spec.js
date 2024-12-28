const { test, expect } = require('@playwright/test');
import { at } from '../config';
import { screenshotSizes } from '../config';

async function doScreens(page, skinName, errorName) {
    for (const size of screenshotSizes) {
        await page.setViewportSize({
            width: size[0],
            height: size[1]
        });

        let now = new Date();
        await page.screenshot({
            path: `./screens/${skinName}/${skinName}_${errorName}_error_${size[0]}х${size[1]}.png`
        });
    };
};

async function makeAndCheckScreens(page, skinName, errorName) {
    for (const size of screenshotSizes) {
        await page.setViewportSize({
            width: size[0],
            height: size[1]
        });

        await page.reload();

        let now = new Date();
        await page.screenshot({
            path: `./screens/${skinName}/${skinName}_${errorName}_error_${size[0]}х${size[1]}_${now.getFullYear()}_${(now.getMonth() + 1)}_${now.getDate()}.png`
        });

        await expect(page).toHaveScreenshot([`${skinName}`, `${skinName}_${errorName}_error_${size[0]}х${size[1]}.png`], { maxDiffPixelRatio: 0.02 });
    };
};



test(`error pages`, async ({ page }) => {

    await page.goto('/assets/error/404.html');
    //await doScreens(page, skinName, '404');
    await makeAndCheckScreens(page, at.skinName, '404');
    // //checking home page button on error page
    await page.locator('.button-home').click();
    await page.locator('li[id = "splide01-slide01"]').waitFor();
    await expect(page.locator('li[id = "splide01-slide01"]')).toBeVisible();

    await page.goto('/assets/error/502.html');
    //await doScreens(page, skinName, '502');
    await makeAndCheckScreens(page, at.skinName, '502');

    await page.goto('/assets/error/UnavailableCountry.html');
    //await doScreens(page, skinName, 'UnavailableCountry');
    await makeAndCheckScreens(page, at.skinName, 'UnavailableCountry');

});