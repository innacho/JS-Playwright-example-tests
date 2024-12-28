import { at } from "../config";
class CookiesAccess {
    constructor() {
        this.getCookieValue = async function (page, cookieName) {
            const context = page.context();
            let cookies = await context.cookies();
            let cookieValue = cookies.find(x => x.name === cookieName).value;
            return cookieValue;

        };

        this.setCookie = async function (page, cookieName, cookieValue) {
            const context = page.context();
            const newCookie = {
                name: cookieName,
                value: cookieValue,
                domain: at.url,
                path: '/',
                expires: -1,
                httpOnly: false,
                secure: false,
                sameSite: 'Lax'
            }
            await context.addCookies([newCookie]);
        };
    }
}

export { CookiesAccess }