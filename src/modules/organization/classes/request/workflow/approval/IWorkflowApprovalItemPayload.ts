import { IBasePayload } from '@generic/interfaces';
import { IMileageApprovalPostItem } from '@mileage/classes/request';
// import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';

export interface IWorkflowApprovalItemPayload extends IBasePayload {
  items: IMileageApprovalPostItem[] | null;
  isApproved: boolean;
  remark: string | null;
}