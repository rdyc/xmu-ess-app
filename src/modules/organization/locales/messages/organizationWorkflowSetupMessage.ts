import { defineMessages } from 'react-intl';

const prefix = 'organization.workflow';

// page
export const organizationWorkflowSetupPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },

  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
});

export const organizationWorkflowSetupDialog = defineMessages({
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
export const organizationWorkflowSetupSection = defineMessages({
  menuTitle: { id: `${prefix}.section.menu.title`},
  menuSubHeader: { id: `${prefix}.section.menu.subHeader`},
  hierarchyTitle: { id: `${prefix}.section.hierarchy.title`},
  hierarchySubHeader: { id: `${prefix}.section.hierarchy.subHeader`},
});

// option
export const organizationWorkflowSetupOption = defineMessages({
  modify: { id: `${prefix}.option.modify`},
  remove: { id: `${prefix}.option.remove`},
});

// fields
export const organizationWorkflowSetupField = defineMessages({
  uid: { id: `${prefix}.field.uid`},

  menuUid: { id: `${prefix}.field.menuUid`},
  menuName: { id: `${prefix}.field.menuUid`},
  menuUidRequired: { id: `${prefix}.field.menuUid.required`},
  menuUidPlaceholder: { id: `${prefix}.field.menuUid.placeholder`},

  hierarchyUid: { id: `${prefix}.field.hierarchyUid`},
  hierarchyUidRequired: { id: `${prefix}.field.hierarchyUid.required`},
  hierarchyUidPlaceholder: { id: `${prefix}.field.hierarchyUid.placeholder`},
  
  priority: { id: `${prefix}.field.priority`},
  priorityRequired: { id: `${prefix}.field.priority.required`},
  priorityPlaceholder: { id: `${prefix}.field.priority.placeholder`},

});

export const organizationStructureFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return organizationWorkflowSetupField.uid;
      case 'menuUid': return organizationWorkflowSetupField.menuUid;
      case 'hierarchyUid': return organizationWorkflowSetupField.hierarchyUid;
      case 'priority': return organizationWorkflowSetupField.priority;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'menuUid': return organizationWorkflowSetupField.menuUidRequired;
      case 'hierarchyUid': return organizationWorkflowSetupField.hierarchyUidRequired;
      case 'priority': return organizationWorkflowSetupField.priorityRequired;
  
      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'menuUid': return organizationWorkflowSetupField.menuUidPlaceholder;
      case 'hierarchyUid': return organizationWorkflowSetupField.hierarchyUidPlaceholder;
      case 'priority': return organizationWorkflowSetupField.priorityPlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const organizationWorkflowSetupMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.empty.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});