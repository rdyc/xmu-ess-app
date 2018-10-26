import { IBasePagingFilter } from '@generic/interfaces';

export interface IDiemAllFilter extends IBasePagingFilter {
  projectType: string | undefined;
  destinationType: string | undefined;
}