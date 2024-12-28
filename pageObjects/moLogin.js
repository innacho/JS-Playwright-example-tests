import { helper } from "../utils";

class MOLogin {
    constructor() {
        // buttons
        const mainLoginButton = 'button[id="login_main_login-btn"]';

        // fields
        const modalLoginField = 'input[id="login"]';
        const modalPasswordField = 'input[id="password"]';

        // links
        const registrationLink = 'a[id="login_main_register_new_account-link"]';
        const resetPasswordLink = 'a[id="login_main_forgot_password-link"]';

        this.clearModalLogin = async function (page) {
            await page.fill(modalLoginField, '');
            await page.fill(modalPasswordField, '');
        };

        this.clickLoginButton = async function (page) {
            await page.click(mainLoginButton);
        };

        this.clickRegistrationLink = async function (page) {
            await page.click(registrationLink);
        };

        this.isButtonLoginDisabled = async function (page) {
            const isDisabled = await page.locator(mainLoginButton).isDisabled();
            return isDisabled;
        };

        this.isModalLogin = async function (page) {
            const modalLoginPresent = await page.$(resetPasswordLink);
            return modalLoginPresent;
        };

        this.fillModalLogin = async function (page, username, password) {
            const loginFieldLocator = page.locator(modalLoginField);
            await loginFieldLocator.waitFor(2000);
            await loginFieldLocator.fill(username);
            await page.locator(modalPasswordField).fill(password);
        };

        this.hoverLinkForgotPassword = async function (page) {
            await page.locator(resetPasswordLink).hover();
        };

        this.hoverLoginButton = async function (page) {
            await page.locator(mainLoginButton).hover();
        };

        this.makeScreenshotScroll = async function (page, lang, screenWidth, screenHeight, step) {
            await helper().SaveScreenshot().saveWithVerticalScrollMO(page, step, lang, screenWidth, screenHeight, modalClassName);
        };

        this.modalLoginMock403 = async function (page, username, password) {
            await helper().InterceptRequest().mock403(page, '**/api/auth/v2/login');
            await this.performLogin(page, username, password);
        };

        this.openRegistrationModalFromLogin = async function (page) {
            await page.click(registrationLink);
        };

        this.openResetPasswordModal = async function (page) {
            await page.click(resetPasswordLink);
        };

        this.performLogin = async function (page, username, password) {
            const loginLocator = page.locator(modalLoginField);
            await loginLocator.waitFor(1000);
            await loginLocator.fill(username);
            await page.fill(modalPasswordField, password);
            await page.click(mainLoginButton);
        };
    }
}

export { MOLogin };