import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface ILeaveApprovalGetAllFilter {
  companyUid?: string;
  positionUid?: string;
  leaveType?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isNotify?: boolean;
  query?: IExtendedQuery;
}