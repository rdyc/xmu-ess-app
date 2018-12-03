import { currencyConfirm, currencyField, currencyForm, currencyMessage, currencyPage, currencySection } from './currency/currencyMessage';
import { companyConfirm, companyField, companyFieldHelperFor, companyMessage, companyPage, companySection } from './lookupCompanyMessage';
import { lookupCustomerConfirm, lookupCustomerFields, lookupCustomerPage, lookupCustomerSection } from './lookupCustomerMessage';
import {
  mileageExceptionField,
  mileageExceptionFieldHelperFor,
  mileageExceptionMessage,
  mileageExceptionPage,
  mileageExceptionSection
} from './mileageException';
import { lookupConfirm } from './shared';
import { systemLimitField, systemLimitFieldHelperFor, systemLimitMessage, systemLimitPage, systemLimitSection } from './systemLimit';

export const lookupMessage = {
  mileageException: {
    page: mileageExceptionPage,
    field: mileageExceptionField,
    fieldFor: mileageExceptionFieldHelperFor,
    section: mileageExceptionSection,
    message: mileageExceptionMessage
  },
  systemLimit: {
    page: systemLimitPage,
    field: systemLimitField,
    fieldFor: systemLimitFieldHelperFor,
    section: systemLimitSection,
    message: systemLimitMessage,
  },
  shared: {
    confirm: lookupConfirm
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