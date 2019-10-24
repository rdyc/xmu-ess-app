import { IBasePayload } from '@generic/interfaces';

export interface INotifPeriodDeletePayload extends IBasePayload {
  periodUid: string;
}