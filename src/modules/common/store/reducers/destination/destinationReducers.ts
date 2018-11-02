import { destinationGetAllReducer, destinationGetByIdReducer, destinationGetListReducer } from '@common/store/reducers/destination';

const destinationReducers = {
  commonDestinationAll: destinationGetAllReducer,
  commonDestinationList: destinationGetListReducer,
  commonDestinationDetail: destinationGetByIdReducer
};

export default destinationReducers;