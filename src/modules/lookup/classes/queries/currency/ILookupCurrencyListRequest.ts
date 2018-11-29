import { ICurrencyListFilter } from '@lookup/classes/filters';

export interface ICurrencyGetListRequest {
  readonly filter?: ICurrencyListFilter | undefined;
}