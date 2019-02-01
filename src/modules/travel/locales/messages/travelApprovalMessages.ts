import { defineMessages } from 'react-intl';

const prefix = 'travel.approval';

// message
export const travelApprovalMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.approval.emptyProps` },
  submitSuccess: { id: `${prefix}.message.submit.success` },
  submitFailure: { id: `${prefix}.message.submit.failure` },
});

// page
export const travelApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` }
});

// option
export const travelApprovalOption = defineMessages({
  approveNote: { id: `${prefix}.option.approveNote` },
  approveNotePlaceholder: { id: `${prefix}.option.approveNote.placeholder` },

  rejectReason: { id: `${prefix}.option.rejectReason` },
  rejectReasonRequired: { id: `${prefix}.option.rejectReason.required` },
  rejectReasonPlaceholder: { id: `${prefix}.option.rejectReason.placeholder` },
});

// confirm
export const travelApprovalConfirm = defineMessages({
  submissionTitle: { id: `${prefix}.confirm.submission.title` },
  submissionContent: { id: `${prefix}.confirm.submission.content` }
});
