import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

// interface IExtendedQuery extends IBaseFilter, IBasePagingFilter { }

export interface IPurchaseApprovalGetAllFilter extends IBaseFilter, IBasePagingFilter, ICompanyAccess {
  isNotify?: boolean;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  customerUid?: string;
  projectUid?: string;
  // query?: IExtendedQuery;
}