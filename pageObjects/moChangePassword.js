
class MOChangePassword {
    constructor() {
        // buttons
        const cancelButton = 'button[id="change-password-button_cancel"]';
        const continueButton = 'button[id="change-password-button_continue"]';

        //fields
        const currentPasswordField = 'input[id="currentPassword"]';
        const newConfirmedPasswordField = 'input[id="newConfirmedPassword"]';
        const newPasswordField = 'input[id="newPassword"]';



        this.performChangePassword = async function (page, oldPassword, newPassword) {
            const currentPasswordFieldLocator = page.locator(currentPasswordField);
            await currentPasswordFieldLocator.waitFor(1000);
            await currentPasswordFieldLocator.fill(oldPassword);
            await page.locator(newPasswordField).fill(newPassword);
            await page.locator(newConfirmedPasswordField).fill(newPassword);
            const continueButtonLocator = page.locator(continueButton);
            (selector) => {
                const button = document.querySelector(selector);
                return button && !button.disabled;
            },
                {},
                continueButton;
            await continueButtonLocator.click();
        };
    }
}

export { MOChangePassword };