import { lookupCustomerDeleteReducer } from './lookupCustomerDeleteReducer';
import { lookupCustomerGetAllReducer } from './lookupCustomerGetAllReducer';
import { lookupCustomerGetByIdReducer } from './lookupCustomerGetByIdReducer';
import { lookupCustomerGetListReducer } from './lookupCustomerGetListReducer';
import { lookupCustomerPostReducer } from './lookupCustomerPostReducer';
import { lookupCustomerPutReducer } from './lookupCustomerPutReducer';

export const lookupCustomerReducers = {
  lookupCustomerGetAll: lookupCustomerGetAllReducer,
  lookupCustomerGetList: lookupCustomerGetListReducer,
  lookupCustomerGetById: lookupCustomerGetByIdReducer,
  lookupCustomerPost: lookupCustomerPostReducer,
  lookupCustomerPut: lookupCustomerPutReducer,
  lookupCustomerDelete: lookupCustomerDeleteReducer,
};