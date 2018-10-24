import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';

export interface ILookupCustomerGetListRequest {
  readonly filter: ILookupCustomerGetListFilter | undefined;
}