import { IBasePayload } from '@generic/interfaces';

export interface IKPIOpenPostPayload extends IBasePayload {
  year: number;
  period: number;
  date: string;
}