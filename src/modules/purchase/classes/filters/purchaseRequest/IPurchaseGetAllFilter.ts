import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

export interface IPurchaseGetAllFilter extends IBaseFilter, IBasePagingFilter, ICompanyAccess  {
  customerUid?: string;
  isRejected?: boolean;
  isSettlement?: boolean;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
}