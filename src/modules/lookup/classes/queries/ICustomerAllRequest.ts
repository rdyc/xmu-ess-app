import { ICustomerAllFilter } from '@lookup/classes/filters';

export interface ICustomerAllRequest {
  readonly filter: ICustomerAllFilter | undefined;
}