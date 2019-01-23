import { accountAccessMessage } from './accountAccessMessage';
import { 
  accountEducationField,
  accountEducationFieldHelperFor
} from './accountEducationMessage';
import {
  accountEmployeeConfirm,
  accountEmployeeField,
  accountEmployeeFieldHelperFor,
  accountEmployeeFilter,
  accountEmployeeSection
} from './accountEmployeeMessage';
import { accountExperienceField, accountExperienceFieldHelperFor } from './accountExperienceMessage';
import { accountSharedMessage, accountSharedOption, accountSharedPage } from './accountShared';

export const accountMessage = {
  employee: {
    field: accountEmployeeField,
    confirm: accountEmployeeConfirm,
    fieldFor: accountEmployeeFieldHelperFor,
    section: accountEmployeeSection,
    filter: accountEmployeeFilter
  },
  education: {
    field: accountEducationField,
    fieldFor: accountEducationFieldHelperFor
  },
  experience: {
    field: accountExperienceField,
    fieldFor: accountExperienceFieldHelperFor
  },
  access: {
    message: accountAccessMessage,
  },
  shared: {
    option: accountSharedOption,
    page: accountSharedPage,
    message: accountSharedMessage
  }
};