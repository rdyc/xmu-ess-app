import {
  // currencyGetAllReducer,
  // currencyGetByIdReducer,
  // currencyGetListReducer,
  diemGetAllReducer,
  diemGetByIdReducer,
  diemGetListReducer,
  lookupHolidayGetAllReducer,
  lookupHolidayGetByIdReducer,
  lookupHolidayGetListReducer,
  lookupLeaveGetAllReducer,
  lookupLeaveGetByIdReducer,
  lookupLeaveGetListReducer,
  lookupLeavePutReducer,
  menuGetAllReducer,
  menuGetByIdReducer,
  menuGetListReducer,
  positionGetAllReducer,
  positionGetByIdReducer,
  positionGetListReducer,
  systemLimitGetAllReducer,
  systemLimitGetByIdReducer,
  systemLimitGetListReducer,
  lookupLeavePostReducer,
} from '@lookup/store/reducers';

import { lookupCompanyReducers } from './company';
import { lookupCurrencyReducers } from './currency';
import { lookupCustomerReducers } from './customer';
import { lookupHolidayPostReducer } from './holiday/lookupHolidayPostReducer';
import { lookupHolidayPutReducer } from './holiday/lookupHolidayPutReducer';
import { lookupHolidayReducers } from './holiday/lookupHolidayReducers';
import { lookupLeaveReducers } from './leave/lookupLeaveReducers';
import { mileageExceptionReducers } from './mileageException/mileageExceptionReducers';
import { lookupRoleReducers } from './role';
import { systemLimitReducers } from './systemLimit';

const lookupReducers = {
  ...lookupCustomerReducers,
  ...lookupCompanyReducers,
  ...lookupRoleReducers,
  ...lookupLeaveReducers,
  ...lookupHolidayReducers,
  ...mileageExceptionReducers,
  ...systemLimitReducers,
  ...lookupCurrencyReducers,

  diemGetAll: diemGetAllReducer,
  diemGetList: diemGetListReducer,
  diemGetById: diemGetByIdReducer,

  menuGetAll: menuGetAllReducer,
  menuGetById: menuGetByIdReducer,
  menuGetList: menuGetListReducer,

  positionGetAll: positionGetAllReducer,
  positionGetById: positionGetByIdReducer,
  positionGetList: positionGetListReducer,

  // currencyGetAll: currencyGetAllReducer,
  // currencyGetList: currencyGetListReducer,
  // currencyGetById: currencyGetByIdReducer,

  systemLimitGetAll: systemLimitGetAllReducer,
  systemLimitGetList: systemLimitGetListReducer,
  systemLimitGetById: systemLimitGetByIdReducer,

  lookupHolidayGetAll: lookupHolidayGetAllReducer,
  lookupHolidayGetList: lookupHolidayGetListReducer,
  lookupHolidayGetById: lookupHolidayGetByIdReducer,
  lookupHolidayPost: lookupHolidayPostReducer,
  lookupHolidayPut: lookupHolidayPutReducer,

  lookupLeaveGetAll: lookupLeaveGetAllReducer,
  lookupLeaveGetList: lookupLeaveGetListReducer,
  lookupLeaveGetById: lookupLeaveGetByIdReducer,
  lookupLeavePost: lookupLeavePostReducer,
  lookupLeavePut: lookupLeavePutReducer
};

export default lookupReducers;
