import {
  companyGetAllReducer,
  companyGetByIdReducer,
  companyGetListReducer,
  customerGetAllReducer,
  customerGetByIdReducer,
  customerGetListReducer,
  diemGetAllReducer, 
  diemGetByIdReducer, 
  diemGetListReducer,
  mileageExceptionGetAllReducer,
  mileageExceptionGetByIdReducer,
  mileageExceptionGetListReducer,
  roleGetAllReducer,
  roleGetByIdReducer,
  roleGetListReducer,
 
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
  
  diemGetAll: diemGetAllReducer,
  diemGetList: diemGetListReducer,
  diemGetById: diemGetByIdReducer,  
};

export default lookupReducers;
