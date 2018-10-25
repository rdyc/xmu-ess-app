import { ICompanyAccess } from '@generic/interfaces';

export interface ITravelSettlementGetByIdRequest extends ICompanyAccess {
  readonly traveSettlementlUid: string | undefined;
}