import { BuildUser } from './buildUser';
import { GenerateCurrentMoment } from './generateCurrentMoment';

class GenerateUser {
    constructor() {
        this.generateUser = async function () {
            const currentMoment = new GenerateCurrentMoment().generateCurrentMoment();
            const user = {
                nickName: new BuildUser().createLogin(currentMoment),
                email: new BuildUser().createEmail(currentMoment),
                phone: new BuildUser().createPhone(currentMoment),
                password: 'qaz123',
                currencyCode: 'EUR',
                subscribeOnNews: false,
                bonusCode: '',
                personInfo: {},
                language: 'fr',
                timezone: 'Europe/Moscow',
                dealerCode: '',
                deviceName: 'Desktop (Windows 10)',
                browser: 'Chrome 131.0',
                uuid: '86bd7573-9472-42bf-8829-a1418bd2aef5'
            };

            return user;
        };

        this.generateUserForCountry = async function (country) {
            const currentMoment = new GenerateCurrentMoment().generateCurrentMoment();
            const user = {
                nickName: new BuildUser().createLogin(currentMoment),
                email: new BuildUser().createEmail(currentMoment),
                phone: new BuildUser().createPhoneForCountry(currentMoment, country),
                password: 'qaz123',
                currencyCode: 'EUR',
                subscribeOnNews: false,
                bonusCode: '',
                personInfo: {},
                language: 'fr',
                timezone: 'Europe/Moscow',
                dealerCode: '',
                deviceName: 'Desktop (Windows 10)',
                browser: 'Chrome 123.0',
                uuid: '86bd7573-9472-42bf-8829-a1418bd2aef5'
            };

            return user;
        };

        this.generateUserWithPhoneForCall = async function () {
            const currentMoment = new GenerateCurrentMoment().generateCurrentMoment();
            const user = {
                nickName: new BuildUser().createLogin(currentMoment),
                email: new BuildUser().createEmail(currentMoment),
                phone: new BuildUser().createPhoneForCountry(currentMoment, country),
                password: 'qaz123',
                currencyCode: 'EUR',
                subscribeOnNews: false,
                bonusCode: '',
                personInfo: {},
                language: 'fr',
                timezone: 'Europe/Moscow',
                dealerCode: '',
                deviceName: 'Desktop (Windows 10)',
                browser: 'Chrome 123.0',
                uuid: '86bd7573-9472-42bf-8829-a1418bd2aef5'
            };
            return user;
        };
    }
}

export { GenerateUser };