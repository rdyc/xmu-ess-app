import { defineMessages } from 'react-intl';

const prefix = 'finance.approval';

export const financeApprovalMessage = defineMessages({  
  emptyProps: { id:  `${prefix}.message.emptyProps` },
  emptyFinanceUids: { id:  `${prefix}.message.request.empty.financeUids` },
  createSuccess: { id:  `${prefix}.message.create.success` },
  createFailure: { id:  `${prefix}.message.create.failure` },
});

export const financeApprovalField = defineMessages({
  uid: { id: `${prefix}.field.uid` },
  moduleName: { id: `${prefix}.field.moduleName` },
  documentUid: { id: `${prefix}.field.documentUid` },
  requestor: { id: `${prefix}.field.requestor` },
  approvalDate: { id: `${prefix}.field.approvalDate` },
  advance: { id: `${prefix}.field.advance` },
  total: { id: `${prefix}.field.total` },
  status: { id: `${prefix}.field.status` },
  notes: { id: `${prefix}.field.notes` },
  notesPlaceholder: { id: `${prefix}.field.notes.placeholder` },
  goToDocument: { id: `${prefix}.field.button.goToDocument` },
  notesExpense: { id: `${prefix}.field.notes.expense` },
  notesMileage: { id: `${prefix}.field.notes.mileage` },
});

export const financeApprovalAction = defineMessages({
  paid: { id: `${prefix}.action.paid` },
  hold: { id: `${prefix}.action.hold` },
  notPaid: { id: `${prefix}.action.notPaid` },
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
  approvalTitle: {id: `${prefix}.dialog.approvalTitle`},
  approvalSubTitle: {id: `${prefix}.dialog.approvalContent`},
});