import { IOrganizationWorkflowStep } from '@organization/interfaces/IOrganizationWorkflowStep';

export interface IOrganizationWorkflow {
  steps:      IOrganizationWorkflowStep[];
  isApproval: boolean;
  isEditable: boolean;
}