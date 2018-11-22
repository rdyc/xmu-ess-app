import { defineMessages } from 'react-intl';

const prefix = 'project.approval';

// message
export const projectApprovalMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  submitSuccess: { id: `${prefix}.message.submit.success` },
  submitFailure: { id: `${prefix}.message.submit.failure` },
});

// page
export const projectApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` }
});

// confirm
export const projectApprovalConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});
