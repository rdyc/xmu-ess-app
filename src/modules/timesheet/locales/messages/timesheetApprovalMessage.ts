import { defineMessages } from 'react-intl';

const prefix = 'timesheet.approval';
const prefix2 = 'timesheet.approval.history';

// message
export const timesheetApprovalMessage = defineMessages({
  emptyProps: { id: 'timesheet.message.approval.emptyProps' },
  updateSuccess: { id: 'timesheet.message.approval.create.success' },
  updateFailure: { id: 'timesheet.message.approval.create.failure' },
});

// page
export const timesheetApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` }
});

export const timesheetApprovalHistoryPage = defineMessages({
  listTitle: { id: `${prefix2}.page.list.title` },
  listSubHeader: { id: `${prefix2}.page.list.subHeader` }
});

// confirm
export const timesheetApprovalConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});
