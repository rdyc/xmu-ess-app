import { defineMessages } from 'react-intl';

const prefix = 'lookup.employeelevel';

// page
export const employeeLevelPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
});

// confirmation
export const employeeLevelConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` },
});

// section
export const employeeLevelSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
});

// dialog
export const employeeLevelDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
});

// fields
export const employeeLevelField = defineMessages({
  uid: {id: `${prefix}.field.uid`},
  uidPlaceholder: {id: `${prefix}.field.uid.placeholder`},

  seq: {id: `${prefix}.field.seq`},
  seqPlaceholder: {id: `${prefix}.field.seq.placeholder`},
  
  value: {id: `${prefix}.field.value`},
  valueRequired: {id: `${prefix}.field.value.required`},
  valuePlaceholder: {id: `${prefix}.field.value.placeholder`},

  description: {id: `${prefix}.field.description`},
  descriptionRequired: {id: `${prefix}.field.description.required`},
  descriptionPlaceholder: {id: `${prefix}.field.description.placeholder`},
});

export const employeeLevelFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return employeeLevelField.uid;
      case 'seq': return employeeLevelField.seq;
      case 'value': return employeeLevelField.value;
      case 'description': return employeeLevelField.description;
          
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'value': return employeeLevelField.value;
      case 'description': return employeeLevelField.description;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return employeeLevelField.uidPlaceholder;
      case 'seq': return employeeLevelField.seqPlaceholder;
      case 'value': return employeeLevelField.valuePlaceholder;
      case 'description': return employeeLevelField.descriptionPlaceholder;
      
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const employeeLevelMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});