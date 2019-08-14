import { defineMessages } from 'react-intl';

const prefix = 'kpi.employee';

// page
export const EmployeeKPIPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
  newWizardTitle: { id: `${prefix}.page.newWizard.title` },
  newWizardSubHeader: { id: `${prefix}.page.newWizard.subHeader` },
  inputTitle: { id: `${prefix}.page.input.title` },
  inputSubHeader: { id: `${prefix}.page.input.subHeader` },
});

// message
export const EmployeeKPIMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createsSuccess: { id: `${prefix}.message.creates.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updatesSuccess: { id: `${prefix}.message.updates.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

// submission
export const EmployeeKPISubmission = defineMessages({
  form: { id: `${prefix}.submission.form` }
});

// dialog
export const EmployeeKPIDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
});

// section
export const EmployeeKPISection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  itemTitle: { id: `${prefix}.section.item.title` },
  itemSubHeader: { id: `${prefix}.section.item.subHeader` },
});

// confimation
export const EmployeeKPIConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` }
});

// fields
export const EmployeeKPIField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},
  employeeUid: { id: `${prefix}.field.employeeUid`},
  year: { id: `${prefix}.field.year`},
  yearPlaceholder: { id: `${prefix}.field.year.placeholder`},
  period: { id: `${prefix}.field.period`},
  periodPlaceholder: { id: `${prefix}.field.period.placeholder`},
  isFinal: { id: `${prefix}.field.isFinal`},
  isFinalTrue: { id: `${prefix}.field.isFinal.final`},
  isFinalFalse: { id: `${prefix}.field.isFinal.pending`},
  revision: { id: `${prefix}.field.revision`},
  revisionPlaceholder: { id: `${prefix}.field.revision.placeholder`},
  sentAt: { id: `${prefix}.field.sentAt`},
  sentBy: { id: `${prefix}.field.sentBy`},
  totalWeight: { id: `${prefix}.field.totalWeight`},

  // item
  itemsMinimum: { id: `${prefix}.field.itemsMinimum`},
  itemUid: { id: `${prefix}.field.itemUid`},
  categoryUid: { id: `${prefix}.field.categoryUid`},
  categoryUidPlaceholder: { id: `${prefix}.field.categoryUid.placeholder`},
  categoryName: { id: `${prefix}.field.categoryName`},
  categoryNamePlaceholder: { id: `${prefix}.field.categoryName.placeholder`},
  measurementUid: { id: `${prefix}.field.measurementUid`},
  measurementUidPlaceholder: { id: `${prefix}.field.measurementUid.placeholder`},
  measurementDescription: { id: `${prefix}.field.measurementDescription`},
  measurementDescriptionPlaceholder: { id: `${prefix}.field.measurementDescription.placeholder`},
  target: { id: `${prefix}.field.target`},
  targetPlaceholder: { id: `${prefix}.field.target.placeholder`},
  weight: { id: `${prefix}.field.weight`},
  weightPlaceholder: { id: `${prefix}.field.weight.placeholder`},
  threshold: { id: `${prefix}.field.threshold`},
  thresholdPlaceholder: { id: `${prefix}.field.threshold.placeholder`},
  amount: { id: `${prefix}.field.amount`},
  amountPlaceholder: { id: `${prefix}.field.amount.placeholder`},
  achieved: { id: `${prefix}.field.achieved`},
  achievedPlaceholder: { id: `${prefix}.field.achieved.placeholder`},
  progress: { id: `${prefix}.field.progress`},
  score: { id: `${prefix}.field.score`},
});

// helper
export const EmployeeKPIFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return EmployeeKPIField.uid;
      case 'employeeUid': return EmployeeKPIField.employeeUid;
      case 'year': return EmployeeKPIField.year;
      case 'period': return EmployeeKPIField.period;
      case 'isFinal': return EmployeeKPIField.isFinal;
      case 'revision': return EmployeeKPIField.revision;
      case 'totalWeight': return EmployeeKPIField.totalWeight;

      case 'itemUid': return EmployeeKPIField.itemUid;
      case 'categoryUid': return EmployeeKPIField.categoryUid;
      case 'categoryName': return EmployeeKPIField.categoryName;
      case 'measurementUid': return EmployeeKPIField.measurementUid;
      case 'measurementDescription': return EmployeeKPIField.measurementDescription;
      case 'target': return EmployeeKPIField.target;
      case 'weight': return EmployeeKPIField.weight;
      case 'threshold': return EmployeeKPIField.threshold;
      case 'amount': return EmployeeKPIField.amount;
      case 'achieved': return EmployeeKPIField.achieved;
      case 'progress': return EmployeeKPIField.progress;
      case 'score': return EmployeeKPIField.score;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return EmployeeKPIField.uidPlaceholder;
      case 'year': return EmployeeKPIField.yearPlaceholder;
      case 'period': return EmployeeKPIField.periodPlaceholder;
      case 'revision': return EmployeeKPIField.revisionPlaceholder;

      case 'categoryUid': return EmployeeKPIField.categoryUidPlaceholder;
      case 'measurementUid': return EmployeeKPIField.measurementUidPlaceholder;
      case 'categoryName': return EmployeeKPIField.categoryNamePlaceholder;
      case 'measurementDescription': return EmployeeKPIField.measurementDescriptionPlaceholder;
      case 'target': return EmployeeKPIField.targetPlaceholder;
      case 'weight': return EmployeeKPIField.weightPlaceholder;
      case 'threshold': return EmployeeKPIField.thresholdPlaceholder;
      case 'amount': return EmployeeKPIField.amountPlaceholder;
      case 'achieved': return EmployeeKPIField.achievedPlaceholder;
      
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {

      default: return {id: field};
    }
  }

  return {id: field};
};
