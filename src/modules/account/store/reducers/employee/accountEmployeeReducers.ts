import { accountEmployeeGetAllReducer } from './accountEmployeeGetAllReducer';
import { accountEmployeeGetByIdReducer } from './accountEmployeeGetByIdReducer';
import { accountEmployeeGetListReducer } from './accountEmployeeGetListReducer';

const accountEmployeeReducers = {
  accountEmployeeGetAll: accountEmployeeGetAllReducer,
  accountEmployeeGetList: accountEmployeeGetListReducer,
  accountEmployeeGetById: accountEmployeeGetByIdReducer,
};

export default accountEmployeeReducers;