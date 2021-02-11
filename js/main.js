import {ADS_COUNT} from './const.js';
import {createAd} from './data.js';

const ads = new Array(ADS_COUNT)
  .fill('')
  .map(() => createAd());

ads;
