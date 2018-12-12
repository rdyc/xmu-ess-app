import { accountEmployeeAccessGetAllReducer } from './accountEmployeeAccessGetAllReducer';
import { accountEmployeeAccessGetByIdReducer } from './accountEmployeeAccessGetByIdReducer';
import { accountEmployeeAccessGetListReducer } from './accountEmployeeAccessGetListReducer';

const accountEmployeeAccessReducers = {
  accountEmployeeAccessGetAll: accountEmployeeAccessGetAllReducer,
  accountEmployeeAccessGetList: accountEmployeeAccessGetListReducer,
  accountEmployeeAccessGetById: accountEmployeeAccessGetByIdReducer,
};

export default accountEmployeeAccessReducers;