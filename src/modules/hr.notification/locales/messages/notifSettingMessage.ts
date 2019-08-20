import { defineMessages } from 'react-intl';

const prefix = 'hr.notification.setting';

// page
export const notifSettingPage = defineMessages({
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
export const notifSettingSubmission = defineMessages({
  form: { id: `${prefix}.submission.form` }
});

// confimation
export const notifSettingConfirm = defineMessages({
  newTitle: { id: `${prefix}.confirm.new.title` },
  newDescription: { id: `${prefix}.confirm.new.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` }
});

// section
export const notifSettingSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` }
});

// fields
export const notifSettingField = defineMessages({
  uid: { id: `${prefix}.field.uid` },
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder` },

  companyUid: { id: `${prefix}.field.companyUid` },
  companyUidRequired: { id: `${prefix}.field.companyUid.required` },
  companyUidPlaceholder: { id: `${prefix}.field.companyUid.placeholder` },

  templateUid: { id: `${prefix}.field.templateUid` },
  templateUidRequired: { id: `${prefix}.field.templateUid.required` },
  templateUidPlaceholder: { id: `${prefix}.field.templateUid.placeholder` },
  
  class: { id: `${prefix}.field.class` },
  classRequired: { id: `${prefix}.field.class.required` },
  classPlaceholder: { id: `${prefix}.field.class.placeholder` },
  
  subject: { id: `${prefix}.field.subject` },
  subjectRequired: { id: `${prefix}.field.subject.required` },
  subjectPlaceholder: { id: `${prefix}.field.subject.placeholder` },
  
  to: { id: `${prefix}.field.to` },
  toRequired: { id: `${prefix}.field.to.required` },
  toPlaceholder: { id: `${prefix}.field.to.placeholder` },

  cc: { id: `${prefix}.field.cc` },
  ccRequired: { id: `${prefix}.field.cc.required` },
  ccPlaceholder: { id: `${prefix}.field.cc.placeholder` }
});

export const notifSettingFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return notifSettingField.uid;
      case 'companyUid': return notifSettingField.companyUid;
      case 'templateUid': return notifSettingField.templateUid;
      case 'class': return notifSettingField.class;
      case 'subject': return notifSettingField.subject;
      case 'to': return notifSettingField.to;
      case 'cc': return notifSettingField.cc;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'companyUid': return notifSettingField.companyUid;
      case 'templateUid': return notifSettingField.templateUid;
      case 'class': return notifSettingField.classRequired;
      case 'subject': return notifSettingField.subjectRequired;
      case 'to': return notifSettingField.toRequired;
      case 'cc': return notifSettingField.ccRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return notifSettingField.uidPlaceholder;
      case 'companyUid': return notifSettingField.companyUidPlaceholder;
      case 'templateUid': return notifSettingField.templateUidPlaceholder;
      case 'class': return notifSettingField.classPlaceholder;
      case 'subject': return notifSettingField.subjectPlaceholder;
      case 'to': return notifSettingField.toPlaceholder;
      case 'cc': return notifSettingField.ccPlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const notifSettingMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` }
});