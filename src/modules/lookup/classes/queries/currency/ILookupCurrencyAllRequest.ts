import { ICurrencyAllFilter } from '@lookup/classes/filters';

export interface ICurrencyGetAllRequest {
  readonly filter?: ICurrencyAllFilter | undefined;
}