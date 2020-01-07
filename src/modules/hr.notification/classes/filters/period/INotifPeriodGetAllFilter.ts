import { IBasePagingFilter } from '@generic/interfaces';

export interface INotifPeriodGetAllFilter extends IBasePagingFilter {
  type?: 'birthday' | 'contract' | string;
}