import { defineMessages } from 'react-intl';

const prefix = 'travel.approval';

// message
export const travelApprovalMessage = defineMessages({
  emptyProps: { id: 'travel.message.approval.emptyProps' },
  updateSuccess: { id: 'travel.message.approval.create.success' },
  updateFailure: { id: 'travel.message.approval.create.failure' },
});

// page
export const travelApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` }
});

// confirm
export const travelApprovalConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});
