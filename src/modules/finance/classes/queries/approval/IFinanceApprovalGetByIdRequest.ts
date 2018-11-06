import { ICompanyAccess } from '@generic/interfaces';

export interface IFinanceApprovalGetByIdRequest extends ICompanyAccess {
  readonly financeUid: string | undefined;
}