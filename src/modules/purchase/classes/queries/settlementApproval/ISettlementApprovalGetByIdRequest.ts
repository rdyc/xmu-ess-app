import { ICompanyAccess } from '@generic/interfaces';

export interface ISettlementApprovalGetByIdRequest extends ICompanyAccess {
  purchaseUid?: string;
}