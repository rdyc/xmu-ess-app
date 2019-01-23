import { accountAccessDialog, accountAccessField, accountAccessFieldHelperFor, accountAccessMessage } from './accountAccessMessage';
import { accountEducationConfirm, accountEducationField, accountEducationFieldHelperFor, accountEducationMessage, accountEducationOption, accountEducationPage, accountEducationSection } from './accountEducationMessage';
import { accountEmployeeConfirm, accountEmployeeField, accountEmployeeFieldHelperFor, accountEmployeeFilter, accountEmployeeMessage, accountEmployeePage, accountEmployeeSection, accountEmployeeTab } from './accountEmployeeMessage';
import { 
  accountEmployeeTrainingConfirm, 
  accountEmployeeTrainingField, 
  accountEmployeeTrainingFieldHelperFor, 
  accountEmployeeTrainingMessage, 
  accountEmployeeTrainingOption, 
  accountEmployeeTrainingPage, 
  accountEmployeeTrainingSection 
} from './accountEmployeeTrainingMessage';

export const accountMessage = {
  employee: {
    page: accountEmployeePage,
    tab: accountEmployeeTab,
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
    page: accountEducationPage,
    option: accountEducationOption
  },
  access: {
    message: accountAccessMessage,
    dialog: accountAccessDialog,
    field: accountAccessField,
    fieldFor: accountAccessFieldHelperFor,
  },
  training: {
    field: accountEmployeeTrainingField,
    confirm: accountEmployeeTrainingConfirm,
    fieldFor: accountEmployeeTrainingFieldHelperFor,
    message: accountEmployeeTrainingMessage,
    section: accountEmployeeTrainingSection,
    option: accountEmployeeTrainingOption,
    page: accountEmployeeTrainingPage
  }
};