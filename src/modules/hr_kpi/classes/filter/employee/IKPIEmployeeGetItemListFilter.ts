import { IBasePagingFilter } from '@generic/interfaces';

export interface IKPIEmployeeGetItemListFilter extends IBasePagingFilter {
  categoryUid?: string;
  measurementUid?: string;
}