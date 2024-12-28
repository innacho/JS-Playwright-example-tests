export * from './commonParams';
export * from './headers';
export * from './skinsParams';

import { skinsParams } from './skinsParams';
import { DBcredentials } from './DB.config';

let skinName = process.env.SKIN;
skinName = skinName.trim();
const at = skinsParams[skinName];
export { at }

const DBcred = DBcredentials[skinName];
export { DBcred }