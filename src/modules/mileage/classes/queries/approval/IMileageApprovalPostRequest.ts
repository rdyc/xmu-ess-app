import { IBaseCommand, ICompanyAccess } from '@generic/interfaces';
import { IMileageApprovalPostPayload } from '@mileage/classes/request';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';

type command = IWorkflowApprovalPayload & IMileageApprovalPostPayload;

export interface IMileageApprovalPostRequest extends ICompanyAccess, IBaseCommand<command> {
  mileageUid: string;
}