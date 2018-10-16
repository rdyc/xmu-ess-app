import { ICustomerListFilter } from '@lookup/classes/filters';

export interface ICustomerListRequest {
  readonly filter: ICustomerListFilter | undefined;
}