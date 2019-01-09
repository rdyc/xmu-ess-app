import { accountEmployeeAccessDeleteReducer } from './accountEmployeeAccessDeleteReducer';
import { accountEmployeeAccessGetAllReducer } from './accountEmployeeAccessGetAllReducer';
import { accountEmployeeAccessGetByIdReducer } from './accountEmployeeAccessGetByIdReducer';
import { accountEmployeeAccessGetListReducer } from './accountEmployeeAccessGetListReducer';
import { accountEmployeeAccessPostReducer } from './accountEmployeeAccessPostReducer';
import { accountEmployeeAccessPutReducer } from './accountEmployeeAccessPutReducer';

const accountEmployeeAccessReducers = {
  accountEmployeeAccessGetAll: accountEmployeeAccessGetAllReducer,
  accountEmployeeAccessGetList: accountEmployeeAccessGetListReducer,
  accountEmployeeAccessGetById: accountEmployeeAccessGetByIdReducer,
  accountEmployeeAccessPost: accountEmployeeAccessPostReducer,
  accountEmployeeAccessPut: accountEmployeeAccessPutReducer,
  accountEmployeeAccessDelete: accountEmployeeAccessDeleteReducer
};

export default accountEmployeeAccessReducers;