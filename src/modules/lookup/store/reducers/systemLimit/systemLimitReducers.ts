import {
  systemLimitDeleteReducer,
  systemLimitGetAllReducer,
  systemLimitGetAmountReducer,
  systemLimitGetByIdReducer,
  systemLimitGetListReducer,
  systemLimitPostReducer,
  systemLimitPutReducer
} from '@lookup/store/reducers/systemLimit';

export const systemLimitReducers = {
  systemLimitGetAll: systemLimitGetAllReducer,
  systemLimitGetAmount: systemLimitGetAmountReducer,
  systemLimitGetList: systemLimitGetListReducer,
  systemLimitGetById: systemLimitGetByIdReducer,
  systemLimitPost: systemLimitPostReducer,
  systemLimitPut: systemLimitPutReducer,
  systemLimitDelete: systemLimitDeleteReducer,
};