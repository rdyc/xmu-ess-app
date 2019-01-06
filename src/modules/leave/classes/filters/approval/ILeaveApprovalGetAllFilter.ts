import { IBasePagingFilter } from '@generic/interfaces';

export interface ILeaveApprovalGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
  leaveType?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isNotify?: boolean;
}