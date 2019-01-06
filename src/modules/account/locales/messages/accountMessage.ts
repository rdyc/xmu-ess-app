import { accountAccessMessage } from './accountAccessMessage';
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
  access: {
    message: accountAccessMessage
  },
};