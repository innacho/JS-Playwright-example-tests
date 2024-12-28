import { request } from '@playwright/test';
import { at } from '../config'

class PostRequest {
    constructor() {
        this.post = async function PostRequest(path, headers, params) {
            if (at.siteCredentials) headers['Authorization'] = `Basic ${at.siteCredentials.base64encoded}`;
            const apiContext = await request.newContext({
                baseURL: `${at.url}`,
                extraHTTPHeaders: headers
            });
            const r = await apiContext.post(path, {
                data: params
            });
            return r;
        };
    }
}

export { PostRequest }