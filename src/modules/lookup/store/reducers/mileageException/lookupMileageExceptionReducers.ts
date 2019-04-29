import {
  lookupMileageExceptionGetAllReducer,
  lookupMileageExceptionGetByIdReducer,
  lookupMileageExceptionGetListReducer,
  lookupMileageExceptionPostReducer,
  lookupMileageExceptionPutReducer
} from '@lookup/store/reducers/mileageException';

export const lookupMileageExceptionReducers = {
  mileageExceptionGetAll: lookupMileageExceptionGetAllReducer,
  mileageExceptionGetList: lookupMileageExceptionGetListReducer,
  mileageExceptionGetById: lookupMileageExceptionGetByIdReducer,
  mileageExceptionPost: lookupMileageExceptionPostReducer,
  mileageExceptionPut: lookupMileageExceptionPutReducer
};