import { lookupLeaveCalculationGetAllReducer } from './lookupLeaveCalculationGetAllReducer';
import { lookupLeaveDeleteReducer } from './lookupLeaveDeleteReducer';
import { lookupLeaveGetAllReducer } from './lookupLeaveGetAllReducer';
import { lookupLeaveGetByIdReducer } from './lookupLeaveGetByIdReducer';
import { lookupLeaveGetListReducer } from './lookupLeaveGetListReducer';
import { lookupLeavePostReducer } from './lookupLeavePostReducer';
import { lookupLeavePutReducer } from './lookupLeavePutReducer';

export const lookupLeaveReducers = {
  lookupLeaveCalculationGetAll: lookupLeaveCalculationGetAllReducer,
  lookupLeaveGetAll: lookupLeaveGetAllReducer,
  lookupLeaveGetList: lookupLeaveGetListReducer,
  lookupLeaveGetById: lookupLeaveGetByIdReducer,
  lookupLeavePost: lookupLeavePostReducer,
  lookupLeavePut: lookupLeavePutReducer,
  lookupLeaveDelete: lookupLeaveDeleteReducer
};