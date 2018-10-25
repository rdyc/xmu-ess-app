import { IBaseCommand, ICompanyAccess } from '@generic/interfaces';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';

export interface IProjectApprovalPostRequest extends ICompanyAccess, IBaseCommand<IWorkflowApprovalPayload> {
  projectUid: string;
}