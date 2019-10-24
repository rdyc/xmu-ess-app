import { IBasePayload } from '@generic/interfaces';

export interface INotifPeriodPutPayload extends IBasePayload {
  name: string;
  type: string;
  from: number;
  to: number;
}