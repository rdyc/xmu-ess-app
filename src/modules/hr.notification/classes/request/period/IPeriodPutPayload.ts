import { IBasePayload } from '@generic/interfaces';

export interface IPeriodPutPayload extends IBasePayload {
  name: string;
  type: string;
  from: number;
  to: number;
}