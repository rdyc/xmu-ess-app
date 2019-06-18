import { defineMessages } from 'react-intl';

const prefix = 'workflow.approval';

// section
export const organizationWorkflowSection = defineMessages({
  historyTitle: { id: `${prefix}.section.history.title`},
  historySubHeader: { id: `${prefix}.section.history.subHeader`},
});

// option
export const organizationWorkflowOption = defineMessages({
  approve: { id: `${prefix}.option.approve`},
  accept: { id: `${prefix}.option.accept`},
  reject: { id: `${prefix}.option.reject`},
});

// fields
export const organizationWorkflowField = defineMessages({
  statusType: { id: `${prefix}.field.statusType`},
  statusTypeRequired: { id: `${prefix}.field.statusType.required`},
  statusTypePlaceholder: { id: `${prefix}.field.statusType.placeholder`},

  remark: { id: `${prefix}.field.remark`},
  remarkRequired: { id: `${prefix}.field.remark.required`},
  remarkPlaceholder: { id: `${prefix}.field.remark.placeholder`},

  itemRequired: { id: `${prefix}.field.item.required`},
});

export const organizationWorkflowFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'statusType': return organizationWorkflowField.statusType;
      case 'remark': return organizationWorkflowField.remark;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'statusType': return organizationWorkflowField.statusTypeRequired;
      case 'remark': return organizationWorkflowField.remarkRequired;
      case 'item': return organizationWorkflowField.itemRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'statusType': return organizationWorkflowField.statusTypePlaceholder;
      case 'remark': return organizationWorkflowField.remarkPlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const organizationWorkflowMessage = defineMessages({
  emptyHistory: { id: `${prefix}.history.empty`}
});