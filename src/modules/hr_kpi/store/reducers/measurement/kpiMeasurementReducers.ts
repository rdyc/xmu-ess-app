import {
  kpiMeasurementDeleteReducer,
  kpiMeasurementGetAllReducer,
  kpiMeasurementGetByCategoryReducer,
  kpiMeasurementGetByIdReducer,
  kpiMeasurementGetListReducer,
  kpiMeasurementPostReducer,
  kpiMeasurementPutReducer
} from '@kpi/store/reducers/measurement';

const kpiMeasurementReducers = {
  kpiMeasurementGetAll: kpiMeasurementGetAllReducer,
  kpiMeasurementGetByCategory: kpiMeasurementGetByCategoryReducer,
  kpiMeasurementGetList: kpiMeasurementGetListReducer,
  kpiMeasurementGetById: kpiMeasurementGetByIdReducer,
  kpiMeasurementPost: kpiMeasurementPostReducer,
  kpiMeasurementPut: kpiMeasurementPutReducer,
  kpiMeasurementDelete: kpiMeasurementDeleteReducer,
};

export default kpiMeasurementReducers;