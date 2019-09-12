import { IBasePagingFilter } from '@generic/interfaces';

export interface IKPIApprovalGetAllFilter extends IBasePagingFilter {
  statusTypes?: string;
  status?: 'complete' | 'pending' | string;
}