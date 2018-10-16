import { IBasePayload } from '@generic/interfaces';

export interface IFinancePostPayload extends IBasePayload {
  statusType: string;
  notes: string;
}