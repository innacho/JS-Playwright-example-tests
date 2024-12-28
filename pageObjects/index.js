import { AccountPage } from './accountPage';
import { MOChangePassword } from './moChangePassword';
import { MOCommon } from './moCommon';
import { MOLogin } from './moLogin';
import { MORegistration } from './moRegistration';

const app = (page) => ({
    AccountPage: () => new AccountPage(page),
    MOChangePassword: () => new MOChangePassword(page),
    MOCommon: () => new MOCommon(page),
    MOLogin: () => new MOLogin(page),
    MORegistration: () => new MORegistration(page),
});

export { app };