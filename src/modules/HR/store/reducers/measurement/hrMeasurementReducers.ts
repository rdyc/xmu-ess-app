import {
  hrMeasurementGetAllReducer,
  hrMeasurementGetByIdReducer,
  hrMeasurementGetListReducer,
  hrMeasurementPostReducer,
  hrMeasurementPutReducer
} from '@hr/store/reducers/measurement';
import { hrMeasurementDeleteReducer } from './hrMeasurementDeleteReducer';

const hrMeasurementReducers = {
  hrMeasurementGetAll: hrMeasurementGetAllReducer,
  hrMeasurementGetList: hrMeasurementGetListReducer,
  hrMeasurementGetById: hrMeasurementGetByIdReducer,
  hrMeasurementPost: hrMeasurementPostReducer,
  hrMeasurementPut: hrMeasurementPutReducer,
  hrMeasurementDelete: hrMeasurementDeleteReducer
};

export default hrMeasurementReducers;