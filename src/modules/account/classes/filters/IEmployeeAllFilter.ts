import { IBasePagingFilter } from '@generic/interfaces';

export interface IEmployeeAllFilter extends IBasePagingFilter {
  readonly companyUids: string[] | undefined;
  readonly roleUids: string[] | undefined;
  readonly positionUids: string[] | undefined;
}