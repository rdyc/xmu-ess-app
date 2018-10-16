import { ICompanyAccess } from '@generic/interfaces';

export interface IFinanceGetByIdRequest extends ICompanyAccess {
  readonly financeUid: string | undefined;
}