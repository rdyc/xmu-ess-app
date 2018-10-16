import { IBasePagingFilter } from '@generic/interfaces';

export interface ILeaveRequestGetAllFilter extends IBasePagingFilter {
  readonly customerUids: string[] | undefined;
  readonly leaveRequestTypes: string[] | undefined;
  readonly statusTypes: string[] | undefined;
}