import { defineMessages } from 'react-intl';

const prefix = 'project.approval';

// message
export const projectApprovalMessage = defineMessages({
  emptyProps: { id: 'project.message.approval.emptyProps' },
  updateSuccess: { id: 'project.message.approval.create.success' },
  updateFailure: { id: 'project.message.approval.create.failure' },
});

// page
export const projectApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` }
});

// confirm
export const projectApprovalConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});
