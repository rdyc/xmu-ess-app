import { IBaseFilter } from '@generic/interfaces';

export interface IEmployeeListFilter extends IBaseFilter {
  readonly companyUids?: string[];
  readonly roleUids?: string[];
  readonly positionUids?: string[];
  readonly size?: number;
}