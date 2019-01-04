import { defineMessages } from 'react-intl';

const prefix = 'expense';
const fieldPrefix = `${prefix}.field`;

export const expenseRequestMessage = defineMessages({
  emptyExpenseUid: { id: `${prefix}.message.request.empty.expenseUid` },
  emptyProps: { id: `${prefix}.message.owner.emptyProps` },
  createSuccess: { id: `${prefix}.message.request.create.success` },
  createFailure: { id: `${prefix}.message.request.create.failure` },
  updateSuccess: { id: `${prefix}.message.request.update.success` },
  updateFailure: { id: `${prefix}.message.request.update.failure` },
});

export const expenseRequestPage = defineMessages({
  title: { id: `${prefix}.title`},
  subTitle: { id: `${prefix}.subTitle`},
  detailTitle: { id: `${prefix}.detail.title`},
  detailSubTitle: { id: `${prefix}.detail.subTitle`},
  createTitle: { id: `${prefix}.form.newTitle`},
  createSubTitle: { id: `${prefix}.form.newSubTitle`},
  editTitle: { id: `${prefix}.form.editTitle`},
  editSubTitle: { id: `${prefix}.form.editSubTitle`},
});

export const expenseRequestSection = defineMessages({
  title: { id: `${prefix}.infoTitle`},
  subTitle: { id: `${prefix}.infoSubTitle`},
});

export const expenseRequestAction = defineMessages({
  modify: { id: `${prefix}.action.modify`},
});

export const expenseRequestDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
  editTitle: { id: `${prefix}.dialog.editTitle`},
  editDescription: { id: `${prefix}.dialog.editDescription`},
});

export const expenseRequestField = defineMessages({
  uid: { id: `${fieldPrefix}.uid`},
  uidPlaceholder: { id: `${fieldPrefix}.uid.placeholder`},

  customerUid: { id: `${fieldPrefix}.customerUid`},
  customerUidPlaceholder: { id: `${fieldPrefix}.customerUid.placeholder`},
  customerUidRequired: { id: `${fieldPrefix}.customerUid.required`},
  
  projectUid: { id: `${fieldPrefix}.projectUid`},
  projectUidPlaceholder: { id: `${fieldPrefix}.projectUid.placeholder`},
  projectUidRequired: { id: `${fieldPrefix}.projectUid.required`},

  date: { id: `${fieldPrefix}.date`},
  datePlaceholder: { id: `${fieldPrefix}.date.placeholder`},
  dateRequired: { id: `${fieldPrefix}.date.required`},

  expenseType: { id: `${fieldPrefix}.expenseType`},
  expenseTypePlaceholder: { id: `${fieldPrefix}.expenseType.placeholder`},
  expenseTypeRequired: { id: `${fieldPrefix}.expenseType.required`},

  value: { id: `${fieldPrefix}.value`},
  valuePlaceholder: { id: `${fieldPrefix}.value.placeholder`},
  valueRequired: { id: `${fieldPrefix}.value.required`},

  location: { id: `${fieldPrefix}.location`},
  locationPlaceholder: { id: `${fieldPrefix}.location.placeholder`},
  locationRequired: { id: `${fieldPrefix}.location.required`},

  address: { id: `${fieldPrefix}.address`},
  addressPlaceholder: { id: `${fieldPrefix}.address.placeholder`},
  addressRequired: { id: `${fieldPrefix}.address.required`},

  name: { id: `${fieldPrefix}.name`},
  namePlaceholder: { id: `${fieldPrefix}.name.placeholder`},
  nameRequired: { id: `${fieldPrefix}.name.required`},

  title: { id: `${fieldPrefix}.title`},
  titlePlaceholder: { id: `${fieldPrefix}.title.placeholder`},
  titleRequired: { id: `${fieldPrefix}.title.required`},

  notes: { id: `${fieldPrefix}.notes`},
  notesPlaceholder: { id: `${fieldPrefix}.notes.placeholder`},
  notesRequired: { id: `${fieldPrefix}.notes.required`},

  rejectedReason: { id: `${fieldPrefix}.rejectedReason`},

  createdBy: { id: `${fieldPrefix}.createdBy`},

  status: { id: `${fieldPrefix}.status`},
  
  completion: { id: `${fieldPrefix}.completion` },
  isNotify: { id: `${fieldPrefix}.isNotify` },
  isRejected: { id: `${fieldPrefix}.isRejected` },
});

export const expenseRequestFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return expenseRequestField.uid;
      case 'customerUid': return expenseRequestField.customerUid;
      case 'projectUid': return expenseRequestField.projectUid;
      case 'date': return expenseRequestField.date;
      case 'expenseType': return expenseRequestField.expenseType;
      case 'value': return expenseRequestField.value;
      case 'location': return expenseRequestField.location;
      case 'address': return expenseRequestField.address;
      case 'name': return expenseRequestField.name;
      case 'title': return expenseRequestField.title;
      case 'notes': return expenseRequestField.notes;
      case 'rejectedReason': return expenseRequestField.rejectedReason;
      case 'createdBy': return expenseRequestField.createdBy;
      case 'status': return expenseRequestField.status;
      case 'isNotify': return expenseRequestField.isNotify;
      case 'isRejected': return expenseRequestField.isRejected;
      case 'completion': return expenseRequestField.completion;
      
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'customerUid': return expenseRequestField.customerUidRequired;
      case 'projectUid': return expenseRequestField.projectUidRequired;
      case 'date': return expenseRequestField.dateRequired;
      case 'expenseType': return expenseRequestField.expenseTypeRequired;
      case 'value': return expenseRequestField.valueRequired;
      case 'location': return expenseRequestField.locationRequired;
      case 'address': return expenseRequestField.addressRequired;
      case 'name': return expenseRequestField.nameRequired;
      case 'title': return expenseRequestField.titleRequired;
      case 'notes': return expenseRequestField.notesRequired;
      
      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return expenseRequestField.uidPlaceholder;
      case 'customerUid': return expenseRequestField.customerUidPlaceholder;
      case 'projectUid': return expenseRequestField.projectUidPlaceholder;
      case 'date': return expenseRequestField.datePlaceholder;
      case 'expenseType': return expenseRequestField.expenseTypePlaceholder;
      case 'value': return expenseRequestField.valuePlaceholder;
      case 'location': return expenseRequestField.locationPlaceholder;
      case 'address': return expenseRequestField.addressPlaceholder;
      case 'name': return expenseRequestField.namePlaceholder;
      case 'title': return expenseRequestField.titlePlaceholder;
      case 'notes': return expenseRequestField.notesPlaceholder;
      
      default: return {id: field};
    }
  }

  return {id: field};
};