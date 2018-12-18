import { defineMessages } from 'react-intl';

const prefix = 'lookup.role';

// page
export const rolePage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
});

// confirmation
export const roleConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  // closeTitle: { id: `${prefix}.confirm.close.title` },
  // closeDescription: { id: `${prefix}.confirm.close.description` },
});

// section
export const roleSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  roleMenuTitle: { id: `${prefix}.section.roleMenu.title` },
  roleMenuSubHeader: { id: `${prefix}.section.roleMenu.subHeader` },
});

export const roleDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
});

// fields
export const roleField = defineMessages({
  uid: {id: `${prefix}.field.uid`},
  uidPlaceholder: {id: `${prefix}.field.uid.placeholder`},

  companyUid: {id: `${prefix}.field.companyUid`},
  companyUidRequired: {id: `${prefix}.field.companyUid.required`},
  companyUidPlaceholder: {id: `${prefix}.field.companyUid.placeholder`},
  
  name: {id: `${prefix}.field.name`},
  nameRequired: {id: `${prefix}.field.name.required`},
  namePlaceholder: {id: `${prefix}.field.name.placeholder`},
  
  gradeType: {id: `${prefix}.field.gradeType`},
  gradeTypeRequired: {id: `${prefix}.field.gradeType.required`},
  gradeTypePlaceholder: {id: `${prefix}.field.gradeType.placeholder`},
  
  isActive: {id: `${prefix}.field.isActive`},
  isActiveRequired: {id: `${prefix}.field.isActive.required`},
  isActivePlaceholder: {id: `${prefix}.field.isActive.placeholder`},
  
  description: {id: `${prefix}.field.description`},
  descriptionRequired: {id: `${prefix}.field.description.required`},
  descriptionPlaceholder: {id: `${prefix}.field.description.placeholder`},
});

export const roleFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return roleField.uid;
      case 'companyUid': return roleField.companyUid;
      case 'name': return roleField.name;
      case 'gradeType': return roleField.gradeType;
      case 'isActive': return roleField.isActive;
      case 'description': return roleField.description;
          
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'companyUid': return roleField.companyUidRequired;
      case 'name': return roleField.nameRequired;
      case 'gradeType': return roleField.gradeTypeRequired;
      case 'description': return roleField.descriptionRequired;
      case 'isActive': return roleField.isActiveRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return roleField.uidPlaceholder;
      case 'companyUid': return roleField.companyUidPlaceholder;
      case 'name': return roleField.namePlaceholder;
      case 'gradeType': return roleField.gradeTypePlaceholder;
      case 'isActive': return roleField.isActivePlaceholder;
      case 'description': return roleField.descriptionPlaceholder;
      
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const roleMessage = defineMessages({
  emptyRoleUid: { id: `${prefix}.message.empty.roleUid` },
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});