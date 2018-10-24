import * as appLocaleData from 'react-intl/locale-data/en';

import enExpenseMessages from '../../modules/expense/locales/en_US.json';
import enMileageMessages from '../../modules/mileage/locales/en_US.json';
import enProjectMessages from '../../modules/project/locales/en_US.json';
import enPurchaseMessages from '../../modules/purchase/locales/en_US.json';
import enTimesheetMessages from '../../modules/timesheet/locales/en_US.json';
import enTravelMessages from '../../modules/travel/locales/en_US.json';
import enMessages from '../locales/en_US.json';

const EnLang = {
  messages: {
    ...enMessages,
    ...enProjectMessages,
    ...enMileageMessages,
    ...enPurchaseMessages,
    ...enTravelMessages,
    ...enTimesheetMessages,
    ...enExpenseMessages,
  },
  locale: 'en-US',
  data: appLocaleData,
};

export default EnLang;