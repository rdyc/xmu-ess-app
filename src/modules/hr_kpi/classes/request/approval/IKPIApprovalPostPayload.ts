import { IKPIApprovalItemPostPayload } from '.';

export interface IKPIApprovalPostPayload {
  // isApproved: boolean;
  isFinal: boolean;
  notes?: string;
  // revision: string;
  items: IKPIApprovalItemPostPayload[];
}