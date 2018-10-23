import { IBasePagingFilter } from '@generic/interfaces';

export interface ILeaveApprovalGetAllFilter extends IBasePagingFilter {
  status: 'pending' | 'complete' | undefined;
  isNotify: boolean | undefined;
}