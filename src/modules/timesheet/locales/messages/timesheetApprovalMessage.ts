import { defineMessages } from 'react-intl';

const prefix = 'timesheet.approval';
const prefix2 = 'timesheet.approval.history';

// message
export const timesheetApprovalMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  submitSuccess: { id: `${prefix}.message.submit.success` },
  submitFailure: { id: `${prefix}.message.submit.failure` },
});

// page
export const timesheetApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` }
});

export const timesheetApprovalHistoryPage = defineMessages({
  listTitle: { id: `${prefix2}.page.list.title` },
  listSubHeader: { id: `${prefix2}.page.list.subHeader` },
  detailTitle: { id: `${prefix2}.page.detail.title` },
  detailSubHeader: { id: `${prefix2}.page.detail.subHeader` }
});

// section
export const timesheetApprovalSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.approvalTitle` },
  infoSubHeader: { id: `${prefix}.section.info.approvalSubHeader` },
  statusTitle: { id: `${prefix}.section.status.title` },
  statusSubHeader: { id: `${prefix}.section.status.subHeader` },
  approvalTitle: { id: `${prefix}.section.approval.title` },
  approvalSubHeader: { id: `${prefix}.section.approval.subHeader` },
});

// confirm
export const timesheetApprovalConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});
