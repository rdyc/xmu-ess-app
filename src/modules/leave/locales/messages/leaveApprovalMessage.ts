import { defineMessages } from 'react-intl';

const prefix = 'leave.approval';

export const leaveApprovalMessage = defineMessages({
  emptyProps: { id: 'leave.message.approval.emptyProps' },
  updateSuccess: { id: 'leave.message.approval.create.success' },
  updateFailure: { id: 'leave.message.approval.create.failure' },
});

// page
export const leaveApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` }
});

// confirm
export const leaveApprovalConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});
