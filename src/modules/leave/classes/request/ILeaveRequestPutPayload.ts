import { IBasePayload } from '@generic/interfaces';

export interface ILeaveRequestPutPayload extends IBasePayload {
  leaveType: string;
  regularType?: string;
  start: string;
  end: string;
  address: string;
  contactNumber: string;
  reason: string;
}