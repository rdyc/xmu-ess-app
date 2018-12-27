import { IBasePagingFilter } from '@generic/interfaces';

export interface ITimesheetEntryGetAllFilter extends IBasePagingFilter {

  companyUid?: string;
  employeeUid?: string;
  activityType?: string;
  customerUid?: string;
  projectUid?: string;
  siteUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isRejected?: boolean;
}