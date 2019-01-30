import { lookupCompanyReducers } from './company';
import { lookupCurrencyReducers } from './currency';
import { lookupCustomerReducers } from './customer';
import { lookupDiemReducers } from './diem';
import imageGalleryReducers from './gallery/imageGalleryReducers';
import { lookupHolidayReducers } from './holiday/lookupHolidayReducers';
import { lookupLeaveReducers } from './leave/lookupLeaveReducers';
import { lookupMenuReducers } from './menu';
import { mileageExceptionReducers } from './mileageException/mileageExceptionReducers';
import { lookupPositionReducers } from './position';
import { lookupRoleReducers } from './role';
import { systemLimitReducers } from './systemLimit';
import { lookupVersionReducers } from './version';

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
  ...lookupMenuReducers,
  ...lookupVersionReducers,
  ...imageGalleryReducers
};

export default lookupReducers;
