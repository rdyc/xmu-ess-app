import { IBasePagingFilter } from '@generic/interfaces';

export interface ISystemAllFilter extends IBasePagingFilter {
  companyUid?: string | undefined; 
}