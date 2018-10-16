import { IBasePayload } from '@generic/interfaces';

export interface ILeaveRequestPostPayload extends IBasePayload {
  leaveType: string;
  regularType: string | null;
  start: string;
  end: string;
  address: string;
  contactNumber: string;
  reason: string;
}
