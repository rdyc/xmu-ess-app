import { IBasePagingFilter } from '@generic/interfaces';

export interface IMenuGetAllFilter extends IBasePagingFilter {
  menuUid?: string;
}