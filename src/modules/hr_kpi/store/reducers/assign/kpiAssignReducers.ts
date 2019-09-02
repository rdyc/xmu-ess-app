import {
  kpiAssignGetAllReducer,
  kpiAssignGetByIdReducer,
  kpiAssignGetByYearReducer,
  kpiAssignPostBulkReducer,
  kpiAssignPutReducer,
} from '@kpi/store/reducers/assign';

const kpiAssignReducers = {
  kpiAssignGetAll: kpiAssignGetAllReducer,
  kpiAssignGetById: kpiAssignGetByIdReducer,
  kpiAssignGetByYear: kpiAssignGetByYearReducer,
  kpiAssignPostBulk: kpiAssignPostBulkReducer,
  kpiAssignPut: kpiAssignPutReducer,
};

export default kpiAssignReducers;