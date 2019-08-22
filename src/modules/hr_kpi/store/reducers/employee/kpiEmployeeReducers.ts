import {
  kpiEmployeeGetAllReducer,
  kpiEmployeeGetByIdReducer,
  kpiEmployeeGetItemListReducer,
  kpiEmployeePostBulkReducer,
  kpiEmployeePostReducer,
  kpiEmployeePutAchievedReducer,
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
  kpiEmployeePutAchieved: kpiEmployeePutAchievedReducer,
  kpiEmployeePutItemBulk: kpiEmployeePutItemBulkReducer,
  kpiEmployeePutFinal: kpiEmployeePutFinalReducer,
};

export default kpiEmployeeReducers;