import { IBasePagingFilter } from '@generic/interfaces';

export interface IEmployeeAllKPIFinalFilter extends IBasePagingFilter {
  companyUid?: string;
  isNotFinal?: boolean;
  year?: number;
  period?: number;
  isActive?: boolean;
}