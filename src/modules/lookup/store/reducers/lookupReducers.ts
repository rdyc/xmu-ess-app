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
  menuGetAllReducer,
  menuGetByIdReducer,
  menuGetListReducer,
  mileageExceptionGetAllReducer,
  mileageExceptionGetByIdReducer,
  mileageExceptionGetListReducer,
  positionGetAllReducer,
  positionGetByIdReducer,
  positionGetListReducer,
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

  menuGetAll: menuGetAllReducer,
  menuGetById: menuGetByIdReducer,
  menuGetList: menuGetListReducer,

  positionGetAll: positionGetAllReducer,
  positionGetById: positionGetByIdReducer,
  positionGetList: positionGetListReducer
};

export default lookupReducers;
