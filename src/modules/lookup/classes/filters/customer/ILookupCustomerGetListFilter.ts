import { IBaseFilter } from '@generic/interfaces';

export interface ILookupCustomerGetListFilter extends IBaseFilter {
  companyUid?: string;
  size?: number;
}