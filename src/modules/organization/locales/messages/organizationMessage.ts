import { 
  workflowHierarchyDialog, 
  workflowHierarchyField, 
  workflowHierarchyFieldHelperFor, 
  workflowHierarchyMessage, 
  workflowHierarchyPage, 
  workflowHierarchySection,
  workflowHierarchyText, 
} from './organizationHierarchyMessage';
import {
  organizationWorkflowField,
  organizationWorkflowFieldHelperFor,
  organizationWorkflowMessage,
  organizationWorkflowOption,
  organizationWorkflowSection,
} from './organizationWorkflowMessage';

export const organizationMessage = {
  workflow: {
    section: organizationWorkflowSection,
    field: organizationWorkflowField,
    fieldFor: organizationWorkflowFieldHelperFor,
    option: organizationWorkflowOption,
    message: organizationWorkflowMessage
  },
  hierarchy: {
    message: workflowHierarchyMessage,
    page: workflowHierarchyPage,
    section: workflowHierarchySection,
    dialog: workflowHierarchyDialog,
    text: workflowHierarchyText,
    field: workflowHierarchyField,
    fieldFor: workflowHierarchyFieldHelperFor
  }
};