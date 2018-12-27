import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter { }

export interface IPurchaseGetAllFilter extends ICompanyAccess  {
  customerUid?: string;
  projectUid?: string;
  isRejected?: boolean;
  isSettlement?: boolean;
  statusType?: string;
  query?: IExtendedQuery;
}