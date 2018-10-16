import { IBasePagingFilter } from '@generic/interfaces';

export interface ILeaveRequestGetAllFilter extends IBasePagingFilter {
  readonly isRejected: boolean[] | undefined;
}