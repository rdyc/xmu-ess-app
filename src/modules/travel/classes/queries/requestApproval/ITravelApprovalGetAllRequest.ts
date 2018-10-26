import { ITravelApprovalgetAllFilter } from '@travel/classes/filters/ITravelApprovalGetAlFilter';

export interface ITravelApprovalGetAllRequest {
  readonly filter: ITravelApprovalgetAllFilter | undefined;
}