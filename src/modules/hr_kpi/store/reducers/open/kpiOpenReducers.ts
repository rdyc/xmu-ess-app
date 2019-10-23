import {
  kpiOpenGetAllReducer,
  kpiOpenGetByIdReducer,
  kpiOpenPostReducer,
  kpiOpenPutReducer,
} from '@kpi/store/reducers/open';

const kpiOpenReducers = {
  kpiOpenGetAll: kpiOpenGetAllReducer,
  kpiOpenGetById: kpiOpenGetByIdReducer,
  kpiOpenPost: kpiOpenPostReducer,
  kpiOpenPut: kpiOpenPutReducer,
};

export default kpiOpenReducers;