import { fingerprint, headers } from '../config'
import { helper } from '../utils';

class ChangeLanguage {
    constructor() {
        this.post = async function post(token, lang) {
            const header = {
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                cookie: `SESSION_ID_TEST=${token}; customLocale=${lang}`,
            };
            const body = `lang=${lang}&redirectUrl=%2F${lang}`;
            const r = await helper().PostRequest().post('/api/auth/change-language', header, body);
            return r;
        };
    }
}
export { ChangeLanguage };

class Login {
    constructor() {
        this.post = async function post(login, password) {
            const body = fingerprint;
            body['emailOrNickname'] = login;
            body['password'] = password;
            const r = await helper().PostRequest().post('/api/auth/v2/login', headers, body);
            const id = await r.json();
            const playerId = id.data.playerInfo ? id.data.playerInfo.playerId : null;
            let token = null;
            if (playerId === null) return { playerId, token };
            const cookies = r.headers();
            const cookieString = cookies['set-cookie'];
            // Удаляем переносы строк и лишние пробелы
            const sanitizedCookieString = cookieString.replace(/\s+/g, '');
            // Разбиваем строку на части
            const parts = sanitizedCookieString.split(/[;/]+/);
            // Ищем токен
            const tokenPart = parts.find(part => part.startsWith('SESSION_ID_TEST='));
            if (tokenPart) {
                token = tokenPart.split('=')[1];
            } else {
                console.log('Token not found');
            }
            return { playerId, token };
        };
    }
}
export { Login };

class Logout {
    constructor() {
        this.post = async function post(token) {
            headers['cookie'] = `SESSION_ID_TEST=${token}`;
            const body = JSON.stringify({});
            const r = await helper().PostRequest().post('/api/auth/logout', headers, body);
            return r;
        };
    }
}
export { Logout };

class Register {
    constructor() {
        this.post = async function post(body) {
            const r = await helper().PostRequest().post('/api/auth/register', headers, body);
            return r;
        };
    }
}
export { Register };