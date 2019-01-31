import { defineMessages } from 'react-intl';
import { purchaseItemField } from './purchaseItemMessage';

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
  reasonRequired: { id: `${prefix}.field.information.rejectreason.required` },
  reasonPlaceholder: { id: `${prefix}.field.information.rejectreason.placeholder` },

  approveNotes: { id: `${prefix}.field.information.approveNotes` },
  approveNotesPlaceholder: { id: `${prefix}.field.information.rejectreason` },

  isNotify: { id: `${prefix}.field.isNotify` },
  isRejected: { id: `${prefix}.field.isRejected` },
  isSettlement: { id: `${prefix}.field.isSettlement` },
  statusType: { id: `${prefix}.field.statusType` },
  completion: { id: `${prefix}.field.completion` },
});

export const purchaseRequestFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return purchaseRequestField.uid;
      case 'purchaseUid': return purchaseRequestField.uid;
      case 'projectUid': return purchaseRequestField.projectUid;
      case 'project': return purchaseRequestField.projectUid;
      case 'customerUid': return purchaseRequestField.customerUid;
      case 'customer': return purchaseRequestField.customerUid;
      case 'currencyType': return purchaseRequestField.currencyType;
      case 'currency': return purchaseRequestField.currencyType;
      case 'dates': return purchaseRequestField.date;
      case 'date': return purchaseRequestField.date;
      case 'statusType': return purchaseRequestField.statusType;
      case 'status': return purchaseRequestField.statusType;
      case 'notes': return purchaseRequestField.notes;
      case 'note': return purchaseRequestField.notes;
      case 'request': return purchaseRequestField.request;
      case 'requestInIDR': return purchaseRequestField.requestInIDR;
      case 'advance': return purchaseRequestField.advance;
      case 'rate': return purchaseRequestField.rate;

      // item
      case 'description': return purchaseItemField.description;
      case 'requestValue': return purchaseItemField.request;
      default: return { id: field };
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'projectUid': return purchaseRequestField.projectUidRequired;
      case 'project': return purchaseRequestField.projectUidRequired;
      case 'customerUid': return purchaseRequestField.customerUidRequired;
      case 'customer': return purchaseRequestField.customerUidRequired;
      case 'currencyType': return purchaseRequestField.currencyTypeRequired;
      case 'currency': return purchaseRequestField.currencyTypeRequired;
      case 'dates': return purchaseRequestField.dateRequired;
      case 'date': return purchaseRequestField.dateRequired;
      case 'rate': return purchaseRequestField.rateRequired;

      // item
      case 'requestValue': return purchaseItemField.requestPlaceholder;
      case 'request': return purchaseItemField.requestPlaceholder;
      case 'description': return purchaseRequestField.notesPlaceholder;

      default: return { id: field };
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return purchaseRequestField.uidPlaceholder;
      case 'purchaseUid': return purchaseRequestField.uidPlaceholder;
      case 'projectUid': return purchaseRequestField.projectUidPlaceholder;
      case 'project': return purchaseRequestField.projectUidPlaceholder;
      case 'customerUid': return purchaseRequestField.customerUidPlaceholder;
      case 'customer': return purchaseRequestField.customerUidPlaceholder;
      case 'date': return purchaseRequestField.datePlaceholder;
      case 'currencyType': return purchaseRequestField.currencyTypePlaceholder;
      case 'currency': return purchaseRequestField.currencyTypePlaceholder;
      case 'rate': return purchaseRequestField.ratePlaceholder;
      
      // item
      case 'request': return purchaseItemField.requestPlaceholder;
      case 'requestValue': return purchaseItemField.requestPlaceholder;
      case 'description': return purchaseRequestField.notesPlaceholder;

      default: return { id: field };
    }
  }

  return { id: field };
};