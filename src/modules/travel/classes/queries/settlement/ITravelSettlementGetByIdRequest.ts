import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelSettlementGetByIdRequest extends ICompanyAccess {
  readonly travelSettlementUid: string | undefined;
}