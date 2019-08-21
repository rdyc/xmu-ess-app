import { defineMessages } from 'react-intl';

const prefix = 'hr.notification.template';

// page
export const notifTemplatePage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` }
});

// page
/* export const projectAdministrationPage = defineMessages({
  listTitle: { id: `project.administration.page.list.title` },
  listSubHeader: { id: `project.administration.page.list.subHeader` },
}); */

// option
/* export const projectRegistrationOption = defineMessages({
  close: { id: `${prefix}.option.close` },
  reOpen: { id: `${prefix}.option.reOpen` },
  owner: { id: `${prefix}.option.owner` },
  hour: { id: `${prefix}.option.hour` },
  site: { id: `${prefix}.option.site` }
}); */

// submission
export const notifTemplateSubmission = defineMessages({
  form: { id: `${prefix}.submission.form` }
});

// confimation
export const notifTemplateConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` }
});

// section
export const notifTemplateSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  contentTitle: { id: `${prefix}.section.content.title` },
  contentSubHeader: { id: `${prefix}.section.content.subHeader` }
});

// fields
export const notifTemplateField = defineMessages({
  uid: { id: `${prefix}.field.uid` },
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder` },

  name: { id: `${prefix}.field.name` },
  nameRequired: { id: `${prefix}.field.name.required` },
  namePlaceholder: { id: `${prefix}.field.name.placeholder` },
  
  content: { id: `${prefix}.field.content` },
  contentRequired: { id: `${prefix}.field.content.required` },
  contentPlaceholder: { id: `${prefix}.field.content.placeholder` }
});

export const notifTemplateFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return notifTemplateField.uid;
      case 'name': return notifTemplateField.name;
      case 'content': return notifTemplateField.content;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return notifTemplateField.nameRequired;
      case 'content': return notifTemplateField.contentRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return notifTemplateField.uidPlaceholder;
      case 'name': return notifTemplateField.namePlaceholder;
      case 'content': return notifTemplateField.contentPlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const notifTemplateMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` }
});