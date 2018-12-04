import { 
  currencyConfirm, 
  currencyField, 
  currencyForm, 
  currencyMessage, 
  currencyPage, 
  currencySection 
} from './currency/currencyMessage';
import { 
  companyConfirm, 
  companyField, 
  companyFieldHelperFor, 
  companyMessage, 
  companyPage, 
  companySection 
} from './lookupCompanyMessage';
import { 
  diemFieldHelperFor, 
  lookupDiemConfirm, 
  lookupDiemField, 
  lookupDiemMessage, 
  lookupDiemPage,
  lookupDiemSection
} from './lookupDiemMessage';
import { 
  roleConfirm, 
  roleField, 
  roleFieldHelperFor, 
  roleMessage, 
  rolePage, 
  roleSection 
} from './lookupRoleMessage';
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
  role: {
    page: rolePage,
    field: roleField,
    fieldFor: roleFieldHelperFor,
    section: roleSection,
    confirm: roleConfirm,
    message: roleMessage
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
  lookupDiem: {
    page: lookupDiemPage,
    section: lookupDiemSection,
    field: lookupDiemField,
    fieldFor: diemFieldHelperFor,
    confirm: lookupDiemConfirm,
    message: lookupDiemMessage

  }
};