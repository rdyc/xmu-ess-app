import { ICompanyAccess } from '@generic/interfaces';

export interface IPurchaseApprovalGetByIdRequest extends ICompanyAccess {
  readonly purchaseUid: string | undefined;
}