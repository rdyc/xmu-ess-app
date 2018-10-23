import leaveApprovalReducers from './approval/leaveApprovalReducers';
import leaveRequestReducers from './request/leaveRequestReducers';

export const leaveReducers = {
  ...leaveApprovalReducers,
  ...leaveRequestReducers
};