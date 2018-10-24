import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelSettlementApprovalGetByIdRequest extends ICompanyAccess {
  readonly travelUid: string | undefined;
}