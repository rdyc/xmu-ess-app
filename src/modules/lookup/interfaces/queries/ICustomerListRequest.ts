import { ICustomerListFilter } from '@lookup/interfaces/filters';

export interface ICustomerListRequest {
  readonly filter: ICustomerListFilter | undefined;
}