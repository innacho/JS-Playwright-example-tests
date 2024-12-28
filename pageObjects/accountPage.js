class AccountPage {
    constructor() {
        // buttons
        const changePasswordButton = 'div[id="PLAYER_FORM_FIELD_PASSWORD-btn"]';
        const logoutButton = 'button[id="tab-account-button_logout"]';

        //fields
        const usernameField = 'input[id="PLAYER_FORM_FIELD_USERNAME"]';

        this.clickChangePasswordButton = async function (page) {
            const changePasswordButtonLocator = page.locator(changePasswordButton);
            await changePasswordButtonLocator.waitFor(1000);
            await changePasswordButtonLocator.click();
        };

        this.getUsername = async function (page) {
            const usernameFieldLocator = page.locator(usernameField);
            await usernameFieldLocator.waitFor(1000);
            return await usernameFieldLocator.getAttribute('value');
        };

    }
}

export { AccountPage };