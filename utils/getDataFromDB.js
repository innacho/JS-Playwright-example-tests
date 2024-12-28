import { queryDatabase } from './db';
import { DBcred } from '../config/';

class GetDataFromDB {
    constructor() {
        this.getAllowNonConfirmedEmailAccount = async function () {
            const result = await queryDatabase(
                `SELECT * from ${DBcred.DBname}.setting where name=?`, ['allow_non_confirmed_email_account']);
            if (result.length === 0) return false;
            return result[0].value;
        };
    }
}
export { GetDataFromDB }