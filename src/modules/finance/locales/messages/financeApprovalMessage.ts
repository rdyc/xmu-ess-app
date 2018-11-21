import { defineMessages } from 'react-intl';

const prefix = 'finance.approval';

export const financeApprovalMessage = defineMessages({  
  emptyProps: { id:  `${prefix}.message.emptyProps` },
  emptyFinanceUids: { id:  `${prefix}.message.request.empty.financeUids` },
  createSuccess: { id:  `${prefix}.message.create.success` },
  createFailure: { id:  `${prefix}.message.create.failure` },
});

export const financeApprovalField = defineMessages({
  uid: { id: `${prefix}.uid` },
  moduleName: { id: `${prefix}.moduleName` },
  documentUid: { id: `${prefix}.documentUid` },
  requestor: { id: `${prefix}.requestor` },
  approvalDate: { id: `${prefix}.approvalDate` },
  advance: { id: `${prefix}.advance` },
  total: { id: `${prefix}.total` },
  status: { id: `${prefix}.status` },
  notes: { id: `${prefix}.notes` },
  notesPlaceholder: { id: `${prefix}.notes.placeholder` },
  goToDocument: { id: `${prefix}.button.goToDocument` },
});

export const financeApprovalAction = defineMessages({
  paid: { id: `${prefix}.paid` },
  hold: { id: `${prefix}.hold` },
  notPaid: { id: `${prefix}.notPaid` },
});

export const financeApprovalPage = defineMessages({
  title: {id: `${prefix}.title`},
  subTitle: {id: `${prefix}.subTitle`},
  detailTitle: {id: `${prefix}.detail.title`},
  detailSubTitle: {id: `${prefix}.detail.subTitle`},
});

export const financeApprovalSection = defineMessages({
  infoTitle: {id: `${prefix}.info.title`},
  infoSubTitle: {id: `${prefix}.info.subTitle`},
  approvalTitle: {id: `${prefix}.approval.title`},
  approvalSubTitle: {id: `${prefix}.approval.subTitle`},
});

export const financeApprovalDialog = defineMessages({
  approvalTitle: {id: `${prefix}.approvalTitle`},
  approvalSubTitle: {id: `${prefix}.approvalSubTitle`},
});