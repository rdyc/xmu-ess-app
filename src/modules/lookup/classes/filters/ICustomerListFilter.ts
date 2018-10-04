import { IBaseFilter } from '@generic/interfaces';

export interface ICustomerListFilter extends IBaseFilter {
  readonly companyUid: string | undefined;
  readonly size: number | undefined;
}