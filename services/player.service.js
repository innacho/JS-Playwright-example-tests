import { headers } from '../config';
import { helper } from '../utils';

class ChangePassword {
    constructor() {
        this.post = async function ChangePassword(token, oldPassword, newPassword) {
            headers['cookie'] = `SESSION_ID_TEST=${token}`;
            const body = JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword });
            const r = await helper().PostRequest().post('/api/player/changePassword', headers, body);
            return r;
        };
    }
}
export { ChangePassword };


