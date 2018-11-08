import { transportationGetAllReducer, transportationGetByIdReducer, transportationGetListReducer } from '@common/store/reducers/transportation';

const transportationReducers = {
  commonTransportationAll: transportationGetAllReducer,
  commonTransportationList: transportationGetListReducer,
  commonTransportationDetail: transportationGetByIdReducer
};

export default transportationReducers;