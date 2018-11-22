import { mileageApprovalMessage, mileageApprovalPage, mileageApprovalSubmission } from './mileageApprovalMessage';
import { mileageRequestField, mileageRequestItem, mileageRequestMessage, mileageRequestPage } from './mileageRequestMessage';

export const mileageMessage = {
  request: {
    field: mileageRequestField,
    message: mileageRequestMessage,
    page: mileageRequestPage,
    item: mileageRequestItem
  },
  approval: {
    page: mileageApprovalPage,
    message: mileageApprovalMessage,
    submission: mileageApprovalSubmission
  }
};