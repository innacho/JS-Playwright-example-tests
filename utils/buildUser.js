const BuildUser = function () {
    this.createLogin = function (currentMoment) {
        const login = `inna${currentMoment}`;
        return login;
    };
    this.createEmail = function (currentMoment) {
        const email = `inna${currentMoment}@mail.ru`;
        return email;
    };
    this.createPhone = function (currentMoment) {
        const phoneNum = currentMoment.slice(-6);
        const phone = `9104${phoneNum}`;
        return phone;
    };
    this.createPhoneForCountry = function (currentMoment, country) {
        const phoneNum = currentMoment.slice(-6);
        let phone;
        if (country == 'NL') {
            phone = `620${phoneNum}`;
        } else if (country == 'RU') {
            phone = `9104${phoneNum}`;
        }
        else phone = `9104${phoneNum}`;
        return phone;
    };
    this.createPhoneForCall = function (currentMoment) {
        const phone = `+ 44745${currentMoment} `;
        return phone;
    };
};

export { BuildUser };
