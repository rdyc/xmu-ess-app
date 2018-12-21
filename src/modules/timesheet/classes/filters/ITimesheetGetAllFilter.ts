import { IBasePagingFilter } from '@generic/interfaces';

export interface ITimesheetGetAllFilter extends IBasePagingFilter {
  // readonly isRejected: boolean | undefined;
  // readonly companyUid: string | undefined;

  customerUid?: string;
  activityType?: string;
  companyUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isRejected?: boolean;
}