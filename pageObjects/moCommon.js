
class MOCommon {
    constructor() {
        // buttons
        const errorFieldCloseButton = 'div:nth-child(1)';
        const xButton = '.modal .close';

        //title
        const MOTitle = '.modal-title';

        //error fields
        const serverErrorField = 'div[id="modal_error"]';

        this.closeErrorMessage = async function (page) {
            await page.locator(serverErrorField).locator(errorFieldCloseButton).click();
        };

        this.closeMO = async function (page) {
            await page.locator(xButton).click();
        };

        this.getServerErrorText = async function (page) {
            return await page.locator(serverErrorField).innerText();
        };

        this.getTitle = async function (page) {
            const MOTitleLocator = page.locator(MOTitle);
            await MOTitleLocator.waitFor(1000);
            return await MOTitleLocator.innerText();
        };

        this.getServerErrorLocator = function (page) {
            const locator = page.locator(serverErrorField);
            return locator;
        };
    }
}

export { MOCommon };