import {
  kpiAssignGetAllReducer,
  kpiAssignGetByIdReducer,
  kpiAssignPostBulkReducer,
  kpiAssignPutReducer,
} from '@kpi/store/reducers/assign';

const kpiAssignReducers = {
  kpiAssignGetAll: kpiAssignGetAllReducer,
  kpiAssignGetById: kpiAssignGetByIdReducer,
  kpiAssignPostBulk: kpiAssignPostBulkReducer,
  kpiAssignPut: kpiAssignPutReducer,
};

export default kpiAssignReducers;