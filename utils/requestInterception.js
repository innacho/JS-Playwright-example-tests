import { at } from "../config";
class InterceptRequest {
    constructor() {
        this.getResponceBodyField = async function (page, path, fieldName) {
            return new Promise(async (resolve) => {
                await page.route(path, async (route, request) => {
                    const options = {
                        method: `${request.method()}`,
                        headers: request.headers(),
                        body: request.postData(),
                    };

                    if (at.siteCredentials) options.headers['Authorization'] = `Basic ${at.siteCredentials.base64encoded}`;

                    const response = await fetch(request.url(), options);
                    let body = await response.text();
                    body = JSON.parse(body);
                    let fieldValue = body[fieldName];
                    body = JSON.stringify(body);

                    route.fulfill({
                        response,
                        body
                    });
                    resolve(fieldValue);
                });
            });
        };

        this.mock403 = async function (page, path) {
            await page.route(path, async (route) => {
                route.fulfill({
                    status: 403,
                    contentType: 'application/json',
                });
            });
        };

        this.mock500 = async function (page, path) {
            await page.route(path, async (route) => {
                let body = {
                    success: false,
                    errorMessage: 'Service is not accessable',
                    errorCode: 'SERVICE_IS_NOT_ACCESSABLE',
                    data: null
                };

                body = JSON.stringify(body);

                route.fulfill({
                    status: 500,
                    body: body,
                    contentType: 'application/json',
                });
            });
        };
    }
}

export { InterceptRequest }