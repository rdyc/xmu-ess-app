import { currencyConfirm, currencyField, currencyForm, currencyMessage, currencyPage, currencySection } from './currency/currencyMessage';
import { holidayConfirm, holidayField, holidayPage } from './holiday';
import { leaveConfirm, leaveField, leavePage } from './leave';
import { companyConfirm, companyField, companyFieldHelperFor, companyMessage, companyPage, companySection } from './lookupCompanyMessage';
import { mileageExceptionConfirm, mileageExceptionField, mileageExceptionPage } from './mileageException';

export const lookupMessage = {
  mileageException: {
    page: mileageExceptionPage,
    field: mileageExceptionField,
    confirm: mileageExceptionConfirm, 
  },
  holiday: {
    page: holidayPage,
    field: holidayField,
    confirm: holidayConfirm, 
  },
  leave: {
    page: leavePage,
    field: leaveField,
    confirm: leaveConfirm, 
  },
  currency: {
    page: currencyPage,
    field: currencyField,
    confirm: currencyConfirm,
    section: currencySection,
    form: currencyForm,
    message: currencyMessage
  },
  company: {
    page: companyPage,
    field: companyField,
    fieldFor: companyFieldHelperFor,
    section: companySection,
    confirm: companyConfirm,
    message: companyMessage
  },
};