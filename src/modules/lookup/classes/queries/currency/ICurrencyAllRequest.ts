import { ICurrencyAllFilter } from '@lookup/classes/filters';

export interface ICurrencyAllRequest {
  readonly filter?: ICurrencyAllFilter | undefined;
}