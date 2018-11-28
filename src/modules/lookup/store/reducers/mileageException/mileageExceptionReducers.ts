import {
  mileageExceptionGetAllReducer,
  mileageExceptionGetByIdReducer,
  mileageExceptionGetListReducer,
  mileageExceptionPostReducer,
  mileageExceptionPutReducer
} from '@lookup/store/reducers/mileageException';

export const mileageExceptionReducers = {
  mileageExceptionGetAll: mileageExceptionGetAllReducer,
  mileageExceptionGetList: mileageExceptionGetListReducer,
  mileageExceptionGetById: mileageExceptionGetByIdReducer,
  mileageExceptionPost: mileageExceptionPostReducer,
  mileageExceptionPut: mileageExceptionPutReducer
};