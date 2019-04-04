import {
  mileageApprovalField,
  mileageApprovalMessage,
  mileageApprovalPage,
  mileageApprovalSubmission
} from './mileageApprovalMessage';
import {
  mileageFieldHelperFor,
  mileageRequestConfirm,
  mileageRequestField,
  mileageRequestItem,
  mileageRequestMessage,
  mileageRequestPage,
  mileageRequestSubmission,
  timesheetItem
} from './mileageRequestMessage';

export const mileageMessage = {
  request: {
    field: mileageRequestField,
    message: mileageRequestMessage,
    page: mileageRequestPage,
    item: mileageRequestItem,
    confirm: mileageRequestConfirm,
    timesheet: timesheetItem,
    fieldFor: mileageFieldHelperFor,
    submission: mileageRequestSubmission
  },
  approval: {
    page: mileageApprovalPage,
    message: mileageApprovalMessage,
    submission: mileageApprovalSubmission,
    field: mileageApprovalField
  }
};
