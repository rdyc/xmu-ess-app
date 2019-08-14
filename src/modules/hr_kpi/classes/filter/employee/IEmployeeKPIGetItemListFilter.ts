import { IBasePagingFilter } from '@generic/interfaces';

export interface IEmployeeKPIGetItemListFilter extends IBasePagingFilter {
  categoryUid?: string;
  measurementUid?: string;
}