import { holidayConfirm, holidayField, holidayPage } from './holiday';
import { leaveConfirm, leaveField, leavePage } from './leave';
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
  },
  leave: {
    page: leavePage,
    field: leaveField,
    confirm: leaveConfirm, 
  }
};