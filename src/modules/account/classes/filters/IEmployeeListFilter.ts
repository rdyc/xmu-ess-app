import { IBaseFilter } from '@generic/interfaces';

export interface IEmployeeListFilter extends IBaseFilter {
  companyUids?: string;
  roleUids?: string;
  positionUids?: string;
  size?: number;
  useAccess?: boolean;
}