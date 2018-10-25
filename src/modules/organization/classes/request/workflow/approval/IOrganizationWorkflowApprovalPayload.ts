import { IBasePayload } from '@generic/interfaces';

export interface IOrganizationWorkflowApprovalPayload extends IBasePayload {
  isApproved: boolean;
  remark: string | null;
}