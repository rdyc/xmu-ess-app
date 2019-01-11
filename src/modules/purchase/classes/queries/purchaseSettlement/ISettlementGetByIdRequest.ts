import { ICompanyAccess } from '@generic/interfaces';

export interface ISettlementGetByIdRequest extends ICompanyAccess {
  purchaseUid?: string;
}