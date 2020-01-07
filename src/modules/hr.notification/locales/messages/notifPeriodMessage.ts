import { defineMessages } from 'react-intl';

const prefix = 'hr.notification.period';

// page
export const notifPeriodPage = defineMessages({
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
export const notifPeriodSubmission = defineMessages({
  form: { id: `${prefix}.submission.form` }
});

// confimation
export const notifPeriodConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` }
});

// section
export const notifPeriodSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` }
});

// fields
export const notifPeriodField = defineMessages({
  uid: { id: `${prefix}.field.uid` },
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder` },

  name: { id: `${prefix}.field.name` },
  nameRequired: { id: `${prefix}.field.name.required` },
  namePlaceholder: { id: `${prefix}.field.name.placeholder` },
  
  type: { id: `${prefix}.field.type` },
  typeRequired: { id: `${prefix}.field.type.required` },
  typePlaceholder: { id: `${prefix}.field.type.placeholder` },
  
  range: { id: `${prefix}.field.range` },
  rangeRequired: { id: `${prefix}.field.range.required` },
  rangePlaceholder: { id: `${prefix}.field.range.placeholder` },

  from: { id: `${prefix}.field.from` },
  fromRequired: { id: `${prefix}.field.from.required` },
  fromPlaceholder: { id: `${prefix}.field.from.placeholder` },
  
  to: { id: `${prefix}.field.to` },
  toRequired: { id: `${prefix}.field.to.required` },
  toPlaceholder: { id: `${prefix}.field.to.placeholder` },
});

export const notifPeriodFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return notifPeriodField.uid;
      case 'name': return notifPeriodField.name;
      case 'type': return notifPeriodField.type;
      case 'range': return notifPeriodField.range;
      case 'from': return notifPeriodField.from;
      case 'to': return notifPeriodField.to;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return notifPeriodField.nameRequired;
      case 'type': return notifPeriodField.typeRequired;
      case 'range': return notifPeriodField.rangeRequired;
      case 'from': return notifPeriodField.fromRequired;
      case 'to': return notifPeriodField.toRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return notifPeriodField.uidPlaceholder;
      case 'name': return notifPeriodField.namePlaceholder;
      case 'type': return notifPeriodField.typePlaceholder;
      case 'range': return notifPeriodField.rangePlaceholder;
      case 'from': return notifPeriodField.fromPlaceholder;
      case 'to': return notifPeriodField.toPlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const notifPeriodMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` }
});