import { IExpenseGetAllFilter } from '@expense/classes/filters';

export interface IExpenseGetAllRequest {
  readonly filter: IExpenseGetAllFilter | undefined;
}