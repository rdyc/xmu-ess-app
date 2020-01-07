import { defineMessages } from 'react-intl';

const prefix = 'kpi.category';

// page
export const KPICategoryPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
});

// message
export const KPICategoryMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});

// submission
export const KPICategorySubmission = defineMessages({
  form: { id: `${prefix}.submission.form` }
});

// section
export const KPICategorySection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
});

// confimation
export const KPICategoryConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` },
});

// fields
export const KPICategoryField = defineMessages({
  name: { id: `${prefix}.field.name`},
  namePlaceholder: { id: `${prefix}.field.name.placeholder`},
  nameRequired: { id: `${prefix}.field.name.required`},
  measurementCount: { id: `${prefix}.field.measurementCount`},
  group: { id: `${prefix}.field.group`},
  uid: { id: `${prefix}.field.uid`},
});

// dialog
export const KPICategoryDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
});

// helper
export const KPICategoryFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return KPICategoryField.uid; 
      case 'name': return KPICategoryField.name;
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return KPICategoryField.nameRequired;
      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'name': return KPICategoryField.namePlaceholder;
      default: return {id: field};
    }
  }

  return {id: field};
};
