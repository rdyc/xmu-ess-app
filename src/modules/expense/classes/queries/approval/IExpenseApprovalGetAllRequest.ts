import { IExpenseApprovalGetAllFilter } from '@expense/classes/filters/approval';

export interface IExpenseApprovalGetAllRequest {
  readonly filter: IExpenseApprovalGetAllFilter | undefined;
}