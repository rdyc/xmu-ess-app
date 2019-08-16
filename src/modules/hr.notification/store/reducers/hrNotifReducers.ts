import periodReducers from './period/periodReducers';
import settingReducers from './setting/settingReducers';
import templateReducers from './template/templateReducers';

export const hrNotificationReducers = {
  ...periodReducers,
  ...settingReducers,
  ...templateReducers
};