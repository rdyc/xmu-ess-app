import {
  kpiEmployeeGetAllReducer,
  kpiEmployeeGetByIdReducer,
  kpiEmployeeGetItemListReducer,
  kpiEmployeePostBulkReducer,
  kpiEmployeePostReducer,
  kpiEmployeePutFinalReducer,
  kpiEmployeePutItemBulkReducer,
  kpiEmployeePutReducer,
} from '@kpi/store/reducers/employee';

const kpiEmployeeReducers = {
  kpiEmployeeGetAll: kpiEmployeeGetAllReducer,
  kpiEmployeeGetItemList: kpiEmployeeGetItemListReducer,
  kpiEmployeeGetById: kpiEmployeeGetByIdReducer,
  kpiEmployeePost: kpiEmployeePostReducer,
  kpiEmployeePostBulk: kpiEmployeePostBulkReducer,
  kpiEmployeePut: kpiEmployeePutReducer,
  kpiEmployeePutItemBulk: kpiEmployeePutItemBulkReducer,
  kpiEmployeePutFinal: kpiEmployeePutFinalReducer,
};

export default kpiEmployeeReducers;