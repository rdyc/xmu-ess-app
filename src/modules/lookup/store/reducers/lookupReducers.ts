import {
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
} from '@lookup/store/reducers';

import { lookupCompanyReducers } from './company';
import { lookupCustomerReducers } from './customer';
import { leaveReducers } from './leave';
import { mileageExceptionReducers } from './mileageException/mileageExceptionReducers';
import { lookupRoleReducers } from './role';
import { systemLimitReducers } from './systemLimit';

const lookupReducers = {
  ...lookupCustomerReducers,
  ...lookupCompanyReducers,
  ...lookupRoleReducers,
  ...leaveReducers,
  ...mileageExceptionReducers,
  ...systemLimitReducers,
  
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

  holidayGetAll: holidayGetAllReducer,
  holidayGetList: holidayGetListReducer,
  holidayGetById: holidayGetByIdReducer,

  leaveGetAll: leaveGetAllReducer,
  leaveGetList: leaveGetListReducer,
  leaveGetById: leaveGetByIdReducer,
  leavePut: leavePutReducer
};

export default lookupReducers;
