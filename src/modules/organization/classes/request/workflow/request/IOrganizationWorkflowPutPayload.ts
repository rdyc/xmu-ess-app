import { IBasePayload } from '@generic/interfaces';
import { IOrganizationWorkflowPutHierarchy } from './IOrganizationWorkflowPutHierarchy';

export interface IOrganizationWorkflowPutPayload extends IBasePayload {
  hierarchies: IOrganizationWorkflowPutHierarchy[];
}