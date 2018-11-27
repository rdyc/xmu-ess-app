import { ILookupCurrencyAllFilter } from '@lookup/classes/filters';

export interface ILookupCurrencyAllRequest {
  readonly filter?: ILookupCurrencyAllFilter | undefined;
}