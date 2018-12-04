import {
  lookupHolidayGetAllReducer,
  lookupHolidayGetByIdReducer,
  lookupHolidayGetListReducer,
  lookupLeaveDeleteReducer,
  lookupLeaveGetAllReducer,
  lookupLeaveGetByIdReducer,
  lookupLeaveGetListReducer,
  lookupLeavePostReducer,
  lookupLeavePutReducer,
  menuGetAllReducer,
  menuGetByIdReducer,
  menuGetListReducer,
  systemLimitGetAllReducer,
  systemLimitGetByIdReducer,
  systemLimitGetListReducer,
  menuGetAllReducer,
  menuGetByIdReducer,
  menuGetListReducer,
} from '@lookup/store/reducers';

import { lookupCompanyReducers } from './company';
import { lookupCurrencyReducers } from './currency';
import { lookupCustomerReducers } from './customer';
import { lookupDiemReducers } from './diem';
import { lookupHolidayReducers } from './holiday/lookupHolidayReducers';
import { lookupLeaveReducers } from './leave/lookupLeaveReducers';
import { mileageExceptionReducers } from './mileageException/mileageExceptionReducers';
import { lookupPositionReducers } from './position';
import { lookupRoleReducers } from './role';
import { systemLimitReducers } from './systemLimit';

const lookupReducers = {
  ...lookupCustomerReducers,
  ...lookupCompanyReducers,
  ...lookupRoleReducers,
  ...lookupPositionReducers,
  ...lookupLeaveReducers,
  ...lookupHolidayReducers,
  ...mileageExceptionReducers,
  ...systemLimitReducers,
  ...lookupDiemReducers,
  ...lookupCurrencyReducers,

  menuGetAll: menuGetAllReducer,
  menuGetById: menuGetByIdReducer,
  menuGetList: menuGetListReducer,
  
  systemLimitGetAll: systemLimitGetAllReducer,
  systemLimitGetList: systemLimitGetListReducer,
  systemLimitGetById: systemLimitGetByIdReducer,

  lookupHolidayGetAll: lookupHolidayGetAllReducer,
  lookupHolidayGetList: lookupHolidayGetListReducer,
  lookupHolidayGetById: lookupHolidayGetByIdReducer,
  lookupHolidayPost: lookupHolidayPostReducer,
  lookupHolidayPut: lookupHolidayPutReducer,
  lookupHolidayDelete: lookupHolidayDeleteReducer,

  lookupLeaveGetAll: lookupLeaveGetAllReducer,
  lookupLeaveGetList: lookupLeaveGetListReducer,
  lookupLeaveGetById: lookupLeaveGetByIdReducer,
  lookupLeavePost: lookupLeavePostReducer,
  lookupLeavePut: lookupLeavePutReducer,
  lookupLeaveDelete: lookupLeaveDeleteReducer,
};

export default lookupReducers;
