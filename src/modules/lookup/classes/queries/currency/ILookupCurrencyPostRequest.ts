import { IBaseCommand } from '@generic/interfaces';
import { ILookupCurrencyPostPayload } from '@lookup/classes/request/currency';

export interface ICurrencyPostRequest extends IBaseCommand<ILookupCurrencyPostPayload> {
  symbol: string;
  name: string;
  rate: number;
  isActive: boolean;
}