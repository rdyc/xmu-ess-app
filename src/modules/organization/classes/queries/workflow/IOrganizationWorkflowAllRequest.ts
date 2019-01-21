import { IOrganizationWorkflowAllFilter } from '@organization/classes/filters/workflow';

export interface IOrganizationWorkflowAllRequest {
  readonly filter?: IOrganizationWorkflowAllFilter | undefined;
}