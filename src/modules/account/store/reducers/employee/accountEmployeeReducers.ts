import { accountEmployeeGetAllReducer } from './accountEmployeeGetAllReducer';
import { accountEmployeeGetByIdReducer } from './accountEmployeeGetByIdReducer';
import { accountEmployeeGetListReducer } from './accountEmployeeGetListReducer';
import { accountEmployeeLeaveGetByIdReducer } from './accountEmployeeLeaveGetByIdReducer';

const accountEmployeeReducers = {
  accountEmployeeGetAll: accountEmployeeGetAllReducer,
  accountEmployeeGetList: accountEmployeeGetListReducer,
  accountEmployeeGetById: accountEmployeeGetByIdReducer,
  accountEmployeeLeaveGetById: accountEmployeeLeaveGetByIdReducer,
};

export default accountEmployeeReducers;