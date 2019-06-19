import {
  hrMeasurementGetAllReducer,
  hrMeasurementGetByIdReducer,
  hrMeasurementPostReducer,
  hrMeasurementPutReducer
} from '@hr/store/reducers/measurement';

const hrMeasurementReducers = {
  hrMeasurementGetAll: hrMeasurementGetAllReducer,
  hrMeasurementGetById: hrMeasurementGetByIdReducer,
  hrMeasurementPost: hrMeasurementPostReducer,
  hrMeasurementPut: hrMeasurementPutReducer
};

export default hrMeasurementReducers;