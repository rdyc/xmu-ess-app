import { IBasePagingFilter } from '@generic/interfaces';

export interface ISummaryBillableFilter extends IBasePagingFilter {
  start?: Date;
  end?: Date;
}