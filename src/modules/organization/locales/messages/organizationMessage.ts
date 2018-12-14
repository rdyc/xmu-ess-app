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
  organizationStructureDialog,
  organizationStructureField,
  organizationStructureFieldHelperFor,
  organizationStructureMessage,
  organizationStructureOption,
  organizationStructurePage,
  organizationStructureSection,
} from './organizationStructureMessage';
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
  structure: {
    page: organizationStructurePage,
    section: organizationStructureSection,
    field: organizationStructureField,
    fieldFor: organizationStructureFieldHelperFor,
    dialog: organizationStructureDialog,
    option: organizationStructureOption,
    message: organizationStructureMessage
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