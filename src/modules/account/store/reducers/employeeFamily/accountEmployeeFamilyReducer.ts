import { accountEmployeeFamilyDeleteReducer } from './accountEmployeeFamilyDeleteReducer';
import { accountEmployeeFamilyGetAllReducer } from './accountEmployeeFamilyGetAllReducer';
import { accountEmployeeFamilyGetByIdReducer } from './accountEmployeeFamilyGetByIdReducer';
import { accountEmployeeFamilyGetListReducer } from './accountEmployeeFamilyGetListReducer';
import { accountEmployeeFamilyPostReducer } from './accountEmployeeFamilyPostReducer';
import { accountEmployeeFamilyPutReducer } from './accountEmployeeFamilyPutReducer';

const accountEmployeeFamilyReducers = {
  accountEmployeeFamilyGetAll: accountEmployeeFamilyGetAllReducer,
  accountEmployeeFamilyGetList: accountEmployeeFamilyGetListReducer,
  accountEmployeeFamilyGetById: accountEmployeeFamilyGetByIdReducer,
  accountEmployeeFamilyPost: accountEmployeeFamilyPostReducer,
  accountEmployeeFamilyPut: accountEmployeeFamilyPutReducer,
  accountEmployeeFamilyDelete: accountEmployeeFamilyDeleteReducer
};

export default accountEmployeeFamilyReducers;