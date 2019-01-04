import { IBasePagingFilter } from '@generic/interfaces';

export interface IEmployeeAllFilter extends IBasePagingFilter {
  readonly companyUids?: string[];
  readonly roleUids?: string[];
  readonly positionUids?: string[];
}