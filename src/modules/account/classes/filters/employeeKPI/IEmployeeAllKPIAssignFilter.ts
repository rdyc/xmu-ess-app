import { IBasePagingFilter } from '@generic/interfaces';

export interface IEmployeeAllKPIAssignFilter extends IBasePagingFilter {
  companyUid?: string;
  isNotAssigned?: boolean;
  isFinal?: boolean;
  year?: number;
  isActive?: boolean;
}