import { holidayConfirm, holidayField, holidayPage } from './holiday';
import { mileageExceptionConfirm, mileageExceptionField, mileageExceptionPage } from './mileageException';

export const lookupMessage = {
  mileageException: {
    page: mileageExceptionPage,
    field: mileageExceptionField,
    confirm: mileageExceptionConfirm, 
  },
  holiday: {
    page: holidayPage,
    field: holidayField,
    confirm: holidayConfirm, 
  }
};