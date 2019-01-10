import { IBasePagingFilter } from '@generic/interfaces';

export interface ISummaryWinningFilter extends IBasePagingFilter {
  companyUid?: string;
  employeeUid?: string;
  start?: string;
  end?: string;
}