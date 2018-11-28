import { lookupLeaveGetAllReducer } from './lookupLeaveGetAllReducer';
import { lookupLeaveGetByIdReducer } from './lookupLeaveGetByIdReducer';
import { lookupLeaveGetListReducer } from './lookupLeaveGetListReducer';

export const lookupLeaveReducers = {
  leaveGetAll: lookupLeaveGetAllReducer,
  leaveGetList: lookupLeaveGetListReducer,
  leaveGetById: lookupLeaveGetByIdReducer,
};