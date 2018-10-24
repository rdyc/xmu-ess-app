import { IExpenseRequestGetAllFilter } from '@expense/classes/filters/request';

export interface IExpenseRequestGetAllRequest {
  readonly filter: IExpenseRequestGetAllFilter | undefined;
}