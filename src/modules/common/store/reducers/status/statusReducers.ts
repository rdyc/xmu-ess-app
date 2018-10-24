import { statusGetAllReducer, statusGetByIdReducer, statusGetListReducer } from '@common/store/reducers/status';

const statusReducers = {
  commonStatusAll: statusGetAllReducer,
  commonStatusList: statusGetListReducer,
  commonStatusDetail: statusGetByIdReducer
};

export default statusReducers;