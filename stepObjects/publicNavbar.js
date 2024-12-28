
class PublicNavbar {
    constructor() {
        //buttons
        const loginButton = 'button[id="main_menu_login-btn"]';
        const registerButton = 'button[id="main_menu_join-btn"]';

        this.clickLoginButton = async function (page) {
            await page.locator(loginButton).click();
        };

        this.clickRegistrationButton = async function (page) {
            await page.locator(registerButton).click();
        };
    }
}

export { PublicNavbar };