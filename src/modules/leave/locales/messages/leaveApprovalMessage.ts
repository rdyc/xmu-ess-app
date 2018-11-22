import { defineMessages } from 'react-intl';

const prefix = 'leave.approval';

export const leaveApprovalMessage = defineMessages({
  emptyProps: { id: 'leave.message.approval.emptyProps' },
  submitSuccess: { id: 'leave.message.approval.create.success' },
  submitFailure: { id: 'leave.message.approval.create.failure' },
});

// page
export const leaveApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` }
});

// confirm
export const leaveApprovalConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});
