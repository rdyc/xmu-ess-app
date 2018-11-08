import { IBasePagingFilter } from '@generic/interfaces';

export interface ISummaryBillableFilter extends IBasePagingFilter {
  start?: string;
  end?: string;
}