import * as appLocaleData from 'react-intl/locale-data/en';

import enMileageMessages from '../../modules/mileage/locales/en_US.json';
import enProjectMessages from '../../modules/project/locales/en_US.json';
import enMessages from '../locales/en_US.json';

const EnLang = {
  messages: {
    ...enMessages,
    ...enProjectMessages,
    ...enMileageMessages,
  },
  locale: 'en-US',
  data: appLocaleData,
};

export default EnLang;