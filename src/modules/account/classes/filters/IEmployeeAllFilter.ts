import { IBasePagingFilter } from '@generic/interfaces';

export interface IEmployeeAllFilter extends IBasePagingFilter {
  companyUids?: string;
  roleUids?: string;
  positionUids?: string;
}