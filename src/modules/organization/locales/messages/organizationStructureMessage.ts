import { defineMessages } from 'react-intl';

const prefix = 'organization.structure';
// section
export const organizationStructurePage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },

  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
});

export const organizationStructureDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modify.title` },
  modifyDescription: { id: `${prefix}.dialog.modify.description` },
  deleteTitle: { id: `${prefix}.dialog.delete.title` },
  deleteDescription: { id: `${prefix}.dialog.delete.description` },
  createTitle: { id: `${prefix}.dialog.create.title` },
  createDescription: { id: `${prefix}.dialog.create.description` },
  editTitle: { id: `${prefix}.dialog.edit.title` },
  editDescription: { id: `${prefix}.dialog.edit.description` },
});

// section
export const organizationStructureSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title`},
  infoSubHeader: { id: `${prefix}.section.info.subHeader`},
  itemTitle: { id: `${prefix}.section.item.title`},
  itemSubHeader: { id: `${prefix}.section.item.subHeader`},
});

// option
export const organizationStructureText = defineMessages({
  draft: { id: `${prefix}.text.draft`},
  addItem: { id: `${prefix}.text.addItem`},
});

// fields
export const organizationStructureField = defineMessages({
  uid: { id: `${prefix}.field.uid`},

  positionUid: { id: `${prefix}.field.positionUid`},
  positionUidRequired: { id: `${prefix}.field.positionUid.required`},
  positionUidPlaceholder: { id: `${prefix}.field.positionUid.placeholder`},

  companyUid: { id: `${prefix}.field.companyUid`},
  companyUidRequired: { id: `${prefix}.field.companyUid.required`},
  companyUidPlaceholder: { id: `${prefix}.field.companyUid.placeholder`},
  
  description: { id: `${prefix}.field.description`},
  descriptionRequired: { id: `${prefix}.field.description.required`},
  descriptionPlaceholder: { id: `${prefix}.field.description.placeholder`},

  isExpired: { id: `${prefix}.field.isExpired`},
  isNotExpired: { id: `${prefix}.field.isNotExpired`},

  inactiveDate: { id: `${prefix}.field.inactiveDate`},
  inactiveDateRequired: { id: `${prefix}.field.inactiveDate.required`},
  inactiveDatePlaceholder: { id: `${prefix}.field.inactiveDate.placeholder`},

  start: { id: `${prefix}.field.start`},
  startRequired: { id: `${prefix}.field.start.required`},
  startPlaceholder: { id: `${prefix}.field.start.placeholder`},
  end: { id: `${prefix}.field.end`},
  endRequired: { id: `${prefix}.field.end.required`},
  endPlaceholder: { id: `${prefix}.field.end.placeholder`},

  reportTo: { id: `${prefix}.field.reportTo`},
  reportToRequired: { id: `${prefix}.field.reportTo.required`},
  reportToPlaceholder: { id: `${prefix}.field.reportTo.placeholder`},
});

export const organizationStructureFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return organizationStructureField.uid;
      case 'positionUid': return organizationStructureField.positionUid;
      case 'companyUid': return organizationStructureField.companyUid;
      case 'description': return organizationStructureField.description;
      case 'isExpired': return organizationStructureField.isExpired;
      case 'inactiveDate': return organizationStructureField.inactiveDate;
      case 'start': return organizationStructureField.start;
      case 'end': return organizationStructureField.end;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'positionUid': return organizationStructureField.positionUidRequired;
      case 'companyUid': return organizationStructureField.companyUidRequired;
      case 'inactiveDate': return organizationStructureField.inactiveDateRequired;
      case 'reportTo': return organizationStructureField.reportToRequired;
      case 'start': return organizationStructureField.startRequired;
      case 'end': return organizationStructureField.endRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'positionUid': return organizationStructureField.positionUidPlaceholder;
      case 'companyUid': return organizationStructureField.companyUidPlaceholder;
      case 'inactiveDate': return organizationStructureField.inactiveDatePlaceholder;
      case 'start': return organizationStructureField.startPlaceholder;
      case 'end': return organizationStructureField.endPlaceholder;
      case 'description': return organizationStructureField.descriptionPlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const organizationStructureMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.empty.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});