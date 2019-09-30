import { IBasePagingFilter } from '@generic/interfaces';

export interface IHrCornerPageGetAllFilter extends IBasePagingFilter {
  categoryUids?: string;
}