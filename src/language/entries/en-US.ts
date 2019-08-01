import * as appLocaleData from 'react-intl/locale-data/en';

import enLayoutMessages from '../../modules/@layout/locales/en_US.json';
import enAccountMessages from '../../modules/account/locales/en_US.json';
import enCommonMessages from '../../modules/common/locales/en-US.json';
import enExpenseMessages from '../../modules/expense/locales/en_US.json';
import enFinanceMessages from '../../modules/finance/locales/en_US.json';
import enHomeMessages from '../../modules/home/locales/en_US.json';
import enHr from '../../modules/hr/locales/en_US.json';
import enLeaveMessages from '../../modules/leave/locales/en_US.json';
import enLookupMessages from '../../modules/lookup/locales/en_US.json';
import enMileageMessages from '../../modules/mileage/locales/en_US.json';
import enWorkflowMessages from '../../modules/organization/locales/en_US.json';
import enProjectMessages from '../../modules/project/locales/en_US.json';
import enPurchaseMessages from '../../modules/purchase/locales/en_US.json';
import enSummaryMessages from '../../modules/summary/locales/en_US.json';
import enTimesheetMessages from '../../modules/timesheet/locales/en_US.json';
import enTravelMessages from '../../modules/travel/locales/en_US.json';
import enMessages from '../locales/en_US.json';

const EnLang = {
  messages: {
    ...enMessages,
    ...enLayoutMessages,
    ...enAccountMessages,
    ...enHomeMessages,
    ...enWorkflowMessages,
    ...enMileageMessages,
    ...enProjectMessages,
    ...enPurchaseMessages,
    ...enTravelMessages,
    ...enTimesheetMessages,
    ...enExpenseMessages,
    ...enFinanceMessages,
    ...enLeaveMessages,
    ...enSummaryMessages,
    ...enCommonMessages,
    ...enLookupMessages,
    ...enAccountMessages,
    ...enHr
  },
  locale: 'en-US',
  data: appLocaleData,
};

export default EnLang;