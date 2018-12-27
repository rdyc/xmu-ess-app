import { IBasePagingFilter } from '@generic/interfaces';

export interface ITimesheetEntryGetAllFilter extends IBasePagingFilter {

  customerUid?: string;
  activityType?: string;
  companyUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isRejected?: boolean;
}