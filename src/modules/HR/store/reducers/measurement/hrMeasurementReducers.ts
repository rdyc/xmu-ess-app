import {
  hrMeasurementGetAllReducer,
  hrMeasurementGetByIdReducer,
  hrMeasurementGetListReducer,
  hrMeasurementPostReducer,
  hrMeasurementPutReducer
} from '@hr/store/reducers/measurement';

const hrMeasurementReducers = {
  hrMeasurementGetAll: hrMeasurementGetAllReducer,
  hrMeasurementGetList: hrMeasurementGetListReducer,
  hrMeasurementGetById: hrMeasurementGetByIdReducer,
  hrMeasurementPost: hrMeasurementPostReducer,
  hrMeasurementPut: hrMeasurementPutReducer
};

export default hrMeasurementReducers;