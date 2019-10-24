import {
  kpiEmployeeGetAllReducer,
  kpiEmployeeGetByIdReducer,
  kpiEmployeeGetLatestReducer,
  kpiEmployeePostReducer,
  kpiEmployeePutReducer,
} from '@kpi/store/reducers/employee';

const kpiEmployeeReducers = {
  kpiEmployeeGetAll: kpiEmployeeGetAllReducer,
  kpiEmployeeGetById: kpiEmployeeGetByIdReducer,
  kpiEmployeeGetLatest: kpiEmployeeGetLatestReducer,
  kpiEmployeePost: kpiEmployeePostReducer,
  kpiEmployeePut: kpiEmployeePutReducer,
};

export default kpiEmployeeReducers;