import { IBaseQueryPagingFilter } from '@generic/interfaces';

export interface ITimesheetApprovalGetAllFilter extends IBaseQueryPagingFilter {
  readonly companyUid?: string | null;
  readonly status?: 'pending' | 'complete' | null;
}