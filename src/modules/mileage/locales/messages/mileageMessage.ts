import { mileageApprovalMessage, mileageApprovalPage, mileageApprovalSubmission } from './mileageApprovalMessage';
import { mileageRequestConfirm, mileageRequestField, mileageRequestItem, mileageRequestMessage, mileageRequestPage } from './mileageRequestMessage';

export const mileageMessage = {
  request: {
    field: mileageRequestField,
    message: mileageRequestMessage,
    page: mileageRequestPage,
    item: mileageRequestItem,
    confirm: mileageRequestConfirm
  },
  approval: {
    page: mileageApprovalPage,
    message: mileageApprovalMessage,
    submission: mileageApprovalSubmission
  }
};