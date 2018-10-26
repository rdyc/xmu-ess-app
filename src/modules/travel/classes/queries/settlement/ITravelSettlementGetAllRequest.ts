import { ITravelSettlementGetAllFilter } from '@travel/classes/filters';

export interface ITravelSettlementGetAllRequest {
  readonly filter: ITravelSettlementGetAllFilter | undefined;
}