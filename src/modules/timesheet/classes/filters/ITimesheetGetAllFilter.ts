import { IBasePagingFilter } from '@generic/interfaces';

export interface ITimesheetGetAllFilter extends IBasePagingFilter {
  readonly isRejected: boolean | undefined;
  readonly companyUid: string | undefined;
}