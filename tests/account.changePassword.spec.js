const { test, expect } = require('@playwright/test');
import { at } from '../config';
import { apiProvider } from '../services';
import { app } from '../pageObjects';
import { helper } from '../utils';
import { step } from '../stepObjects';

test.setTimeout(5 * 10 * 1000);

test.describe.configure({ mode: 'serial' });

test.describe('Change password tests', () => {
    let translations = JSON.parse(process.env.TRANSLATIONS);
    let lang = process.env.LANG;
    let AUTH_TOKEN;
    let user = at.users.user1;
    test.beforeEach(async ({ page }) => {
        await page.goto(`./${lang}`, { waitUntil: 'commit' });
        AUTH_TOKEN = await step().PerformLogin().performLogin(page, user.email, user.password);
        const r = await apiProvider().ChangeLanguage().post(AUTH_TOKEN, lang);
        expect(r.ok()).toBeTruthy();
        await page.reload();
        await step().PrivateNavbar().clickProfileButton(page);
    })
    test(`PWC-T123`, async ({ page }) => {
        //change password in profile
        const newPassword = '*****';

        await app().AccountPage().clickChangePasswordButton(page);

        await app().MOChangePassword().performChangePassword(page, user.password, newPassword);

        await page.waitForURL('**/profile/account');

        const r = await apiProvider().Logout().post(AUTH_TOKEN);
        expect(r.ok()).toBeTruthy();

        //не удается авторизоваться со старым паролем       
        const { playerId: playerId1, token: authToken1 } = await apiProvider().Login().post(user.login, user.password);
        expect(playerId1).toBeNull();
        expect(authToken1).toBeNull();

        //можно успешно авторизоваться с новым паролем
        const { playerId: playerId2, token: authToken2 } = await apiProvider().Login().post(user.login, newPassword);
        expect(playerId2).toBe(user.playerId);
        expect(authToken2).not.toBeNull();

        //меняем пароль обратно
        const r3 = await apiProvider().ChangePassword().post(authToken2, newPassword, user.password);
        expect(r3.ok()).toBeTruthy();

    });

    test(`Change password 403 error`, async ({ page }) => {

        await helper().InterceptRequest().mock403(page, '**/api/player/changePassword');

        await app().AccountPage().clickChangePasswordButton(page);

        await app().MOChangePassword().performChangePassword(page, user.password, '******');

        await page.waitForURL('**/reload-required');
        expect(page.url()).toContain('/reload-required');
        expect(await app().MOCommon().getTitle(page)).toBe(translations.Index.ERROR_MODAL_AUTH_REQUIRES_PAGE_RELOAD_TITLE);
    });

    test(`Change password 500 error`, async ({ page }) => {

        await helper().InterceptRequest().mock500(page, '**/api/player/changePassword');

        await app().AccountPage().clickChangePasswordButton(page);

        await app().MOChangePassword().performChangePassword(page, user.password, '******');

        await expect(app().MOCommon().getServerErrorLocator(page)).toBeVisible();
        const errorText = await app().MOCommon().getServerErrorText(page);
        expect(errorText).toContain('Internal server error');
        const containsDigits = (str) => /\d/.test(str);
        expect(containsDigits(errorText)).toBeTruthy();
    });
});