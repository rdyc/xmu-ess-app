import { IBaseFilter, IBasePagingFilter, ICompanyAccess } from '@generic/interfaces';

export interface ISettlementGetAllFilter extends IBaseFilter, IBasePagingFilter, ICompanyAccess {
  readonly customerUid?: string | undefined;
  readonly isRejected?: boolean | undefined;
}