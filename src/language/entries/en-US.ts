import * as appLocaleData from 'react-intl/locale-data/en';

import enExpenseMessages from '../../modules/expense/locales/en_US.json';
import enLeaveMessages from '../../modules/leave/locales/en_US.json';
import enProjectMessages from '../../modules/project/locales/en_US.json';
import enMessages from '../locales/en_US.json';

const EnLang = {
  messages: {
    ...enMessages,
    ...enProjectMessages,
    ...enExpenseMessages,
    ...enLeaveMessages
  },
  locale: 'en-US',
  data: appLocaleData,
};

export default EnLang;