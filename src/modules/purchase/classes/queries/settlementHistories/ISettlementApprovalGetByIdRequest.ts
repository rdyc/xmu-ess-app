import { ICompanyAccess } from '@generic/interfaces';

export interface ISettlementApprovalGetByIdRequest extends ICompanyAccess {
  readonly purchaseUid: string | undefined;
}