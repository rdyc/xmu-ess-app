import { defineMessages } from 'react-intl';

const prefix = 'organization.structure';
// section
export const organizationStructurePage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
});

export const organizationStructureDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modify.title` },
  modifyDescription: { id: `${prefix}.dialog.modify.description` },
  deleteTitle: { id: `${prefix}.dialog.delete.title` },
  deleteDescription: { id: `${prefix}.dialog.delete.description` },
  createTitle: { id: `${prefix}.dialog.create.title` },
  createDescription: { id: `${prefix}.dialog.create.description` },
  editTitle: { id: `${prefix}.dialog.create.title` },
  editDescription: { id: `${prefix}.dialog.create.description` },
});
// section
export const organizationStructureSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title`},
  infoSubHeader: { id: `${prefix}.section.info.subHeader`},
  itemTitle: { id: `${prefix}.section.item.title`},
  itemSubHeader: { id: `${prefix}.section.item.subHeader`},
});

// option
export const organizationStructureOption = defineMessages({
  approve: { id: `${prefix}.option.approve`},
  accept: { id: `${prefix}.option.accept`},
  reject: { id: `${prefix}.option.reject`},
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

  remark: { id: `${prefix}.field.remark`},
  remarkRequired: { id: `${prefix}.field.remark.required`},
  remarkPlaceholder: { id: `${prefix}.field.remark.placeholder`},

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
      case 'remark': return organizationStructureField.remark;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'positionUid': return organizationStructureField.positionUidRequired;
      case 'companyUid': return organizationStructureField.companyUidRequired;
      case 'remark': return organizationStructureField.remarkRequired;
      case 'reportTo': return organizationStructureField.reportToRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'positionUid': return organizationStructureField.positionUidPlaceholder;
      case 'companyUid': return organizationStructureField.companyUidPlaceholder;
      case 'remark': return organizationStructureField.remarkPlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const organizationStructureMessage = defineMessages({
  emptyHistory: { id: `${prefix}.history.empty`}
});