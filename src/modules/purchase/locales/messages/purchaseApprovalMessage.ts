import { defineMessages } from 'react-intl';

const prefix = 'purchase';

export const purchaseApprovalMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.approval.emptyProps` },
  emptyPurchaseUid: { id: `${prefix}.message.request.empty.purchaseUid` },
  approveSuccess: { id: `${prefix}.message.approval.approve.success` },
  rejectSuccess: { id: `${prefix}.message.approval.reject.success` },
  createFailure: { id: `${prefix}.message.approval.create.failure` },
  submitSuccess: { id: `${prefix}.message.approval.submit.success` },
  approve: { id: `${prefix}.message.approval.approve` },
  reject: { id: `${prefix}.message.approval.reject` }
});

export const purchaseApprovalPage = defineMessages({
  listTitle: { id: `${prefix}.approval.list.title` },
  listSubHeader: { id: `${prefix}.approval.list.subTitle` },
  detailTitle: { id: `${prefix}.approval.detail.title` },
  detailSubHeader: { id: `${prefix}.approval.detail.subTitle`},
});

export const purchaseApprovalConfirm = defineMessages({
  approveTitle: { id: `${prefix}.confirm.approval.title` },
  approveDescription: { id: `${prefix}.confirm.approval.description` },
});

export const purchaseApprovalSection = defineMessages({
  approveForm: { id: `${prefix}.form.approval.newTitle` },
  approveContent: { id: `${prefix}.form.approval.newSubTitle` }
});

export const purchaseApprovalField = defineMessages({
  uid: { id: `${prefix}.field.information.uid` },
  uidPlaceholder: { id: `${prefix}.field.information.uid.placeholder` },

  status: { id: `${prefix}.field.information.status` },

  projectUid: { id: `${prefix}.field.information.projectUid` },
  projectUidRequired: { id: `${prefix}.field.information.projectUid.required` },
  projectUidPlaceholder: { id: `${prefix}.field.information.projectUid.placeholder` },

  customerUid: { id: `${prefix}.field.information.customerUid` },
  customerUidRequired: { id: `${prefix}.field.information.customerUid.required` },
  customerUidPlaceholder: { id: `${prefix}.field.information.customerUid.placeholder` },

  date: { id: `${prefix}.field.information.date` },
  dateRequired: { id: `${prefix}.field.information.date.required` },
  datePlaceholder: { id: `${prefix}.field.information.date.placeholder` },

  createdBy: { id: `${prefix}.field.information.createdBy` },
  createdByPlaceholder: { id: `${prefix}.field.information.createdBy.placeholder` },

  notes: { id: `${prefix}.field.information.notes` },
  notesPlaceholder: { id: `${prefix}.field.information.notes.placeholder` },

  advance: { id: `${prefix}.field.information.advance` },
  advanceRequired: { id: `${prefix}.field.information.advance.required` },
  advancePlaceholder: { id: `${prefix}.field.information.advance.placeholder` },

  currencyType: { id: `${prefix}.field.information.currencyType` },
  currencyTypeRequired: { id: `${prefix}.field.information.currencyType.required` },
  currencyTypePlaceholder: { id: `${prefix}.field.information.currencyType.placeholder` },

  rate: { id: `${prefix}.field.information.rate` },
  rateRequired: { id: `${prefix}.field.information.rate.required` },
  ratePlaceholder: { id: `${prefix}.field.information.rate.placeholder` },

  request: { id: `${prefix}.field.information.request` },
  requestRequired: { id: `${prefix}.field.information.request.required` },
  requestPlaceholder: { id: `${prefix}.field.information.request.placeholder` },

  requestInIDR: { id: `${prefix}.field.information.requestInIDR` },

  reason: { id: `${prefix}.field.information.reason` },
});