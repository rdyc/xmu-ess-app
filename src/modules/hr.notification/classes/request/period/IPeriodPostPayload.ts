import { IBasePayload } from '@generic/interfaces';

export interface IPeriodPostPayload extends IBasePayload {
  name: string;
  type: string;
  from: number;
  to: number;
}