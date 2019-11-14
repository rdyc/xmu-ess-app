import { IBasePayload } from '@generic/interfaces';

export interface INotifPeriodPostPayload extends IBasePayload {
  name: string;
  type: string;
  range: string;
  from: number;
  to: number;
}