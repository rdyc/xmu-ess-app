import { 
  accountEmployeeGetAllKPIAssignReducer, 
  accountEmployeeKPIAssignGetAllReducer, 
  accountEmployeeKPIAssignGetByIdReducer 
} from '.';

const accountEmployeeKPIAssignReducers = {
  accountEmployeeGetAllKPIAssign: accountEmployeeGetAllKPIAssignReducer,
  accountEmployeeKPIAssignGetAll: accountEmployeeKPIAssignGetAllReducer,
  accountEmployeeKPIAssignGetById: accountEmployeeKPIAssignGetByIdReducer,
};

export default accountEmployeeKPIAssignReducers;