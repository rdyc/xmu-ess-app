import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface IProjectApprovalGetAllFilter {
  companyUid?: string;
  positionUid?: string;
  customerUid?: string;
  projectType?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isNotify?: boolean;
  query?: IExtendedQuery;
}