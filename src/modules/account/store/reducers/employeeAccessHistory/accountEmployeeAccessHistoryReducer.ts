import { accountEmployeeAccessHistoryGetAllReducer } from './accountEmployeeAccessHistoryGetAllReducer';
import { accountEmployeeAccessHistoryGetByIdReducer } from './accountEmployeeAccessHistoryGetByIdReducer';
import { accountEmployeeAccessHistoryGetListReducer } from './accountEmployeeAccessHistoryGetListReducer';

const accountEmployeeAccessHistoryReducers = {
  accountEmployeeAccessHistoryGetAll: accountEmployeeAccessHistoryGetAllReducer,
  accountEmployeeAccessHistoryGetList: accountEmployeeAccessHistoryGetListReducer,
  accountEmployeeAccessHistoryGetById: accountEmployeeAccessHistoryGetByIdReducer
};

export default accountEmployeeAccessHistoryReducers;