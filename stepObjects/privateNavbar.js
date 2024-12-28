class PrivateNavbar {
    constructor() {
        //buttons    
        const burgerMenuButton = 'div[id="navbar_burger-btn"]';
        const depositButton = 'button[id="navbar_player_top_up-btn"]';
        const profileButton = '.btn-circle.profile';

        //fields
        const balanceField = 'div[id="navbar_player_balance"]';

        this.clickProfileButton = async function (page) {
            const profileButtonLocator = page.locator(profileButton);
            await profileButtonLocator.waitFor(1000);
            await profileButtonLocator.click();
        };

        this.isProfileButtonVisible = async function (page) {
            const profileButtonLocator = page.locator(profileButton);
            await profileButtonLocator.waitFor(1000);
            return await profileButtonLocator.isVisible();
        };
    }
}

export { PrivateNavbar };