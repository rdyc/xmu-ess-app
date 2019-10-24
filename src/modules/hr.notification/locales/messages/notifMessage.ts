import { 
  notifPeriodConfirm, 
  notifPeriodField, 
  notifPeriodFieldHelperFor, 
  notifPeriodMessage, 
  notifPeriodPage,
  notifPeriodSection,
  notifPeriodSubmission
} from './notifPeriodMessage';
import { 
  notifSettingConfirm, 
  notifSettingField, 
  notifSettingFieldHelperFor, 
  notifSettingMessage, 
  notifSettingPage, 
  notifSettingSection, 
  notifSettingSubmission 
} from './notifSettingMessage';
import { 
  notifTemplateConfirm, 
  notifTemplateField, 
  notifTemplateFieldHelperFor, 
  notifTemplateMessage, 
  notifTemplatePage, 
  notifTemplateSection, 
  notifTemplateSubmission 
} from './notifTemplateMessage';

export const notifMessage = {
  period: {
    page: notifPeriodPage,
    // option: notifPeriodOption,
    submission: notifPeriodSubmission,
    confirm: notifPeriodConfirm,
    section: notifPeriodSection,
    field: notifPeriodField,
    fieldFor: notifPeriodFieldHelperFor,
    message: notifPeriodMessage
  },
  setting: {
    page: notifSettingPage,
    // option: notifSettingOption,
    submission: notifSettingSubmission,
    confirm: notifSettingConfirm,
    section: notifSettingSection,
    field: notifSettingField,
    fieldFor: notifSettingFieldHelperFor,
    message: notifSettingMessage
  },
  template: {
    page: notifTemplatePage,
    // option: notifTemplateOption,
    submission: notifTemplateSubmission,
    confirm: notifTemplateConfirm,
    section: notifTemplateSection,
    field: notifTemplateField,
    fieldFor: notifTemplateFieldHelperFor,
    message: notifTemplateMessage
  },
};