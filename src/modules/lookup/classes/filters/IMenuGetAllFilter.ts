import { IBasePagingFilter } from '@generic/interfaces';

export interface IMenuGetAllFilter extends IBasePagingFilter {
  readonly menuUid: string | undefined;
}