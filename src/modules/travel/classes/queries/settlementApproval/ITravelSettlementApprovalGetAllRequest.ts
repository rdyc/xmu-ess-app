import { ITravelApprovalgetAllFilter } from '@travel/classes/filters/ITravelApprovalGetAlFilter';

export interface ITravelSettlementApprovalGetAllRequest {
  readonly filter: ITravelApprovalgetAllFilter | undefined;
}