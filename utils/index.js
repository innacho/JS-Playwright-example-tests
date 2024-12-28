import { CookiesAccess } from './cookiesAccess';
import { GenerateUser } from './generateUser';
import { GetDataFromDB } from './getDataFromDB';
import { InterceptRequest } from './requestInterception';
import { PostRequest } from './performRequest';

const helper = () => ({
    CookiesAccess: () => new CookiesAccess(),
    GenerateUser: () => new GenerateUser(),
    GetDataFromDB: () => new GetDataFromDB(),
    InterceptRequest: () => new InterceptRequest(),
    PostRequest: () => new PostRequest(),
});

export { helper };