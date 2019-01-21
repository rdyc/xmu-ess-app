import { accountAccessMessage } from './accountAccessMessage';
import { 
  accountEducationConfirm,
  accountEducationField,
  accountEducationFieldHelperFor,
  accountEducationMessage,
  accountEducationPage,
  accountEducationSection
} from './accountEducationMessage';
import {
  accountEmployeeConfirm,
  accountEmployeeField,
  accountEmployeeFieldHelperFor,
  accountEmployeeFilter,
  accountEmployeeMessage,
  accountEmployeePage,
  accountEmployeeSection
} from './accountEmployeeMessage';

export const accountMessage = {
  employee: {
    page: accountEmployeePage,
    field: accountEmployeeField,
    confirm: accountEmployeeConfirm,
    fieldFor: accountEmployeeFieldHelperFor,
    section: accountEmployeeSection,
    message: accountEmployeeMessage,
    filter: accountEmployeeFilter
  },
  education: {
    section: accountEducationSection,
    field: accountEducationField,
    fieldFor: accountEducationFieldHelperFor,
    message: accountEducationMessage,
    confirm: accountEducationConfirm,
    page: accountEducationPage
  },
  access: {
    message: accountAccessMessage
  },
};