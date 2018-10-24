import { lookupMileageExceptionGetAllReducer } from './lookupMileageExceptionGetAllReducer';
import { lookupMileageExceptionGetByIdReducer } from './lookupMileageExceptionGetByIdReducer';
import { lookupMileageExceptionGetListReducer } from './lookupMileageExceptionGetListReducer';

export const lookupMileageExceptionReducers = {
  lookupMileageExceptionGetAll: lookupMileageExceptionGetAllReducer,
  lookupMileageExceptionGetById: lookupMileageExceptionGetByIdReducer,
  lookupMileageExceptionGetList: lookupMileageExceptionGetListReducer
};
