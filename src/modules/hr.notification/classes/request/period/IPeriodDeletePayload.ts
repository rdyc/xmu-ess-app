import { IBasePayload } from '@generic/interfaces';

export interface IPeriodDeletePayload extends IBasePayload {
  periodUid: string;
}