import { lookupAchievementReducer } from './achievement';
import { lookupCompanyReducers } from './company';
import { lookupCurrencyReducers } from './currency';
import { lookupCustomerReducers } from './customer';
import { lookupDiemReducers } from './diem';
import { lookupEmployeeLevelReducers } from './employeeLevel';
import lookupImageGalleryReducers from './gallery/lookupImageGalleryReducers';
import { lookupHolidayReducers } from './holiday/lookupHolidayReducers';
import { lookupLeaveReducers } from './leave/lookupLeaveReducers';
import { lookupMenuReducers } from './menu';
import { lookupMileageExceptionReducers } from './mileageException/lookupMileageExceptionReducers';
import { lookupPositionReducers } from './position';
import { lookupRoleReducers } from './role';
import { lookupSystemLimitReducers } from './systemLimit';
import { lookupVersionReducers } from './version';

const lookupReducers = {
  ...lookupCustomerReducers,
  ...lookupCompanyReducers,
  ...lookupRoleReducers,
  ...lookupPositionReducers,
  ...lookupLeaveReducers,
  ...lookupHolidayReducers,
  ...lookupMileageExceptionReducers,
  ...lookupSystemLimitReducers,
  ...lookupDiemReducers,
  ...lookupCurrencyReducers,
  ...lookupMenuReducers,
  ...lookupAchievementReducer,
  ...lookupVersionReducers,
  ...lookupImageGalleryReducers,
  ...lookupEmployeeLevelReducers
};

export default lookupReducers;
