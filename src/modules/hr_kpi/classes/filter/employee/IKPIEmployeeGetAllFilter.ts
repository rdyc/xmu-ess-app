import { IBasePagingFilter } from '@generic/interfaces';

export interface IKPIEmployeeGetAllFilter extends IBasePagingFilter {
  statusTypes?: string;
  status?: 'complete' | 'pending' | string;
}