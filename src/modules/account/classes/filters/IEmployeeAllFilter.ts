import { IBasePagingFilter } from '@generic/interfaces';

export interface IEmployeeAllFilter extends IBasePagingFilter {
  companyUids?: string;
  useAccess?: boolean | false;
  isActive?: boolean | true;
  roleUids?: string;
  positionUids?: string;
}