import { IBasePagingFilter } from '@generic/interfaces';

export interface ITimesheetApprovalGetAllFilter extends IBasePagingFilter {
  customerUid?: string;
  activityType?: string;
  companyUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isNotify?: boolean;
}