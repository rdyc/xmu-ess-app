import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

// interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface ISettlementApprovalGetAllFilter extends 
IBaseFilter, IBasePagingFilter,
ICompanyAccess {
  isNotify?: boolean;
  statusType?: string;
  projectUid?: string;
  status?: 'pending' | 'complete' | string;
  customerUid?: string;
  // query?: IExtendedQuery;
}