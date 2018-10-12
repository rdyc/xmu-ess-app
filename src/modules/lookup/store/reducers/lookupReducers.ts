import {
  customerGetAllReducer,
  customerGetByIdReducer,
  customerGetListReducer,
  mileageExceptionGetAllReducer,
  mileageExceptionGetByIdReducer,
  mileageExceptionGetListReducer,
} from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,
  mileageExceptionGetAll: mileageExceptionGetAllReducer,
  mileageExceptionGetById: mileageExceptionGetByIdReducer,
  mileageExceptionGetList: mileageExceptionGetListReducer,
};

export default lookupReducers;
