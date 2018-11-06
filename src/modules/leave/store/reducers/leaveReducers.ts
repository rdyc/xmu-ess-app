import leaveApprovalReducers from './approval/leaveApprovalReducers';
import leaveCancellationReducers from './cancellation/leaveCancellationReducers';
import leaveRequestReducers from './request/leaveRequestReducers';

export const leaveReducers = {
  ...leaveApprovalReducers,
  ...leaveRequestReducers,
  ...leaveCancellationReducers
};