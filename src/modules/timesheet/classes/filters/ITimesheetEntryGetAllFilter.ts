import { IBasePagingFilter } from '@generic/interfaces';

export interface ITimesheetEntryGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
  employeeUid?: string;
  activityType?: string;
  customerUid?: string;
  projectUid?: string;
  siteUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  start?: string;
  end?: string;
  isRejected?: boolean;
}