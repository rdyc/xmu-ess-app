import { accountEmployeeDeleteReducer } from './accountEmployeeDeleteReducer';
import { accountEmployeeGetAllReducer } from './accountEmployeeGetAllReducer';
import { accountEmployeeGetByIdReducer } from './accountEmployeeGetByIdReducer';
import { accountEmployeeGetListReducer } from './accountEmployeeGetListReducer';
import { accountEmployeePostReducer } from './accountEmployeePostReducer';
import { accountEmployeePutReducer } from './accountEmployeePutReducer';

const accountEmployeeReducers = {
  accountEmployeeGetAll: accountEmployeeGetAllReducer,
  accountEmployeeGetList: accountEmployeeGetListReducer,
  accountEmployeeGetById: accountEmployeeGetByIdReducer,
  accountEmployeePost: accountEmployeePostReducer,
  accountEmployeePut: accountEmployeePutReducer,
  accountEmployeeDelete: accountEmployeeDeleteReducer
};

export default accountEmployeeReducers;