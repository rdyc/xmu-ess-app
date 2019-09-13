import { IBasePagingFilter } from '@generic/interfaces';

export interface IKPIAssignGetAllFilter extends IBasePagingFilter {
  isFinal?: boolean;
}