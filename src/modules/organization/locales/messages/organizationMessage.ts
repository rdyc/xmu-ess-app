import {
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
    option: organizationStructureOption,
    message: organizationStructureMessage
  }
};