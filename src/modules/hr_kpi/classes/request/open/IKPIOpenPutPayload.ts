import { IBasePayload } from '@generic/interfaces';

export interface IKPIOpenPutPayload extends IBasePayload {
  year: number;
  period: number;
  date: string;
}