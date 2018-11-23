import { defineMessages } from 'react-intl';

const prefix = 'travel.settlementApproval';

// message
export const travelSettlementApprovalMessage = defineMessages({
  emptyProps: { id: 'travel.message.settlementapproval.emptyProps' },
  updateSuccess: { id: 'travel.message.settlementapproval.create.success' },
  updateFailure: { id: 'travel.message.settlementapproval.create.failure' },
});

// page
export const travelSettlementApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
});

// confirm
export const travelSettlementApprovalConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});
