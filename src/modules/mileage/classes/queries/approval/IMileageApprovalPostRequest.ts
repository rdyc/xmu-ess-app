import { IBaseCommand, ICompanyAccess } from '@generic/interfaces';
import { IWorkflowApprovalItemPayload } from '@organization/classes/request/workflow/approval';

export interface IMileageApprovalPostRequest extends ICompanyAccess, IBaseCommand<IWorkflowApprovalItemPayload> {
  mileageUid: string;
}
