import { IBasePayload } from '@generic/interfaces';

export interface ILookupCurrencyPostPayload extends IBasePayload {
  symbol: string;
  name: string;
  rate: number;
  isActive: boolean;
}