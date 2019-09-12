import {
  kpiEmployeeGetAllReducer,
  kpiEmployeeGetByIdReducer,
  kpiEmployeePostReducer,
  kpiEmployeePutReducer,
} from '@kpi/store/reducers/employee';

const kpiEmployeeReducers = {
  kpiEmployeeGetAll: kpiEmployeeGetAllReducer,
  kpiEmployeeGetById: kpiEmployeeGetByIdReducer,
  kpiEmployeePost: kpiEmployeePostReducer,
  kpiEmployeePut: kpiEmployeePutReducer,
};

export default kpiEmployeeReducers;