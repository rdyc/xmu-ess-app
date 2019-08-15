import {
  employeeKPIGetAllReducer,
  employeeKPIGetByIdReducer,
  employeeKPIGetItemListReducer,
  employeeKPIPostBulkReducer,
  employeeKPIPostReducer,
  employeeKPIPutFinalReducer,
  employeeKPIPutItemBulkReducer,
  employeeKPIPutReducer,
} from '@kpi/store/reducers/employee';

const employeeKPIReducers = {
  employeeKPIGetAll: employeeKPIGetAllReducer,
  employeeKPIGetItemList: employeeKPIGetItemListReducer,
  employeeKPIGetById: employeeKPIGetByIdReducer,
  employeeKPIPost: employeeKPIPostReducer,
  employeeKPIPostBulk: employeeKPIPostBulkReducer,
  employeeKPIPut: employeeKPIPutReducer,
  employeeKPIPutItemBulk: employeeKPIPutItemBulkReducer,
  employeeKPIPutFinal: employeeKPIPutFinalReducer,
};

export default employeeKPIReducers;