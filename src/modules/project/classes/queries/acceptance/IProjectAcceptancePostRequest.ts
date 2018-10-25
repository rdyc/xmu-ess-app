import { IBaseCommand } from '@generic/interfaces';
import { IOrganizationWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';

export interface IProjectAcceptancePostRequest extends IBaseCommand<IOrganizationWorkflowApprovalPayload> {
  assignmentUid: string;
  assignmentItemUid: string;
}