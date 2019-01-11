import { IBasePagingFilter } from '@generic/interfaces';

export interface ISystemLimitAllFilter extends IBasePagingFilter {
  companyUid?: string;
  categoryType?: string;
}