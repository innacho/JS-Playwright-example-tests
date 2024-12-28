import { app } from '../pageObjects';
import { helper } from '../utils';
import { step } from "./index";
class PerformLogin {
    constructor() {
        this.performLogin = async function (page, userName, password) {
            await step().PublicNavbar().clickLoginButton(page);
            await app().MOLogin().performLogin(page, userName, password);
            await step().PrivateNavbar().isProfileButtonVisible(page);
            return await helper().CookiesAccess().getCookieValue(page, 'SESSION_ID_TEST');
        };
    }
}
export { PerformLogin }