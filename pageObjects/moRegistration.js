
class MORegistration {
    constructor() {
        const selector = 'div[id="registration-sidebar-container"]'
        // buttons
        const createAccountButton = 'button';
        const xButton = 'div[id="registration-header-close_button"]';

        //fields 
        const usernameField = 'input[id="nickName"]';

        this.closeMO = async function (page) {
            await page.locator(xButton).click();
        };

        this.getNicknameLocator = function (page) {
            return page.locator(selector).locator(usernameField);
        };
    }
}

export { MORegistration };