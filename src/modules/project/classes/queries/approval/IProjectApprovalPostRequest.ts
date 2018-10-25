import { IBaseCommand, ICompanyAccess } from '@generic/interfaces';
import { IOrganizationWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';

export interface IProjectApprovalPostRequest extends ICompanyAccess, IBaseCommand<IOrganizationWorkflowApprovalPayload> {
  projectUid: string;
}