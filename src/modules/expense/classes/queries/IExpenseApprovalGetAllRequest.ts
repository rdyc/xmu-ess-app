import { IExpenseApprovalGetAllFilter } from '@expense/classes/filters';

export interface IExpenseApprovalGetAllRequest {
  readonly filter: IExpenseApprovalGetAllFilter | undefined;
}