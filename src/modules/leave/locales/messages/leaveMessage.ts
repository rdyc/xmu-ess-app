import { leaveApprovalConfirm, leaveApprovalPage } from './leaveApprovalMessage';
import { leaveCancellationConfirm, leaveCancellationPage } from './leaveCancellationMessage';
import { leaveRequestConfirm, leaveRequestField, leaveRequestPage, leaveRequestSection } from './leaveRequestMessage';

export const leaveMessage = {
  request: {
    field: leaveRequestField,
    page: leaveRequestPage,
    section: leaveRequestSection,
    confirm: leaveRequestConfirm
  },
  approval: {
    page: leaveApprovalPage,
    confirm: leaveApprovalConfirm
  },
  cancellation: {
    page: leaveCancellationPage,
    confirm: leaveCancellationConfirm
  }
};