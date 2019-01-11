import { IBasePagingFilter } from '@generic/interfaces';

export interface IDiemAllFilter extends IBasePagingFilter {
  projectType?: string;
  destinationType?: string;
}