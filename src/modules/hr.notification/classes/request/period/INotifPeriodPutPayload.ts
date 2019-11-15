import { IBasePayload } from '@generic/interfaces';

export interface INotifPeriodPutPayload extends IBasePayload {
  name: string;
  type: string;
  range: string;
  from: number;
  to: number;
}