import { 
  notifSettingDeleteReducer, 
  notifSettingGetAllReducer, 
  notifSettingGetByIdReducer, 
  notifSettingPostReducer, 
  notifSettingPutReducer 
} from '@hr.notification/store/reducers/setting';

const notifSettingReducers = {
  settingGetAll: notifSettingGetAllReducer,
  settingGetById: notifSettingGetByIdReducer,
  settingPost: notifSettingPostReducer,
  settingPut: notifSettingPutReducer,
  settingDelete: notifSettingDeleteReducer,
};

export default notifSettingReducers;