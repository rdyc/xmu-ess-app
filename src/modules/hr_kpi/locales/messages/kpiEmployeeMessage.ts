import { defineMessages } from 'react-intl';

const prefix = 'kpi.employee';

// page
export const KPIEmployeePage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  listEmployeeTitle: { id: `${prefix}.page.list.employeeTitle` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },

  assignListTitle: { id: `${prefix}.page.assign.list.title` },
  assignListSubHeader: { id: `${prefix}.page.assign.list.subHeader` },
  assignDetailTitle: { id: `${prefix}.page.assign.detail.title` },
  assignDetailSubHeader: { id: `${prefix}.page.assign.detail.subHeader` },
  assignNewTitle: { id: `${prefix}.page.assign.new.title` },
  assignNewSubHeader: { id: `${prefix}.page.assign.new.subHeader` },
  assignModifyTitle: { id: `${prefix}.page.assign.modify.title` },
  assignModifySubHeader: { id: `${prefix}.page.assign.modify.subHeader` },
  
  approvalListTitle: { id: `${prefix}.page.approval.list.title` },
  approvalListSubHeader: { id: `${prefix}.page.approval.list.subHeader` },
  approvalDetailTitle: { id: `${prefix}.page.approval.detail.title` },
  approvalDetailSubHeader: { id: `${prefix}.page.approval.detail.subHeader` },

  managerListTitle: { id: `${prefix}.page.manager.list.title` },
  managerListSubHeader: { id: `${prefix}.page.manager.list.subHeader` },
  managerDetailTitle: { id: `${prefix}.page.manager.detail.title` },
  managerDetailSubHeader: { id: `${prefix}.page.manager.detail.subHeader` },
});

// message
export const KPIEmployeeMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  noAssign: { id: `${prefix}.message.noAssign` },
  approvalSuccess: { id: `${prefix}.message.approval.success` },
  approvalFailure: { id: `${prefix}.message.approval.failure` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createsSuccess: { id: `${prefix}.message.creates.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updatesSuccess: { id: `${prefix}.message.updates.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

// submission
export const KPIEmployeeSubmission = defineMessages({
  form: { id: `${prefix}.submission.form` },
  approvalForm: { id: `${prefix}.approval.form` },
});

// dialog
export const KPIEmployeeDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
  approvalTitle: { id: `${prefix}.dialog.approvalTitle`},
  approvalDescription: { id: `${prefix}.dialog.approvalDescription`},
  
  assignModifyTitle: { id: `${prefix}.dialog.assign.modifyTitle`},
  assignModifyDescription: { id: `${prefix}.dialog.assign.modifyDescription`},
  assignCreateTitle: { id: `${prefix}.dialog.assign.newTitle`},
  assignCreateDescription: { id: `${prefix}.dialog.assign.newDescription`},
});

// action
export const KPIEmployeeAction = defineMessages({
  actions: { id: `${prefix}.action.actions`},
  moveUp: { id: `${prefix}.action.moveUp`},
  moveDown: { id: `${prefix}.action.moveDown`},
});

// section
export const KPIEmployeeSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  itemTitle: { id: `${prefix}.section.item.title` },
  itemSubHeader: { id: `${prefix}.section.item.subHeader` },
  employeeTitle: { id: `${prefix}.section.employee.title` },
  employeeSubHeader: { id: `${prefix}.section.employee.subHeader` },
  approvalTitle: { id: `${prefix}.section.approval.title` },
  approvalSubHeader: { id: `${prefix}.section.approval.subHeader` },
});

// confimation
export const KPIEmployeeConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  finalDescription: { id: `${prefix}.confirm.final.description` },
  finalIsFinal: { id: `${prefix}.confirm.final.isFinal` }
});

// fields
export const KPIEmployeeField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},
  employeeUid: { id: `${prefix}.field.employeeUid`},
  templateUid: { id: `${prefix}.field.templateUid`},
  templateUidPlaceholder: { id: `${prefix}.field.templateUid.placeholder`},
  year: { id: `${prefix}.field.year`},
  latestAssignYear: { id: `${prefix}.field.latestAssignYear`},
  latestFinalYear: { id: `${prefix}.field.latestFinalYear`},
  yearPlaceholder: { id: `${prefix}.field.year.placeholder`},
  period: { id: `${prefix}.field.period`},
  periodMidYear: { id: `${prefix}.field.period.midYear`},
  periodFullYear: { id: `${prefix}.field.period.fullYear`},
  periodPlaceholder: { id: `${prefix}.field.period.placeholder`},
  totalScore: { id: `${prefix}.field.totalScore`},
  status: { id: `${prefix}.field.status`},
  isFinal: { id: `${prefix}.field.isFinal`},
  isNotAssigned: { id: `${prefix}.field.isNotAssigned`},
  isFinalTrue: { id: `${prefix}.field.isFinal.final`},
  isFinalSetTrue: { id: `${prefix}.field.isFinal.setFinal`},
  isFinalFalse: { id: `${prefix}.field.isFinal.pending`},
  isFinalSetFalse: { id: `${prefix}.field.isFinal.setPending`},
  revision: { id: `${prefix}.field.revision`},
  revisionPlaceholder: { id: `${prefix}.field.revision.placeholder`},
  sentAt: { id: `${prefix}.field.sentAt`},
  sentBy: { id: `${prefix}.field.sentBy`},
  totalWeight: { id: `${prefix}.field.totalWeight`},
  weightNot100: { id: `${prefix}.field.weightNot100`},
  completion: { id: `${prefix}.field.completion`},
  note: { id: `${prefix}.field.note`},
  notePlaceholder: { id: `${prefix}.field.note.placeholder`},
  kpiNotes: { id: `${prefix}.field.kpiNotes`},
  kpiNotesPlaceholder: { id: `${prefix}.field.kpiNotes.placeholder`},

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
  weightPercent: { id: `${prefix}.field.weightPercent`},
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
export const KPIEmployeeFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return KPIEmployeeField.uid;
      case 'employeeUid': return KPIEmployeeField.employeeUid;
      case 'year': return KPIEmployeeField.year;
      case 'period': return KPIEmployeeField.period;
      case 'totalScore': return KPIEmployeeField.totalScore;
      case 'isFinal': return KPIEmployeeField.isFinal;
      case 'revision': return KPIEmployeeField.revision;
      case 'totalWeight': return KPIEmployeeField.totalWeight;
      case 'note': return KPIEmployeeField.note;
      case 'kpiNotes': return KPIEmployeeField.kpiNotes;

      case 'itemUid': return KPIEmployeeField.itemUid;
      case 'categoryUid': return KPIEmployeeField.categoryUid;
      case 'categoryName': return KPIEmployeeField.categoryName;
      case 'measurementUid': return KPIEmployeeField.measurementUid;
      case 'measurementDescription': return KPIEmployeeField.measurementDescription;
      case 'target': return KPIEmployeeField.target;
      case 'weight': return KPIEmployeeField.weight;
      case 'threshold': return KPIEmployeeField.threshold;
      case 'amount': return KPIEmployeeField.amount;
      case 'achieved': return KPIEmployeeField.achieved;
      case 'progress': return KPIEmployeeField.progress;
      case 'score': return KPIEmployeeField.score;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return KPIEmployeeField.uidPlaceholder;
      case 'year': return KPIEmployeeField.yearPlaceholder;
      case 'period': return KPIEmployeeField.periodPlaceholder;
      case 'revision': return KPIEmployeeField.revisionPlaceholder;
      case 'note': return KPIEmployeeField.notePlaceholder;
      case 'kpiNotes': return KPIEmployeeField.kpiNotesPlaceholder;

      case 'categoryUid': return KPIEmployeeField.categoryUidPlaceholder;
      case 'measurementUid': return KPIEmployeeField.measurementUidPlaceholder;
      case 'categoryName': return KPIEmployeeField.categoryNamePlaceholder;
      case 'measurementDescription': return KPIEmployeeField.measurementDescriptionPlaceholder;
      case 'target': return KPIEmployeeField.targetPlaceholder;
      case 'weight': return KPIEmployeeField.weightPlaceholder;
      case 'threshold': return KPIEmployeeField.thresholdPlaceholder;
      case 'amount': return KPIEmployeeField.amountPlaceholder;
      case 'achieved': return KPIEmployeeField.achievedPlaceholder;
      
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
