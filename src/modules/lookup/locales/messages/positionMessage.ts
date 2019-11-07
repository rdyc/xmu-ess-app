import { defineMessages } from 'react-intl';

const prefix = 'lookup.position';

// message
export const positionMessage = defineMessages({
  emptyPositionUid: { id: `${prefix}.message.empty.positionUid` },
  emptyCompanyUid: { id: `${prefix}.message.empty.companyUid` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});

// dialog
export const positionDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle` },
  modifyDescription: { id: `${prefix}.dialog.modifyDescription` },
  createTitle: { id: `${prefix}.dialog.newTitle` },
  createDescription: { id: `${prefix}.dialog.newDescription` },
});

// page
export const positionPage = defineMessages({
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
});

// section
export const positionSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
});

// form
export const positionForm = defineMessages({
  newTitle: { id: `${prefix}.form.newTitle` },
  newSubTitle: { id: `${prefix}.form.newSubTitle` },
  editTitle: { id: `${prefix}.form.editTitle` },
  editSubTitle: { id: `${prefix}.form.editSubTitle` },
});

// confirmation
export const positionConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` },
});

// field
export const positionField = defineMessages({
  uid: { id: `${prefix}.field.uid` },
  name: { id: `${prefix}.field.name` },
  nameRequired: { id: `${prefix}.field.name.required` },
  namePlaceholder: { id: `${prefix}.field.name.placeholder` },
  companyUid: { id: `${prefix}.field.companyUid` },
  companyUidRequired: { id: `${prefix}.field.companyUid.required` },
  companyUidPlaceholder: { id: `${prefix}.field.companyUid.placeholder` },
  description: { id: `${prefix}.field.description` },
  descriptionPlaceholder: { id: `${prefix}.field.description.placeholder` },
  isAllowMultiple: { id: `${prefix}.field.isAllowMultiple` },
  isAllowed: { id: `${prefix}.field.isAllowMultiple.allow` },
  isNotAllowed: { id: `${prefix}.field.isAllowMultiple.notAllowed` },
  inactiveDate: { id: `${prefix}.field.inactiveDate` },
  indefinitely: { id: `${prefix}.field.inactiveDate.indefinitely` },
  inactiveDateRequired: { id: `${prefix}.field.inactiveDate.required` },
  inactiveDatePlaceholder: { id: `${prefix}.field.inactiveDate.placeholder` },
  expireStatus: { id: `${prefix}.field.isExpired` },
  isExpired: { id: `${prefix}.field.isExpired.isExpired` },
  isNotExpired: { id: `${prefix}.field.isExpired.isNotExpired` },
  createdBy: { id: `${prefix}.field.createdBy`}
});

export const positionFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return positionField.uid;
      case 'name': return positionField.name;
      case 'companyUid': return positionField.companyUid;
      case 'description': return positionField.description;
      case 'inactiveDate': return positionField.inactiveDate;
      case 'isAllowMultiple': return positionField.isAllowMultiple;
      case 'isExpired': return positionField.expireStatus;
      default: return { id: field };
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return positionField.nameRequired;
      case 'companyUid': return positionField.companyUidRequired;
      case 'name': return positionField.nameRequired;

      default: return { id: field };
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'name': return positionField.namePlaceholder;
      case 'companyUid': return positionField.companyUidPlaceholder;
      case 'description': return positionField.descriptionPlaceholder;
      case 'inactiveDate': return positionField.inactiveDatePlaceholder;
      
      default: return { id: field };
    }
  }

  return { id: field };
};