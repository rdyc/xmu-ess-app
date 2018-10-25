import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

export interface IPurchaseGetAllFilter extends IBaseFilter, IBasePagingFilter, ICompanyAccess  {
  readonly customerUid: string | undefined;
  isRejected: boolean | undefined;
  isSettlement: boolean | undefined;
}