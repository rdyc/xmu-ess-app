import {
  currencyConfirm,
  currencyField,
  currencyForm,
  currencyMessage,
  currencyPage,
  currencySection
} from './currency/currencyMessage';
import {
  holidayConfirm,
  holidayField,
  holidayFieldHelperFor,
  holidayMessage,
  holidayPage,
  holidaySection
} from './holiday';
import {
  leaveConfirm,
  leaveField,
  leaveFieldHelperFor,
  leaveMessage,
  leavePage,
  leaveSection
} from './leave';
import { 
  companyConfirm,
  companyDialog, 
  companyField, 
  companyFieldHelperFor, 
  companyMessage, 
  companyPage,
  companySection
} from './lookupCompanyMessage';
import {
  customerFieldHelperFor,
  lookupCustomerConfirm,
  lookupCustomerFields,
  lookupCustomerMessage,
  lookupCustomerPage,
  lookupCustomerSection
} from './lookupCustomerMessage';
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
  roleDialog, 
  roleField, 
  roleFieldHelperFor, 
  roleMessage, 
  rolePage, 
  roleSection
} from './lookupRoleMessage';
import {
  mileageExceptionConfirm,
  mileageExceptionField,
  mileageExceptionFieldHelperFor,
  mileageExceptionMessage,
  mileageExceptionPage,
  mileageExceptionSection
} from './mileageException';
import {
  positionConfirm,
  positionField,
  positionFieldHelperFor,
  positionForm,
  positionMessage,
  positionPage,
  positionSection
} from './positionMessage';
import { lookupConfirm } from './shared';
import {
  systemLimitConfirm,
  systemLimitField,
  systemLimitFieldHelperFor,
  systemLimitMessage,
  systemLimitPage,
  systemLimitSection
} from './systemLimit';

export const lookupMessage = {
  shared: {
    confirm: lookupConfirm
  },
  mileageException: {
    page: mileageExceptionPage,
    field: mileageExceptionField,
    fieldFor: mileageExceptionFieldHelperFor,
    section: mileageExceptionSection,
    message: mileageExceptionMessage,
    confirm: mileageExceptionConfirm
  },
  role: {
    page: rolePage,
    field: roleField,
    fieldFor: roleFieldHelperFor,
    section: roleSection,
    confirm: roleConfirm,
    message: roleMessage,
    dialog: roleDialog
  },
  systemLimit: {
    page: systemLimitPage,
    field: systemLimitField,
    fieldFor: systemLimitFieldHelperFor,
    section: systemLimitSection,
    message: systemLimitMessage,
    confirm: systemLimitConfirm
  },
  holiday: {
    page: holidayPage,
    field: holidayField,
    fieldFor: holidayFieldHelperFor,
    section: holidaySection,
    confirm: holidayConfirm,
    message: holidayMessage
  },
  leave: {
    page: leavePage,
    field: leaveField,
    fieldFor: leaveFieldHelperFor,
    section: leaveSection,
    confirm: leaveConfirm,
    message: leaveMessage
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
    message: companyMessage,
    dialog: companyDialog
  },
  position: {
    page: positionPage,
    field: positionField,
    fieldFor: positionFieldHelperFor,
    section: positionSection,
    confirm: positionConfirm,
    form: positionForm,
    message: positionMessage
  },
  lookupDiem: {
    page: lookupDiemPage,
    section: lookupDiemSection,
    field: lookupDiemField,
    fieldFor: diemFieldHelperFor,
    confirm: lookupDiemConfirm,
    message: lookupDiemMessage
  },
  lookupCustomer: {
    page: lookupCustomerPage,
    section: lookupCustomerSection,
    field: lookupCustomerFields,
    fieldFor: customerFieldHelperFor,
    confirm: lookupCustomerConfirm,
    message: lookupCustomerMessage
  }
};
