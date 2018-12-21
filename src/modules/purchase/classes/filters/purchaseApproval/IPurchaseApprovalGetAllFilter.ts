import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter { }

export interface IPurchaseApprovalGetAllFilter extends ICompanyAccess {
  isNotify?: boolean;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  customerUid?: string;
  query?: IExtendedQuery;
}