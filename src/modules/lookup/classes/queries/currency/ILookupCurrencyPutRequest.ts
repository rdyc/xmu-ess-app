import { IBaseCommand } from '@generic/interfaces';
import { ILookupCurrencyPutPayload } from '@lookup/classes/request/currency';

export interface ICurrencyPutRequest extends IBaseCommand<ILookupCurrencyPutPayload> {
  currencyUid: string;
}