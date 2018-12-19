import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface IProjectApprovalGetAllFilter {
  companyUid?: string;
  positionUid?: string;
  customerUid?: string;
  projectType?: string;
  statusType?: 'pending' | 'complete' | string;
  status?: string;
  isNotify?: boolean;
  query?: IExtendedQuery;
}