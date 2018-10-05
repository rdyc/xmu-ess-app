import { ICurrencyListFilter } from '@lookup/classes/filters';

export interface ICurrencyListRequest {
  readonly filter: ICurrencyListFilter | undefined;
}