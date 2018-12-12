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
  modifyTitle: { id: `${prefix}.dialog.modify.title` },
  modifyDescription: { id: `${prefix}.dialog.modify.description` },
  deleteTitle: { id: `${prefix}.dialog.delete.title` },
  deleteDescription: { id: `${prefix}.dialog.delete.description` },
  createTitle: { id: `${prefix}.dialog.create.title` },
  createDescription: { id: `${prefix}.dialog.create.description` },
  editTitle: { id: `${prefix}.dialog.create.title` },
  editDescription: { id: `${prefix}.dialog.create.description` },
});

// text
export const workflowHierarchyText = defineMessages({
  submitter: {id: `${prefix}.text.submitter`},
  draft: {id: `${prefix}.text.draft`},
  addItem: {id: `${prefix}.text.addItem`}
});

// field
export const workflowHierarchyField = defineMessages({
  uid: { id: `${fieldPrefix}.uid` },
  
  name: {id: `${fieldPrefix}.name`},
  namePlaceholder: {id: `${fieldPrefix}.name.placeholder`},
  nameRequired: {id: `${fieldPrefix}.name.required`},
  
  companyUid: {id: `${fieldPrefix}.companyUid`},
  companyUidPlaceholder: {id: `${fieldPrefix}.companyUid.placeholder`},
  companyUidRequired: {id: `${fieldPrefix}.companyUid.required`},
  
  inactiveDate: {id: `${fieldPrefix}.inactiveDate`},
  inactiveDatePlaceholder: {id: `${fieldPrefix}.inactiveDate.placeholder`},
  
  description: {id: `${fieldPrefix}.description`},
  descriptionPlaceholder: {id: `${fieldPrefix}.description.placeholder`},
  descriptionRequired: {id: `${fieldPrefix}.description.required`},

  sequence: {id: `${fieldPrefix}.sequence`},
  sequencePlaceholder: {id: `${fieldPrefix}.sequence.placeholder`},
  sequenceRequired: {id: `${fieldPrefix}.sequence.required`},
  
  positionUid: {id: `${fieldPrefix}.positionUid`},
  positionUidPlaceholder: {id: `${fieldPrefix}.positionUid.placeholder`},
  positionUidRequired: {id: `${fieldPrefix}.positionUid.required`},
  
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
      case 'sequence': return workflowHierarchyField.sequenceRequired;
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
      case 'sequence': return workflowHierarchyField.sequencePlaceholder;
      case 'positionUid': return workflowHierarchyField.positionUidPlaceholder;
      case 'relationType': return workflowHierarchyField.relationTypePlaceholder;
      
      default: return { id: field };
    }
  }

  return { id: field };
};