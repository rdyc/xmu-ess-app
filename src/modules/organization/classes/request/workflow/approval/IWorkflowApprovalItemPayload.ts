import { IBasePayload } from '@generic/interfaces';
import { IMileageApprovalPostItem } from '@mileage/classes/request';

export interface IWorkflowApprovalItemPayload extends IBasePayload {
  items: IMileageApprovalPostItem[];
  isApproved: boolean;
  remark?: string;
}