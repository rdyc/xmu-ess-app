import {
  mileageapprovalGetAllReducer,
  mileageapprovalGetByIdReducer,
  mileageapprovalPostReducer,
  mileagerequestGetAllReducer,
  mileagerequestGetByIdReducer,
  mileagerequestPostReducer
} from '@mileage/store/reducers';

const mileageReducers = {
  mileageapprovalGetAll: mileageapprovalGetAllReducer,
  mileageapprovalGetById: mileageapprovalGetByIdReducer,
  mileageapprovalPost: mileageapprovalPostReducer,

  mileagerequestGetAll: mileagerequestGetAllReducer,
  mileagerequestGetById: mileagerequestGetByIdReducer,
  mileagerequestPost: mileagerequestPostReducer,
};

export default mileageReducers;
