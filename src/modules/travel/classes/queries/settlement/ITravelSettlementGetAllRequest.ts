import { ICompanyAccess } from '@generic/interfaces';
import { ITravelSettlementGetAllFilter } from '@travel/classes/filters';

export interface ITravelSettlementGetAllRequest extends ICompanyAccess {
  readonly filter: ITravelSettlementGetAllFilter | undefined;
}