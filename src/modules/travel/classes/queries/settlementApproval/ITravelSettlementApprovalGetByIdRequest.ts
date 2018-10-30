import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelSettlementApprovalGetByIdRequest extends ICompanyAccess {
  readonly travelSettlementUid: string | undefined;
}