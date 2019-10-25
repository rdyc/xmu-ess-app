import { defineMessages } from 'react-intl';

const prefix = 'kpi.open';

// page
export const KPIOpenPage = defineMessages({
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
export const KPIOpenMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});

// submission
export const KPIOpenSubmission = defineMessages({
  form: { id: `${prefix}.submission.form` }
});

// section
export const KPIOpenSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
});

// confimation
export const KPIOpenConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` },
});

// fields
export const KPIOpenField = defineMessages({
  year: { id: `${prefix}.field.year`},
  yearPlaceholder: { id: `${prefix}.field.year.placeholder`},
  yearRequired: { id: `${prefix}.field.year.required`},
  period: { id: `${prefix}.field.period`},
  periodRequired: { id: `${prefix}.field.period.required`},
  date: { id: `${prefix}.field.date`},
  datePlaceholder: { id: `${prefix}.field.date.placeholder`},
  dateRequired: { id: `${prefix}.field.date.required`},
  uid: { id: `${prefix}.field.uid`},
});

// dialog
export const KPIOpenDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
});

// helper
export const KPIOpenFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return KPIOpenField.uid; 
      case 'year': return KPIOpenField.year;
      case 'period': return KPIOpenField.period;
      case 'date': return KPIOpenField.date;
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'year': return KPIOpenField.yearRequired;
      case 'period': return KPIOpenField.periodRequired;
      case 'date': return KPIOpenField.dateRequired;
      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'name': return KPIOpenField.yearPlaceholder;
      case 'date': return KPIOpenField.datePlaceholder;
      default: return {id: field};
    }
  }

  return {id: field};
};
