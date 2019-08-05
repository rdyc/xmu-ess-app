import { defineMessages } from 'react-intl';

const prefix = 'kpi.template';

// page
export const KPITemplatePage = defineMessages({
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
export const KPITemplateMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

// submission
export const KPITemplateSubmission = defineMessages({
  form: { id: `${prefix}.submission.form` }
});

// dialog
export const KPITemplateDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
});

// section
export const KPITemplateSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  itemTitle: { id: `${prefix}.section.item.title` },
  itemSubHeader: { id: `${prefix}.section.item.subHeader` },
});

// confimation
export const KPITemplateConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` }
});

// fields
export const KPITemplateField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  companyUid: { id: `${prefix}.field.companyUid`},
  positionUid: { id: `${prefix}.field.positionUid`},
  name: { id: `${prefix}.field.name`},
  namePlaceholder: { id: `${prefix}.field.name.placeholder`},

  // item
  itemsMinimum: { id: `${prefix}.field.itemsMinimum`},
  itemUid: { id: `${prefix}.field.itemUid`},
  categoryUid: { id: `${prefix}.field.categoryUid`},
  categoryName: { id: `${prefix}.field.categoryName`},
  categoryNamePlaceholder: { id: `${prefix}.field.categoryName.placeholder`},
  measurementUid: { id: `${prefix}.field.measurementUid`},
  target: { id: `${prefix}.field.target`},
  targetPlaceholder: { id: `${prefix}.field.target.placeholder`},
  weight: { id: `${prefix}.field.weight`},
  weightPlaceholder: { id: `${prefix}.field.weight.placeholder`},
  threshold: { id: `${prefix}.field.threshold`},
  thresholdPlaceholder: { id: `${prefix}.field.threshold.placeholder`},
  amount: { id: `${prefix}.field.amount`},
  amountPlaceholder: { id: `${prefix}.field.amount.placeholder`},
});

// helper
export const KPITemplateFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return KPITemplateField.uid;
      case 'companyUid': return KPITemplateField.companyUid;
      case 'positionUid': return KPITemplateField.positionUid;
      case 'name': return KPITemplateField.name;

      case 'itemUid': return KPITemplateField.itemUid;
      case 'categoryUid': return KPITemplateField.categoryUid;
      case 'categoryName': return KPITemplateField.categoryName;
      case 'measurementUid': return KPITemplateField.measurementUid;
      case 'target': return KPITemplateField.target;
      case 'weight': return KPITemplateField.weight;
      case 'threshold': return KPITemplateField.threshold;
      case 'amount': return KPITemplateField.amount;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return KPITemplateField.name;

      case 'categoryName': return KPITemplateField.categoryNamePlaceholder;
      case 'target': return KPITemplateField.targetPlaceholder;
      case 'weight': return KPITemplateField.weightPlaceholder;
      case 'threshold': return KPITemplateField.thresholdPlaceholder;
      case 'amount': return KPITemplateField.amountPlaceholder;
      
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
