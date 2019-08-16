import { 
  settingDeleteReducer, 
  settingGetAllReducer, 
  settingGetByIdReducer, 
  settingPostReducer, 
  settingPutReducer 
} from '@hr.notification/store/reducers/setting';

const settingReducers = {
  settingGetAll: settingGetAllReducer,
  settingGetById: settingGetByIdReducer,
  settingPost: settingPostReducer,
  settingPut: settingPutReducer,
  settingDelete: settingDeleteReducer,
};

export default settingReducers;