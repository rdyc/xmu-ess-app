import { defineMessages } from 'react-intl';

const prefix = 'mileage.approval';

// message
export const mileageApprovalMessage = defineMessages({
  emptyProps: { id: 'mileage.message.approval.emptyProps' },
  updateSuccess: { id: 'mileage.message.approval.update.success' },
  updateFailure: { id: 'mileage.message.approval.update.failure' },
});

// page
export const mileageApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
});

// submission
export const mileageApprovalSubmission = defineMessages({
  title: { id: `${prefix}.submission.title`},
  subHeader: { id: `${prefix}.submission.subHeader`},
  dialogTitle: { id: `${prefix}.submission.dialog.title`},
  dialogContent: { id: `${prefix}.submission.dialog.content`},
});