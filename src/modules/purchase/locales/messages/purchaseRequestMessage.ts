import { defineMessages } from 'react-intl';

const prefix = 'purchase';

export const purchaseRequestMessage = defineMessages({
  emptyPurchaseUid: { id: `${prefix}.message.request.empty.purchaseUid` },
  createSuccess: { id: `${prefix}.message.request.create.success` },
  createFailure: { id: `${prefix}.message.request.create.failure` },
  updateSuccess: { id: `${prefix}.message.request.update.success` },
  updateFailure: { id: `${prefix}.message.request.update.failure` },
 
});

export const purchaseRequestPage = defineMessages({
  listTitle: { id: `${prefix}.request.list.title` },
  listSubHeader: { id: `${prefix}.request.list.subTitle` },
  detailTitle: { id: `${prefix}.request.detail.title` },
  detailSubHeader: { id: `${prefix}.request.detail.subTitle`},
  newTitle: { id: `${prefix}.form.request.newTitle`},
  modifyTitle: { id: `${prefix}.form.request.editTitle`},

});

export const purchaseRequestSection = defineMessages({
  infoTitle: { id: `${prefix}.request.section.info.title` },
  infoSubHeader: { id: `${prefix}.request.section.info.subTitle`},
  itemTitle: { id: `${prefix}.item.purchaseTitle`},
  itemSubHeader: { id: `${prefix}.item.purchaseSubTitle`},
});

export const purchaseRequestConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
});

export const purchaseRequestField = defineMessages({
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

  reason: { id: `${prefix}.field.information.rejectreason` },

  isNotify: { id: `${prefix}.field.isNotify` },

  completion: { id: `${prefix}.field.completion` },
});
