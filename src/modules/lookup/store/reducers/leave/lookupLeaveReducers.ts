import { lookupLeaveDeleteReducer } from './lookupLeaveDeleteReducer';
import { lookupLeaveGetAllReducer } from './lookupLeaveGetAllReducer';
import { lookupLeaveGetByIdReducer } from './lookupLeaveGetByIdReducer';
import { lookupLeaveGetListReducer } from './lookupLeaveGetListReducer';
import { lookupLeavePostReducer } from './lookupLeavePostReducer';
import { lookupLeavePutReducer } from './lookupLeavePutReducer';

export const lookupLeaveReducers = {
  leaveGetAll: lookupLeaveGetAllReducer,
  leaveGetList: lookupLeaveGetListReducer,
  leaveGetById: lookupLeaveGetByIdReducer,
  leavePost: lookupLeavePostReducer,
  leavePut: lookupLeavePutReducer,
  leaveDelete: lookupLeaveDeleteReducer
};