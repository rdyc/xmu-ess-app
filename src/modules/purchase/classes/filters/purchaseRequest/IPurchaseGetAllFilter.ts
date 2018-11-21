import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

export interface IPurchaseGetAllFilter extends IBaseFilter, IBasePagingFilter, ICompanyAccess  {
  readonly customerUid?: string | undefined;
  readonly isRejected?: boolean | undefined;
  readonly isSettlement?: boolean | undefined;
}