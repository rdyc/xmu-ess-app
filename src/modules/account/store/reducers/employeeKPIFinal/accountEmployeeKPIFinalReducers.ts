import { 
  accountEmployeeGetAllKPIFinalReducer, 
  accountEmployeeKPIFinalGetAllReducer, 
  accountEmployeeKPIFinalGetByIdReducer 
} from '.';

const accountEmployeeKPIFinalReducers = {
  accountEmployeeGetAllKPIFinal: accountEmployeeGetAllKPIFinalReducer,
  accountEmployeeKPIFinalGetAll: accountEmployeeKPIFinalGetAllReducer,
  accountEmployeeKPIFinalGetById: accountEmployeeKPIFinalGetByIdReducer,
};

export default accountEmployeeKPIFinalReducers;