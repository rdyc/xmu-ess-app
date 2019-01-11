import { ICompanyAccess } from '@generic/interfaces';

export interface IPurchaseGetByIdRequest extends ICompanyAccess {
  purchaseUid?: string;
}