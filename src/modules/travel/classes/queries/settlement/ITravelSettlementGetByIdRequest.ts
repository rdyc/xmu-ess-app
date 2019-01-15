import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelSettlementGetByIdRequest extends ICompanyAccess {
  travelSettlementUid?: string;
}