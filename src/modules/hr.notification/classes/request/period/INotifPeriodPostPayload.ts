import { IBasePayload } from '@generic/interfaces';

export interface INotifPeriodPostPayload extends IBasePayload {
  name: string;
  type: string;
  from: number;
  to: number;
}