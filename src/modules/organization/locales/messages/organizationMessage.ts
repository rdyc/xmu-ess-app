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
  organizationStructurePage,
  organizationStructureSection,
  organizationStructureText,
} from './organizationStructureMessage';
import {
  organizationWorkflowField,
  organizationWorkflowFieldHelperFor,
  organizationWorkflowMessage,
  organizationWorkflowOption,
  organizationWorkflowSection,
} from './organizationWorkflowMessage';
import { 
  organizationWorkflowSetupDialog, 
  organizationWorkflowSetupField, 
  organizationWorkflowSetupMessage, 
  organizationWorkflowSetupOption, 
  organizationWorkflowSetupPage,
  organizationWorkflowSetupSection
} from './organizationWorkflowSetupMessage';

export const organizationMessage = {
  workflow: {
    section: organizationWorkflowSection,
    field: organizationWorkflowField,
    fieldFor: organizationWorkflowFieldHelperFor,
    option: organizationWorkflowOption,
    message: organizationWorkflowMessage
  },
  workflowSetup: {
    page: organizationWorkflowSetupPage,
    section: organizationWorkflowSetupSection,
    option: organizationWorkflowSetupOption,
    field: organizationWorkflowSetupField,
    dialog: organizationWorkflowSetupDialog,
    message: organizationWorkflowSetupMessage
  },
  structure: {
    page: organizationStructurePage,
    section: organizationStructureSection,
    field: organizationStructureField,
    fieldFor: organizationStructureFieldHelperFor,
    dialog: organizationStructureDialog,
    text: organizationStructureText,
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