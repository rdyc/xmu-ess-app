import { IBaseCommand, ICompanyAccess } from '@generic/interfaces';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';

export interface ILeaveApprovalPostRequest extends ICompanyAccess, IBaseCommand<IWorkflowApprovalPayload> {
  leaveUid: string;
}