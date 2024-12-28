const params = require('./config/skinsParams.js');
const fetch = require('node-fetch');

let SKIN = process.env.SKIN;
if (process.env.CI) {
    SKIN = process.env.skinName
    process.env.SKIN = SKIN
}
SKIN = SKIN.trim();
let randomLang;

async function globalSetup() {
    //choosing random language
    randomLang = getRandomElement(params.skinsParams[SKIN].languages);
    process.env.LANG = randomLang;
    console.log('Lang global variable set:', process.env.LANG);
    await getTranslations();
};

export default globalSetup;

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

const getRandomElement = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

const getTranslations = async () => {
    const apiUrl = `${params.skinsParams[SKIN].url}/assets/lang/${randomLang}.json?v=${generateRandomString(12)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();

        process.env.TRANSLATIONS = JSON.stringify(jsonData);
    } catch (error) {
        console.error('Ошибка при выполнении GET-запроса: ', error.message);
        throw error;
    }
};