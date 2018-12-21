import { IBasePagingFilter } from '@generic/interfaces';

export interface ILeaveRequestGetAllFilter extends IBasePagingFilter {
  leaveType?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isRejected?: boolean;
}