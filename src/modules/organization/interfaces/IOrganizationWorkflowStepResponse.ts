import { ICommonSystem } from '@common/interfaces';
import { IBaseChanges } from '@generic/interfaces';

export interface IOrganizationWorkflowStepResponse {
  statusType: string;
  status:     ICommonSystem;
  changes:    IBaseChanges | null;
}