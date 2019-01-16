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
import { 
  accountEmployeeTrainingConfirm, 
  accountEmployeeTrainingField, 
  accountEmployeeTrainingFieldHelperFor, 
  accountEmployeeTrainingMessage, 
  accountEmployeeTrainingSection
} from './accountEmployeeTrainingMessage';

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
  training: {
    field: accountEmployeeTrainingField,
    confirm: accountEmployeeTrainingConfirm,
    fieldFor: accountEmployeeTrainingFieldHelperFor,
    message: accountEmployeeTrainingMessage,
    section: accountEmployeeTrainingSection
  }
};