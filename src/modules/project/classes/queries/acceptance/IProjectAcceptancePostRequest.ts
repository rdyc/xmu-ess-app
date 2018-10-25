import { IBaseCommand } from '@generic/interfaces';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';

export interface IProjectAcceptancePostRequest extends IBaseCommand<IWorkflowApprovalPayload> {
  assignmentUid: string;
  assignmentItemUid: string;
}