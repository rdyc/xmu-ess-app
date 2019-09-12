import { IKPIApprovalItemPostPayload } from '.';

export interface IKPIApprovalPostPayload {
  isApproved: boolean;
  isFinal: boolean;
  revision: string;
  items: IKPIApprovalItemPostPayload[];
}