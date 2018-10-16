import { ITravelApprovalgetAllFilter } from '../filters/ITravelApprovalGetAlFilter';

export interface ITravelApprovalGetAllRequest {
  readonly filter: ITravelApprovalgetAllFilter | undefined;
}