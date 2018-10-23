import * as appLocaleData from 'react-intl/locale-data/en';

import enProjectMessages from '../../modules/project/locales/en_US.json';
import enTravelMessages from '../../modules/travel/locales/en_US.json';
import enMessages from '../locales/en_US.json';

const EnLang = {
  messages: {
    ...enMessages,
    ...enProjectMessages,
    ...enTravelMessages,
  },
  locale: 'en-US',
  data: appLocaleData,
};

export default EnLang;