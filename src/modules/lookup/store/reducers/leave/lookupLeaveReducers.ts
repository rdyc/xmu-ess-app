import { lookupLeaveCalculationGetAllReducer } from './lookupLeaveCalculationGetAllReducer';
import { lookupLeaveCalculationPostReducer } from './lookupLeaveCalculationPostReducer';
import { lookupLeaveChangePageReducer } from './lookupLeaveChangePageReducer';
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
  lookupLeaveDelete: lookupLeaveDeleteReducer,
  lookupLeaveCalculate: lookupLeaveCalculationPostReducer,
  lookupLeavePage: lookupLeaveChangePageReducer
};