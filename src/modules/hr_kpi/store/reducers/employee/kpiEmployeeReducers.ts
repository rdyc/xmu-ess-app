import {
  kpiEmployeeGetAllReducer,
  kpiEmployeeGetByIdReducer,
  kpiEmployeeGetByYearReducer,
  kpiEmployeePostReducer,
  kpiEmployeePutReducer,
} from '@kpi/store/reducers/employee';

const kpiEmployeeReducers = {
  kpiEmployeeGetAll: kpiEmployeeGetAllReducer,
  kpiEmployeeGetById: kpiEmployeeGetByIdReducer,
  kpiEmployeeGetByYear: kpiEmployeeGetByYearReducer,
  kpiEmployeePost: kpiEmployeePostReducer,
  kpiEmployeePut: kpiEmployeePutReducer,
};

export default kpiEmployeeReducers;