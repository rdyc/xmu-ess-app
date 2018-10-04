import { systemGetAllReducer, systemGetByIdReducer, systemGetListReducer } from '@common/store/reducers';

const commonReducers = {
  systemGetAll: systemGetAllReducer,
  systemGetList: systemGetListReducer,
  systemGetById: systemGetByIdReducer,
};

export default commonReducers;