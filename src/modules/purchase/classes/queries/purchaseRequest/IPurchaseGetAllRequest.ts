import { ICompanyAccess } from '@generic/interfaces';
import { IPurchaseGetAllFilter } from '@purchase/classes/filters/purchaseRequest';

export interface IPurchaseGetAllRequest extends ICompanyAccess {
  readonly filter: IPurchaseGetAllFilter | undefined;
}