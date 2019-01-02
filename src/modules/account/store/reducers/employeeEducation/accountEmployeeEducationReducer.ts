import { accountEmployeeEducationDeleteReducer } from './accountEmployeeEducationDeleteReducer';
import { accountEmployeeEducationGetAllReducer } from './accountEmployeeEducationGetAllReducer';
import { accountEmployeeEducationGetByIdReducer } from './accountEmployeeEducationGetByIdReducer';
import { accountEmployeeEducationGetListReducer } from './accountEmployeeEducationGetListReducer';
import { accountEmployeeEducationPostReducer } from './accountEmployeeEducationPostReducer';
import { accountEmployeeEducationPutReducer } from './accountEmployeeEducationPutReducer';

const accountEmployeeEducationReducers = {
  accountEmployeeEducationGetAll: accountEmployeeEducationGetAllReducer,
  accountEmployeeEducationGetList: accountEmployeeEducationGetListReducer,
  accountEmployeeEducationGetById: accountEmployeeEducationGetByIdReducer,
  accountEmployeeEducationPost: accountEmployeeEducationPostReducer,
  accountEmployeeEducationPut: accountEmployeeEducationPutReducer,
  accountEmployeeEducationDelete: accountEmployeeEducationDeleteReducer
};

export default accountEmployeeEducationReducers;