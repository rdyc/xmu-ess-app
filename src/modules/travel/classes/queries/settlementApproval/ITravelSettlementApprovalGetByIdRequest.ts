import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelSettlementApprovalGetByIdRequest extends ICompanyAccess {
  travelSettlementUid?: string;
}