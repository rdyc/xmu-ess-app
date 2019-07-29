import { IBasePagingFilter } from '@generic/interfaces';

export interface ISummaryMappingFilter extends IBasePagingFilter {
  companyUid: string;
  year?: number;
  summary?: boolean;
  professionTypes?: string;
  competencyTypes?: string;
  employeeUids?: string;
}