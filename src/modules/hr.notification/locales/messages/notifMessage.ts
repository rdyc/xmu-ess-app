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
  }
};