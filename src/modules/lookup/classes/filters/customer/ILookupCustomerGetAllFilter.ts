import { IBasePagingFilter } from '@generic/interfaces';

export interface ILookupCustomerGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
}