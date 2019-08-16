import { IBasePagingFilter } from '@generic/interfaces';

export interface IPeriodGetAllFilter extends IBasePagingFilter {
  type?: 'birthday' | 'contract' | string;
}