import { 
  accountEmployeeGetAllKPIAssignReducer, 
  accountEmployeeGetAllKPIFinalReducer, 
  accountEmployeeKPIFinalGetAllReducer, 
  accountEmployeeKPIFinalGetByIdReducer 
} from '.';

const accountEmployeeKPIReducers = {
  accountEmployeeGetAllKPIAssign: accountEmployeeGetAllKPIAssignReducer,
  accountEmployeeGetAllKPIFinal: accountEmployeeGetAllKPIFinalReducer,
  accountEmployeeKPIFinalGetAll: accountEmployeeKPIFinalGetAllReducer,
  accountEmployeeKPIFinalGetById: accountEmployeeKPIFinalGetByIdReducer,
};

export default accountEmployeeKPIReducers;