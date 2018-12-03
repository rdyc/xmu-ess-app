import {
  systemLimitDeleteReducer,
  systemLimitGetAllReducer,
  systemLimitGetByIdReducer,
  systemLimitGetListReducer,
  systemLimitPostReducer,
  systemLimitPutReducer
} from '@lookup/store/reducers/systemLimit';

export const systemLimitReducers = {
  systemLimitGetAll: systemLimitGetAllReducer,
  systemLimitGetList: systemLimitGetListReducer,
  systemLimitGetById: systemLimitGetByIdReducer,
  systemLimitPost: systemLimitPostReducer,
  systemLimitPut: systemLimitPutReducer,
  systemLimitDelete: systemLimitDeleteReducer
};