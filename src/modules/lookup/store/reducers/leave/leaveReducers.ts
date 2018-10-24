// import { lookupCustomerDeleteReducer } from './lookupCustomerDeleteReducer';
import { leaveGetAllReducer } from './leaveGetAllReducer';
import { leaveGetByIdReducer } from './leaveGetByIdReducer';
import { leaveGetListReducer } from './leaveGetListReducer';
// import { lookupCustomerPostReducer } from './lookupCustomerPostReducer';
// import { lookupCustomerPutReducer } from './lookupCustomerPutReducer';

export const leaveReducers = {
  leaveGetAll: leaveGetAllReducer,
  leaveGetList: leaveGetListReducer,
  leaveGetById: leaveGetByIdReducer,
  // lookupCustomerPost: lookupCustomerPostReducer,
  // lookupCustomerPut: lookupCustomerPutReducer,
  // lookupCustomerDelete: lookupCustomerDeleteReducer,
};