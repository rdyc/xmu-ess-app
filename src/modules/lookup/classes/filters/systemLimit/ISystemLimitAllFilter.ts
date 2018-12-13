import { IBasePagingFilter } from '@generic/interfaces';

export interface ISystemLimitAllFilter extends IBasePagingFilter {
  companyUid?: string | null;
}