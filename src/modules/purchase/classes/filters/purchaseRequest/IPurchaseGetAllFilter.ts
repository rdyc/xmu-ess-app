import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

export interface IPurchaseGetAllFilter extends IBaseFilter, IBasePagingFilter, ICompanyAccess {
  customerUid?: string;
  projectUid?: string;
  isRejected?: boolean;
  isSettlement?: boolean;
  statusType?: string;
}