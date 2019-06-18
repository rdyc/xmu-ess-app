import { leaveApprovalConfirm, leaveApprovalPage } from './leaveApprovalMessage';
import { leaveCancellationConfirm, leaveCancellationPage } from './leaveCancellationMessage';
import {
  leaveRequestConfirm,
  leaveRequestDialog,
  leaveRequestField,
  leaveRequestFieldHelperFor,
  leaveRequestMessage,
  leaveRequestPage,
  leaveRequestSection,
  leaveRequestSubmission,
} from './leaveRequestMessage';

export const leaveMessage = {
  request: {
    field: leaveRequestField,
    fieldFor: leaveRequestFieldHelperFor,
    submission: leaveRequestSubmission,
    page: leaveRequestPage,
    section: leaveRequestSection,
    confirm: leaveRequestConfirm,
    dialog: leaveRequestDialog,
    message: leaveRequestMessage,
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