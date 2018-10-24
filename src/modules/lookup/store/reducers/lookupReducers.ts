import {
  companyGetAllReducer,
  companyGetByIdReducer,
  companyGetListReducer,
  currencyGetAllReducer,
  currencyGetByIdReducer,
  currencyGetListReducer,
  diemGetAllReducer,
  diemGetByIdReducer,
  diemGetListReducer,
  holidayGetAllReducer,
  holidayGetByIdReducer,
  holidayGetListReducer,
  leaveGetAllReducer,
  leaveGetByIdReducer,
  leaveGetListReducer,
  leavePutReducer,
  menuGetAllReducer,
  menuGetByIdReducer,
  menuGetListReducer,
  positionGetAllReducer,
  positionGetByIdReducer,
  positionGetListReducer,
  roleGetAllReducer,
  roleGetByIdReducer,
  roleGetListReducer,
  systemLimitGetAllReducer,
  systemLimitGetByIdReducer,
  systemLimitGetListReducer
} from '@lookup/store/reducers';

import { lookupCustomerReducers } from './customer';
import { lookupMileageExceptionReducers } from './mileageException';

const lookupReducers = {
  ...lookupCustomerReducers,
  ...lookupMileageExceptionReducers,

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
  positionGetList: positionGetListReducer,

  currencyGetAll: currencyGetAllReducer,
  currencyGetList: currencyGetListReducer,
  currencyGetById: currencyGetByIdReducer,

  systemLimitGetAll: systemLimitGetAllReducer,
  systemLimitGetList: systemLimitGetListReducer,
  systemLimitGetById: systemLimitGetByIdReducer,

  holidayGetAll: holidayGetAllReducer,
  holidayGetList: holidayGetListReducer,
  holidayGetById: holidayGetByIdReducer,

  leaveGetAll: leaveGetAllReducer,
  leaveGetList: leaveGetListReducer,
  leaveGetById: leaveGetByIdReducer,
  leavePut: leavePutReducer
};

export default lookupReducers;
