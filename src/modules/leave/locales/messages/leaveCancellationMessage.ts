import { defineMessages } from 'react-intl';

const prefix = 'leave.cancellation';

export const leaveCancellationMessage = defineMessages({
  emptyProps: { id: 'leave.message.cancellation.emptyProps' },
  submitSuccess: { id: 'leave.message.cancellation.create.success' },
  submitFailure: { id: 'leave.message.cancellation.create.failure' },
});

// page
export const leaveCancellationPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` }
});

export const leaveCancellationConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});