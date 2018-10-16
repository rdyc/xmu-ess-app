import { IBasePagingFilter } from '@generic/interfaces';

export interface ITimesheetApprovalGetAllFilter extends IBasePagingFilter {
  readonly companyUid: string | null;
  readonly status: 'pending' | 'complete' | null;
}