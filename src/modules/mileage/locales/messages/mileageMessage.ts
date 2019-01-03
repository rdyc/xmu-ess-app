import { mileageApprovalField, mileageApprovalMessage, mileageApprovalPage, mileageApprovalSubmission } from './mileageApprovalMessage';
import { mileageRequestConfirm, mileageRequestField, mileageRequestItem, mileageRequestMessage, mileageRequestPage, timesheetItem } from './mileageRequestMessage';

export const mileageMessage = {
  request: {
    field: mileageRequestField,
    message: mileageRequestMessage,
    page: mileageRequestPage,
    item: mileageRequestItem,
    confirm: mileageRequestConfirm,
    timesheet: timesheetItem
  },
  approval: {
    page: mileageApprovalPage,
    message: mileageApprovalMessage,
    submission: mileageApprovalSubmission,
    field: mileageApprovalField
  }
};