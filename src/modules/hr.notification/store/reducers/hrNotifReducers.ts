import notifPeriodReducers from './period/notifPeriodReducers';
import notifSettingReducers from './setting/notifSettingReducers';
import notifTemplateReducers from './template/notifTemplateReducers';

export const hrNotificationReducers = {
  ...notifPeriodReducers,
  ...notifSettingReducers,
  ...notifTemplateReducers
};