import { ChangeLanguage, Login, Logout, Register } from './auth.service';
import { ChangePassword } from './player.service';

const apiProvider = () => ({
    ChangeLanguage: () => new ChangeLanguage(),
    ChangePassword: () => new ChangePassword(),
    Login: () => new Login(),
    Logout: () => new Logout(),
    Register: () => new Register(),
});

export { apiProvider };