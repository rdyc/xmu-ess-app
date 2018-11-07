import timesheetApprovalReducers from './approval/timesheetApprovalReducers';
import timesheetEntryRedusers from './entry/timesheetEntryReducers';

export const timesheetReducers = {
  ...timesheetEntryRedusers,
  ...timesheetApprovalReducers,
};