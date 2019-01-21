import { IBasePayload } from '@generic/interfaces';
import { IOrganizationWorkflowPostHierarchy } from './IOrganizationWorkflowPostHierarchy';

export interface IOrganizationWorkflowPostPayload extends IBasePayload {
  hierarchies: IOrganizationWorkflowPostHierarchy[];
}