import {
  kpiEmployeeGetAllReducer,
  kpiEmployeeGetByIdReducer,
  kpiEmployeePostBulkReducer,
  kpiEmployeePutAchievedReducer,
  kpiEmployeePutReducer,
} from '@kpi/store/reducers/employee';

const kpiEmployeeReducers = {
  kpiEmployeeGetAll: kpiEmployeeGetAllReducer,
  kpiEmployeeGetById: kpiEmployeeGetByIdReducer,
  kpiEmployeePostBulk: kpiEmployeePostBulkReducer,
  kpiEmployeePut: kpiEmployeePutReducer,
  kpiEmployeePutAchieved: kpiEmployeePutAchievedReducer,
};

export default kpiEmployeeReducers;