import {
  accountAccessDialog,
  accountAccessField,
  accountAccessFieldHelperFor,
  accountAccessMessage
} from './accountAccessMessage';
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
import {
  accountEmployeeTrainingConfirm,
  accountEmployeeTrainingField,
  accountEmployeeTrainingFieldHelperFor,
  accountEmployeeTrainingMessage,
  accountEmployeeTrainingOption,
  accountEmployeeTrainingPage,
  accountEmployeeTrainingSection
} from './accountEmployeeTrainingMessage';
import {
  accountExperienceField,
  accountExperienceFieldHelperFor
} from './accountExperienceMessage';
import { 
  accountFamilyField, 
  accountFamilyFieldHelperFor 
} from './accountFamilyMessage';
import { 
  accountNoteField, 
  accountNoteFieldHelperFor 
} from './accountNoteMessage';
import {
  accountRateDialog,
  accountRateField,
  accountRateFieldHelperFor,
  accountRateMessage
} from './accountRateMessage';
import {
  accountSharedConfirm,
  accountSharedField,
  accountSharedMessage,
  accountSharedOption,
  accountSharedPage,
  accountSharedSection
} from './accountShared';

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
    dialog: accountAccessDialog,
    field: accountAccessField,
    fieldFor: accountAccessFieldHelperFor
  },
  shared: {
    option: accountSharedOption,
    page: accountSharedPage,
    field: accountSharedField,
    message: accountSharedMessage,
    confirm: accountSharedConfirm,
    section: accountSharedSection
  },
  training: {
    field: accountEmployeeTrainingField,
    confirm: accountEmployeeTrainingConfirm,
    fieldFor: accountEmployeeTrainingFieldHelperFor,
    message: accountEmployeeTrainingMessage,
    section: accountEmployeeTrainingSection,
    option: accountEmployeeTrainingOption,
    page: accountEmployeeTrainingPage
  },
  rate: {
    message: accountRateMessage,
    dialog: accountRateDialog,
    field: accountRateField,
    fieldFor: accountRateFieldHelperFor
  },
  family: {
    field: accountFamilyField,
    fieldFor: accountFamilyFieldHelperFor,
  },
  note: {
    field: accountNoteField,
    fieldFor: accountNoteFieldHelperFor
  }
};
