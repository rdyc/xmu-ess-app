import { defineMessages } from 'react-intl';

const prefix = 'hr.template';

// page
export const hrTemplatePage = defineMessages({
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
export const hrTemplateMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

// submission
export const hrTemplateSubmission = defineMessages({
  form: { id: `${prefix}.submission.form` }
});

// dialog
export const hrTemplateDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
});

// section
export const hrTemplateSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  itemTitle: { id: `${prefix}.section.item.title` },
  itemSubHeader: { id: `${prefix}.section.item.subHeader` },
});

// confimation
export const hrTemplateConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` }
});

// fields
export const hrTemplateField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  company: { id: `${prefix}.field.company`},
  position: { id: `${prefix}.field.position`},

  // item
  itemUid: { id: `${prefix}.field.itemUid`},
  measurementUid: { id: `${prefix}.field.measurementUid`},
  itemsMinimum: { id: `${prefix}.field.itemsMinimum`},
  target: { id: `${prefix}.field.target`},
  category: { id: `${prefix}.field.category`},
  weight: { id: `${prefix}.field.weight`},
});

// helper
export const hrTemplateFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
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
