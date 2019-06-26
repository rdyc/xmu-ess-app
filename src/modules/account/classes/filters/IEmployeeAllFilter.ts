import { IBasePagingFilter } from '@generic/interfaces';

export interface IEmployeeAllFilter extends IBasePagingFilter {
  companyUids?: string;
  useAccess?: boolean | false;
  isActive?: boolean;
  roleUids?: string;
  positionUids?: string;
}