import * as appLocaleData from 'react-intl/locale-data/en';

import enProjectMessages from '../../modules/project/locales/en_US.json';
import enPurchaseMessages from '../../modules/purchase/locales/en_US.json';
import enMessages from '../locales/en_US.json';

const EnLang = {
  messages: {
    ...enMessages,
    ...enProjectMessages,
    ...enPurchaseMessages,
  },
  locale: 'en-US',
  data: appLocaleData,
};

export default EnLang;