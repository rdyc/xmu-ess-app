import { IBasePagingFilter } from '@generic/interfaces';

export interface IKPIApprovalGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
  statusTypes?: string;
  status?: 'complete' | 'pending' | string;
  isFinal?: boolean;
}