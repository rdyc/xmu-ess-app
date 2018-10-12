import {
  companyGetAllReducer,
  companyGetByIdReducer,
  companyGetListReducer,
  customerGetAllReducer,
  customerGetByIdReducer,
  customerGetListReducer,
  mileageExceptionGetAllReducer,
  mileageExceptionGetByIdReducer,
  mileageExceptionGetListReducer,
  roleGetAllReducer,
  roleGetByIdReducer,
  roleGetListReducer
} from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,
  
  mileageExceptionGetAll: mileageExceptionGetAllReducer,
  mileageExceptionGetById: mileageExceptionGetByIdReducer,
  mileageExceptionGetList: mileageExceptionGetListReducer,

  roleGetAll: roleGetAllReducer,
  roleGetList: roleGetListReducer,
  roleGetById: roleGetByIdReducer,

  companyGetAll: companyGetAllReducer,
  companyGetList: companyGetListReducer,
  companyGetById: companyGetByIdReducer,
};

export default lookupReducers;
