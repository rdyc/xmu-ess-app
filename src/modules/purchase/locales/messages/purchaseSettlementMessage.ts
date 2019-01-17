import { defineMessages } from 'react-intl';
import { purchaseItemField } from './purchaseItemMessage';

const prefix = 'purchase';

export const purchaseSettlementMessage = defineMessages({
  emptyPurchaseUid: { id: 'purchase.message.request.empty.purchaseUid' },
  settleSuccess: { id: 'purchase.message.settlement.settle.success' },
  settleFailure: { id: 'purchase.message.settlement.settle.failure' },
  updateSuccess: { id: 'purchase.message.request.update.success' },
  updateFailure: { id: 'purchase.message.request.update.failure' },
});

export const purchaseSettlementConfirm = defineMessages({
  settleTitle: { id: `${prefix}.confirm.settle.title` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  settleDescription: { id: `${prefix}.confirm.settle.description` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
});

export const purchaseSettlementPage = defineMessages({
  listTitle: { id: `${prefix}.settlement.list.title` },
  listSubHeader: { id: `${prefix}.settlement.list.subTitle` },
  detailTitle: { id: `${prefix}.settlement.detail.title` },
  detailSubHeader: { id: `${prefix}.settlement.detail.subTitle` },
  newTitle: { id: `${prefix}.form.settlement.newTitle` },
  modifyTitle: { id: `${prefix}.form.settlement.editTitle` },
});

export const purchaseSettlementSection = defineMessages({
  infoTitle: { id: `${prefix}.settlement.section.info.title` },
  infoSubHeader: { id: `${prefix}.settlement.section.info.subTitle` },
  itemTitle: { id: `${prefix}.item.settlementTitle` },
  itemSubHeader: { id: `${prefix}.item.settlementSubTitle` },
});

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

  reject: { id: `${prefix}.field.information.rejectreason` },
  rejectRequired: { id: `${prefix}.field.information.rejectreason.required` },
  rejectPlaceholder: { id: `${prefix}.field.information.rejectreason.placeholder` },

  adjustmentNote: { id: `${prefix}.field.information.adjustmentNote` },
  adjustmentNoteRequired: { id: `${prefix}.field.information.adjustmentNote.required` },
  adjustmentNotePlaceholder: { id: `${prefix}.field.information.adjustmentNote.placeholder` },

  isNeedAdjust: { id: `${prefix}.field.isNeedAdjust` }
});

export const purchaseSettlementFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return purchaseSettlementField.uid;
      case 'purchaseUid': return purchaseSettlementField.uid;
      case 'projectUid': return purchaseSettlementField.projectUid;
      case 'project': return purchaseSettlementField.projectUid;
      case 'customerUid': return purchaseSettlementField.customerUid;
      case 'customer': return purchaseSettlementField.customerUid;
      case 'currencyType': return purchaseSettlementField.currencyType;
      case 'currency': return purchaseSettlementField.currencyType;
      case 'date': return purchaseSettlementField.date;
      case 'statusType': return purchaseSettlementField.status;
      case 'status': return purchaseSettlementField.status;
      case 'notes': return purchaseSettlementField.notes;
      case 'request': return purchaseSettlementField.request;
      case 'requestInIDR': return purchaseSettlementField.requestInIDR;
      case 'advance': return purchaseSettlementField.advance;
      case 'rate': return purchaseSettlementField.rate;

      // item
      case 'requestValue': return purchaseSettlementField.request;
      case 'description': return purchaseItemField.description;
      case 'actualValue': return purchaseItemField.actual;
      case 'actual': return purchaseItemField.actual;
      case 'varianceValue': return purchaseItemField.variance;
      case 'variance': return purchaseItemField.variance;
      default: return { id: field };
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'date': return purchaseSettlementField.dateRequired;

      // item
      case 'actual': return purchaseItemField.actualPlaceholder;

      default: return { id: field };
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return purchaseSettlementField.uidPlaceholder;
      case 'purchaseUid': return purchaseSettlementField.uidPlaceholder;
      case 'date': return purchaseSettlementField.datePlaceholder;
      case 'notes': return purchaseSettlementField.notesPlaceholder;
      case 'note': return purchaseSettlementField.notesPlaceholder;

      // item
      case 'actual': return purchaseItemField.actualPlaceholder;

      default: return { id: field };
    }
  }

  return { id: field };
};