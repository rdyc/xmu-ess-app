import { IMileageApprovalPostItem } from '@mileage/classes/request';

export interface IMileageApprovalPostPayload {
  items?: IMileageApprovalPostItem[] | null;
  isApproved: boolean;
  remark: string;
}
