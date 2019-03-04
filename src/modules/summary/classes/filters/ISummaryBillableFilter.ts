import { IBasePagingFilter } from '@generic/interfaces';

export interface ISummaryBillableFilter extends IBasePagingFilter {
  companyUid?: string;
  employeeUid?: string;
  start: string;
  end: string;
}