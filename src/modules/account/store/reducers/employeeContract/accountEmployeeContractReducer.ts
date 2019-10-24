import { accountEmployeeContractDeleteReducer } from './accountEmployeeContractDeleteReducer';
import { accountEmployeeContractGetAllReducer } from './accountEmployeeContractGetAllReducer';
import { accountEmployeeContractGetByIdReducer } from './accountEmployeeContractGetByIdReducer';
import { accountEmployeeContractGetListReducer } from './accountEmployeeContractGetListReducer';
import { accountEmployeeContractPostReducer } from './accountEmployeeContractPostReducer';
import { accountEmployeeContractPutReducer } from './accountEmployeeContractPutReducer';

const accountEmployeeContractReducers = {
  accountEmployeeContractGetAll: accountEmployeeContractGetAllReducer,
  accountEmployeeContractGetList: accountEmployeeContractGetListReducer,
  accountEmployeeContractGetById: accountEmployeeContractGetByIdReducer,
  accountEmployeeContractPost: accountEmployeeContractPostReducer,
  accountEmployeeContractPut: accountEmployeeContractPutReducer,
  accountEmployeeContractDelete: accountEmployeeContractDeleteReducer
};

export default accountEmployeeContractReducers;