import { defineMessages } from 'react-intl';

const prefix = 'purchase';

export const purchaseSettlementMessage = defineMessages({
  emptyPurchaseUid: { id: 'purchase.message.purchaseRequest.empty.purchaseUid' },
  createSuccess: { id: 'purchase.message.purchaseRequest.create.success' },
  createFailure: { id: 'purchase.message.purchaseRequest.create.failure' },
  updateSuccess: { id: 'purchase.message.purchaseRequest.update.success' },
  updateFailure: { id: 'purchase.message.purchaseRequest.update.failure' },
});

// export const purchaseSettlementItemField = defineMessages({
//   uid: { id: `${prefix}.itemTitle.uid`},
//   description: { id: `${prefix}.itemTitle.description`},
//   request: { id: `${prefix}.itemTitle.request`},

//   actual: { id: `${prefix}.itemTitle.actual`},
//   actualRequired: { id: `${prefix}.itemTitle.actual.required`},
//   actualPlaceholder: { id: `${prefix}.itemTitle.actual.placeholder`},
  
//   variance: { id: `${prefix}.itemTitle.variance`},
// });

export const purchaseSettlementField = defineMessages({
  uid: { id: `${prefix}.field.information.uid` },
  uidPlaceholder: { id: `${prefix}.field.information.uid.placeholder` },

  status: { id: `${prefix}.field.information.status` },
  projectUid: { id: `${prefix}.field.information.projectUid` },
  customerUid: { id: `${prefix}.field.information.customerUid` },

  date: { id: `${prefix}.field.information.settlementdate` },
  dateRequired: { id: `${prefix}.field.information.settlementdate.required` },
  datePlaceholder: { id: `${prefix}.field.information.settlementdate.placeholder` },

  createdBy: { id: `${prefix}.field.information.createdBy` },

  notes: { id: `${prefix}.field.information.notes` },
  notesPlaceholder: { id: `${prefix}.field.information.notes.placeholder` },

  advance: { id: `${prefix}.field.information.advance` },
  balanceDue: { id: `${prefix}.field.information.balanceDue` },
  currencyType: { id: `${prefix}.field.information.currencyType` },
  rate: { id: `${prefix}.field.information.rate` },

  request: { id: `${prefix}.field.information.request` },
  actual: { id: `${prefix}.field.information.actual` },
  difference: { id: `${prefix}.field.information.difference` },

  requestInIDR: { id: `${prefix}.field.information.requestInIDR` },
  actualInIDR: { id: `${prefix}.field.information.actualInIDR` },
  differenceInIDR: { id: `${prefix}.field.information.differenceInIDR` },

  reject: { id: `${prefix}.field.information.reason` },

});
