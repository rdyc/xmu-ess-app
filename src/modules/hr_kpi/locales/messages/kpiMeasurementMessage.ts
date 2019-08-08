import { defineMessages } from 'react-intl';

const prefix = 'kpi.measurement';

// page
export const KPIMeasurementPage = defineMessages({
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
export const KPIMeasurementMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});

// submission
export const KPIMeasurementSubmission = defineMessages({
  form: { id: `${prefix}.submission.form` }
});

// section
export const KPIMeasurementSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
});

// confimation
export const KPIMeasurementConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` },
});

// fields
export const KPIMeasurementField = defineMessages({
  description: { id: `${prefix}.field.description`},
  uid: { id: `${prefix}.field.uid`},
  measurementType: { id: `${prefix}.field.measurementType`},
  measurementTypePlaceholder: { id: `${prefix}.field.measurementType`},
  weight: { id: `${prefix}.field.weight`},
  weightPlaceholder: { id: `${prefix}.field.weight`},
  tooltip: { id: `${prefix}.field.tooltip`},
});

// dialog
export const KPIMeasurementDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
});

// helper
export const KPIMeasurementFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {

      default: return {id: field};
    }
  }

  return {id: field};
};
