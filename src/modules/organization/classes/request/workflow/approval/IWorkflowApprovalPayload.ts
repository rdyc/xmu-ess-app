import { IBasePayload } from '@generic/interfaces';

export interface IWorkflowApprovalPayload extends IBasePayload {
  isApproved: boolean;
  remark?: string;
}