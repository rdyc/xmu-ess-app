import { IOrganizationWorkflowListFilter } from '@organization/classes/filters/workflow';

export interface IOrganizationWorkflowListRequest {
  readonly filter?: IOrganizationWorkflowListFilter | undefined;
}