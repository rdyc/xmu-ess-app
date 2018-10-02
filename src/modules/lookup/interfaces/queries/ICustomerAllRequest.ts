import { ICustomerAllFilter } from '@lookup/interfaces/filters';

export interface ICustomerAllRequest {
  readonly filter: ICustomerAllFilter | undefined;
}