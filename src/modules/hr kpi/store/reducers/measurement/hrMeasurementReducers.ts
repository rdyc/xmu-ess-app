import {
  KPIMeasurementGetAllReducer,
  KPIMeasurementGetByIdReducer,
  KPIMeasurementGetListReducer,
  KPIMeasurementPostReducer,
  KPIMeasurementPutReducer
} from '@KPI/store/reducers/measurement';
import { KPIMeasurementDeleteReducer } from './KPIMeasurementDeleteReducer';

const KPIMeasurementReducers = {
  KPIMeasurementGetAll: KPIMeasurementGetAllReducer,
  KPIMeasurementGetList: KPIMeasurementGetListReducer,
  KPIMeasurementGetById: KPIMeasurementGetByIdReducer,
  KPIMeasurementPost: KPIMeasurementPostReducer,
  KPIMeasurementPut: KPIMeasurementPutReducer,
  KPIMeasurementDelete: KPIMeasurementDeleteReducer
};

export default KPIMeasurementReducers;