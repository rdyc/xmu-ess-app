import { ICompanyAccess } from '@generic/interfaces';

export interface ISettlementGetByIdRequest extends ICompanyAccess {
  readonly purchaseUid: string | undefined;
}