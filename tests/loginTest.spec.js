const { test, expect } = require('@playwright/test');
import { app } from '../pageObjects';
import { at } from '../config';
import { step } from '../stepObjects';

test.describe.configure({ mode: 'serial' });

test.describe('Login tests', () => {
    let lang;
    let translations;
    let user = at.users.user2;

    test.beforeAll(async ({ }) => {
        lang = process.env.LANG;
        translations = JSON.parse(process.env.TRANSLATIONS);
    });


    test(`PWC-T59`, async ({ page }) => {
        //login to blocked account   
        await page.goto(`./${lang}/login`, { waitUntil: 'commit' });
        const blockedUser = at.users.blockedUser;

        await app().MOLogin().fillModalLogin(page, blockedUser.login, blockedUser.password);
        await app().MOLogin().clickLoginButton(page);
        await expect(app().MOCommon().getServerErrorLocator(page)).toBeVisible();
        expect(await app().MOCommon().getServerErrorText(page)).toBe(translations.Index.MAIN_RECOVER_PASS_USER_BLOCKED);
    });

    test(`PWC-T37`, async ({ page }) => {
        //login with wrong credentials   
        await page.goto(`./${lang}/login`, { waitUntil: 'commit' });

        await app().MOLogin().fillModalLogin(page, user.login, `${user.password}123`);
        await app().MOLogin().clickLoginButton(page);
        await expect(app().MOCommon().getServerErrorLocator(page)).toBeVisible();
        expect(await app().MOCommon().getServerErrorText(page)).toBe(translations.Index.MAIN_EMAIL_PHONE_NUMBER_OR_PASSWORD_IS_WRONG);

        await app().MOCommon().closeErrorMessage(page);

        await app().MOLogin().fillModalLogin(page, `${user.login}123`, user.password);
        await app().MOLogin().clickLoginButton(page);
        await expect(app().MOCommon().getServerErrorLocator(page)).toBeVisible();
        expect(await app().MOCommon().getServerErrorText(page)).toBe(translations.Index.MAIN_EMAIL_PHONE_NUMBER_OR_PASSWORD_IS_WRONG);
    });

    test(`PWC-T13`, async ({ page }) => {
        //successful login via nickname
        await page.goto('./', { waitUntil: 'commit' });

        await step().PublicNavbar().clickLoginButton(page);

        await app().MOLogin().performLogin(page, user.login, user.password);

        await step().PrivateNavbar().clickProfileButton(page);

        const nickName = await app().AccountPage().getUsername(page);

        expect(nickName).toBe(user.login);
    });

    test(`PWC-T14`, async ({ page }) => {
        // successful login via email

        await page.goto('./', { waitUntil: 'commit' });

        await step().PublicNavbar().clickLoginButton(page);
        await app().MOLogin().performLogin(page, user.email, user.password);

        await step().PrivateNavbar().clickProfileButton(page);

        const nickName = await app().AccountPage().getUsername(page);

        expect(nickName).toBe(user.login);
    });

    test(`PWC-T16`, async ({ page }) => {
        // navigation to registration from login

        await page.goto(`./${lang}/login`, { waitUntil: 'commit' });

        await app().MOLogin().clickRegistrationLink(page);

        await expect(app().MORegistration().getNicknameLocator(page)).toBeVisible();
    });
});