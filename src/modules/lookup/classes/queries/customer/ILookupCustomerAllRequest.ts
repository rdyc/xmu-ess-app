import { ILookupCustomerGetAllFilter } from '@lookup/classes/filters/customer';

export interface ILookupCustomerGetAllRequest {
  readonly filter: ILookupCustomerGetAllFilter | undefined;
}