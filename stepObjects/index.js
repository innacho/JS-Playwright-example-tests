import { PerformLogin } from './performLogin';
import { PrivateNavbar } from './privateNavbar';
import { PublicNavbar } from './publicNavbar';

const step = (page) => ({
    PerformLogin: () => new PerformLogin(page),
    PrivateNavbar: () => new PrivateNavbar(page),
    PublicNavbar: () => new PublicNavbar(page),
});

export { step };