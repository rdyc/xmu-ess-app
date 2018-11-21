import { leaveApprovalConfirm, leaveApprovalPage } from './leaveApprovalMessage';
import { leaveCancellationPage } from './leaveCancellationMessage';
import { leaveRequestConfirm, leaveRequestField, leaveRequestPage } from './leaveRequestMessage';

export const leaveMessage = {
  request: {
    field: leaveRequestField,
    page: leaveRequestPage,
    confirm: leaveRequestConfirm
  },
  approval: {
    page: leaveApprovalPage,
    confirm: leaveApprovalConfirm
  },
  cancellation: {
    page: leaveCancellationPage
  }
};