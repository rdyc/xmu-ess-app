import { currencyConfirm, currencyField, currencyForm, currencyMessage, currencyPage, currencySection } from './currency/currencyMessage';
import { companyConfirm, companyField, companyFieldHelperFor, companyMessage, companyPage, companySection } from './lookupCompanyMessage';
import { lookupCustomerConfirm, lookupCustomerFields, lookupCustomerPage, lookupCustomerSection } from './lookupCustomerMessage';
import { mileageExceptionConfirm, mileageExceptionField, mileageExceptionPage } from './mileageException';

export const lookupMessage = {
  mileageException: {
    page: mileageExceptionPage,
    field: mileageExceptionField,
    confirm: mileageExceptionConfirm, 
  },

  LookupCustomer: {
    page: lookupCustomerPage,
    section: lookupCustomerSection,
    field: lookupCustomerFields,
    confirm: lookupCustomerConfirm,
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