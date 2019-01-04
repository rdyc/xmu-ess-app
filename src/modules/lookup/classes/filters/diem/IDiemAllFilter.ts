import { IBasePagingFilter } from '@generic/interfaces';

export interface IDiemAllFilter extends IBasePagingFilter {
  projectType?: string | null | undefined;
  destinationType?: string | null | undefined;
}