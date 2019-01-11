import { ICompanyAccess } from '@generic/interfaces';

export interface IFinanceApprovalGetByIdRequest extends ICompanyAccess {
  financeUid?: string;
}