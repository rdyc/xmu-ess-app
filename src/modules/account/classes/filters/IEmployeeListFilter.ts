import { IBaseFilter } from '@generic/interfaces';

export interface IEmployeeListFilter extends IBaseFilter {
  readonly companyUids?: string[] | undefined;
  readonly roleUids?: string[] | undefined;
  readonly positionUids?: string[] | undefined;
  readonly size?: number | undefined;
}