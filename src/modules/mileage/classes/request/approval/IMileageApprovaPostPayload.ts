import { IMileagePostItem } from '@mileage/classes/request';

export interface IMileageApprovalPostPayload {
  items?: IMileagePostItem[] | null;
  isApproved: boolean;
  remark: string;
}
