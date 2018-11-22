import { defineMessages } from 'react-intl';

const prefix = 'purchase';

export const purchaseRequestMessage = defineMessages({
  emptyPurchaseUid: { id: 'purchase.message.purchaseRequest.empty.purchaseUid' },
  createSuccess: { id: 'purchase.message.purchaseRequest.create.success' },
  createFailure: { id: 'purchase.message.purchaseRequest.create.failure' },
  updateSuccess: { id: 'purchase.message.purchaseRequest.update.success' },
  updateFailure: { id: 'purchase.message.purchaseRequest.update.failure' },
});

export const purchaseRequestPage = defineMessages({
  listTitle: { id: `${prefix}.request.list.title` },
  listSubHeader: { id: `${prefix}.request.list.subTitle` },
  detailTitle: { id: `${prefix}.request.detail.itle` },
  detailSubHeader: { id: `${prefix}.request.detail.subTitle`},
  newTitle: { id: `${prefix}.form.request.newTitle`},
  // newSubHeader: { id: `${prefix}.form.newSubTitle`},
  modifyTitle: { id: `${prefix}.form.request.editTitle`},
  // modifySubHeader: { id: `${prefix}.form.editSubTitle`},

  statusSettle: { id: `${prefix}.`},
  // statusModifySubHeader: { id: },
});

export const purchaseRequestSection = defineMessages({
  infoTitle: { id: `${prefix}.request.section.info.title` },
  infoSubHeader: { id: `${prefix}.request.section.info.subtitle`},
  itemTitle: { id: `${prefix}.item.purchaseTitle`},
  itemSubHeader: { id: `${prefix}.item.purchaseSubTitle`},
});

// export const purchaseRequestItemField = defineMessages({
//   uid: { id: `${prefix}.itemTitle.uid` },
//   description: { id: `${prefix}.itemTitle.description` },

//   request: { id: `${prefix}.itemTitle.request` },
//   requestRequired: { id: `${prefix}.itemTitle.request.required` },
//   requestPlaceholder: { id: `${prefix}.itemTitle.request.placeholder` },
// });

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

  reason: { id: `${prefix}.field.information.reason` },
});