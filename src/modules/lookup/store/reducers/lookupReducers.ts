import {
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
};

export default lookupReducers;
