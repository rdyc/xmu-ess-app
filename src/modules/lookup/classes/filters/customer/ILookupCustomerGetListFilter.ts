import { IBaseFilter } from '@generic/interfaces';

export interface ILookupCustomerGetListFilter extends IBaseFilter {
  readonly companyUid?: string | undefined;
  readonly size?: number | undefined;
}