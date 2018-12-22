import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter { }

export interface IPurchaseGetAllFilter extends ICompanyAccess  {
  customerUid?: string;
  isRejected?: boolean;
  isSettlement?: boolean;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  query?: IExtendedQuery;
}