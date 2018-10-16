import { ICompanyAccess } from '@generic/interfaces';

export interface IPurchaseGetByIdRequest extends ICompanyAccess {
  readonly purchaseUid: string | undefined;
}