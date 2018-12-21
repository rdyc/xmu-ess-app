import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface ITimesheetApprovalGetAllFilter {
  // companyUid?: string | undefined;
  // status?: 'pending' | 'complete' | undefined;
  // query?: IExtendedQuery | undefined;

  customerUid?: string;
  activityType?: string;
  companyUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  query?: IExtendedQuery;
}