import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

export interface IProjectApprovalGetAllFilter extends IBaseFilter, IBasePagingFilter {
  companyUid?: string;
  positionUid?: string;
  customerUid?: string;
  projectType?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isNotify?: boolean;
}