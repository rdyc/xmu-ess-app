import { ICompanyAccess } from '@generic/interfaces';

export interface IPurchaseApprovalGetByIdRequest extends ICompanyAccess {
  purchaseUid?: string;
}