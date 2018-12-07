import { defineMessages } from 'react-intl';

const prefix = 'organization.hierarchy';
const fieldPrefix = `${prefix}.field`;

// message
export const workflowHierarchyMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.empty.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});

// page
export const workflowHierarchyPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
});

// section
export const workflowHierarchySection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  historyTitle: { id: `${prefix}.section.history.title` },
  historySubHeader: { id: `${prefix}.section.history.subHeader` },
});

// dialog
export const workflowHierarchyDialog = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` },
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.description` },
  editTitle: { id: `${prefix}.confirm.create.title` },
  editDescription: { id: `${prefix}.confirm.create.description` },
});

// field
export const workflowHierarchyField = defineMessages({
  uid: { id: `${fieldPrefix}.uid` },
  
  name: {id: `${fieldPrefix}.name`},
  namePlaceholder: {id: `${fieldPrefix}.name.placeholder`},
  nameRequired: {id: `${fieldPrefix}.name.Required`},
  
  companyUid: {id: `${fieldPrefix}.companyUid`},
  companyUidPlaceholder: {id: `${fieldPrefix}.companyUid.placeholder`},
  companyUidRequired: {id: `${fieldPrefix}.companyUid.Required`},
  
  inactiveDate: {id: `${fieldPrefix}.inactiveDate`},
  inactiveDatePlaceholder: {id: `${fieldPrefix}.inactiveDate.placeholder`},
  
  description: {id: `${fieldPrefix}.description`},
  descriptionPlaceholder: {id: `${fieldPrefix}.description.placeholder`},
  descriptionRequired: {id: `${fieldPrefix}.description.Required`},

  sequence: {id: `${fieldPrefix}.sequence`},
  
  positionUid: {id: `${fieldPrefix}.positionUid`},
  positionUidPlaceholder: {id: `${fieldPrefix}.positionUid.placeholder`},
  positionUidRequired: {id: `${fieldPrefix}.positionUid.Required`},
  
  relationType: {id: `${fieldPrefix}.relationType`},
  relationTypePlaceholder: {id: `${fieldPrefix}.relationType.placeholder`},
});

export const workflowHierarchyFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return workflowHierarchyField.uid;
      case 'name': return workflowHierarchyField.name;
      case 'companyUid': return workflowHierarchyField.companyUid;
      case 'inactiveDate': return workflowHierarchyField.inactiveDate;
      case 'description': return workflowHierarchyField.description;
      case 'sequence': return workflowHierarchyField.sequence;
      case 'positionUid': return workflowHierarchyField.positionUid;
      case 'relationType': return workflowHierarchyField.relationType;

      default: return { id: field };
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return workflowHierarchyField.nameRequired;
      case 'name': return workflowHierarchyField.nameRequired;
      case 'companyUid': return workflowHierarchyField.companyUidRequired;
      case 'description': return workflowHierarchyField.descriptionRequired;
      case 'positionUid': return workflowHierarchyField.positionUidRequired;

      default: return { id: field };
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'name': return workflowHierarchyField.namePlaceholder;
      case 'companyUid': return workflowHierarchyField.companyUidPlaceholder;
      case 'inactiveDate': return workflowHierarchyField.inactiveDatePlaceholder;
      case 'description': return workflowHierarchyField.descriptionPlaceholder;
      case 'positionUid': return workflowHierarchyField.positionUidPlaceholder;
      case 'relationType': return workflowHierarchyField.relationTypePlaceholder;
      
      default: return { id: field };
    }
  }

  return { id: field };
};