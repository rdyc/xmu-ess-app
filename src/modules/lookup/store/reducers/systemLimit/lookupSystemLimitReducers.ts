import {
  lookupSystemLimitDeleteReducer,
  lookupSystemLimitGetAllReducer,
  lookupSystemLimitGetAmountReducer,
  lookupSystemLimitGetByIdReducer,
  lookupSystemLimitGetListReducer,
  lookupSystemLimitPostReducer,
  lookupSystemLimitPutReducer
} from '@lookup/store/reducers/systemLimit';

export const lookupSystemLimitReducers = {
  systemLimitGetAll: lookupSystemLimitGetAllReducer,
  systemLimitGetAmount: lookupSystemLimitGetAmountReducer,
  systemLimitGetList: lookupSystemLimitGetListReducer,
  systemLimitGetById: lookupSystemLimitGetByIdReducer,
  systemLimitPost: lookupSystemLimitPostReducer,
  systemLimitPut: lookupSystemLimitPutReducer,
  systemLimitDelete: lookupSystemLimitDeleteReducer,
};