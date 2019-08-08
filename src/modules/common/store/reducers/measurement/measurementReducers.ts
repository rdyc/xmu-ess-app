import {
  measurementGetAllReducer,
  measurementGetByIdReducer,
  measurementGetListReducer
} from '@common/store/reducers/measurement';

const measurementReducers = {
  commonMeasurementAll: measurementGetAllReducer,
  commonMeasurementList: measurementGetListReducer,
  commonMeasurementDetail: measurementGetByIdReducer
};

export default measurementReducers;
