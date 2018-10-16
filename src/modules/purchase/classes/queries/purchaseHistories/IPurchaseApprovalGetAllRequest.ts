import { ICompanyAccess } from '@generic/interfaces';
import { IPurchaseApprovalGetAllFilter } from '@purchase/classes/filters/purchaseHistories';

export interface IPurchaseApprovalGetAllRequest extends ICompanyAccess {
  readonly filter: IPurchaseApprovalGetAllFilter | undefined;
  isNotify: boolean | undefined;
  status: 'pending' | 'complete' | undefined;
}