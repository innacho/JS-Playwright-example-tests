const { test, expect } = require('@playwright/test');
import { apiProvider } from '../services';
import { app } from '../pageObjects';
import { helper } from '../utils';
import { step } from '../stepObjects';

test.describe.configure({ mode: 'serial' });

test.describe('New user tests', () => {
    let allowUnconfirmed;
    let lang;
    let translations;
    let user;

    test.beforeAll(async ({ }) => {
        lang = process.env.LANG;
        translations = JSON.parse(process.env.TRANSLATIONS);
        allowUnconfirmed = await helper().GetDataFromDB().getAllowNonConfirmedEmailAccount();
        user = await helper().GenerateUser().generateUser();
        const r = await apiProvider().Register().post(user);
        expect(r.ok()).toBeTruthy();
    });


    test(`PWC-T46`, async ({ page }) => {
        //login to profile with unconfirmed email (expected results depends on skin)  
        await page.goto(`./${lang}/login`, { waitUntil: 'commit' });

        await app().MOLogin().fillModalLogin(page, user.nickName, user.password);
        await app().MOLogin().clickLoginButton(page);

        if (allowUnconfirmed === 'true') {
            await step().PrivateNavbar().clickProfileButton(page);

            const nickName = await app().AccountPage().getUsername(page);
            expect(nickName).toBe(user.nickName);
        } else {
            await expect(app().MOCommon().getServerErrorLocator(page)).toBeVisible();
            const translation = translations.Index.USER_MESSAGE_EMAIL_VERIFICATION_REQUIRED
            const errorMessage = await app().MOCommon().getServerErrorText(page);
            const errorMessageFirstPart = translation.split('<span>')[0];
            const errorMessageSecondPart = translation.split('</span>')[1];
            expect(errorMessage).toBe(`${errorMessageFirstPart}${user.email}${errorMessageSecondPart}`);
        };
    });

});