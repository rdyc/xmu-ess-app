import { ILookupCurrencyListFilter } from '@lookup/classes/filters';

export interface ILookupCurrencyListRequest {
  readonly filter?: ILookupCurrencyListFilter | undefined;
}