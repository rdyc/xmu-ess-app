import {
  IExpenseApprovalGetAllRequest,
  IExpenseApprovalGetByIdRequest,
  IExpenseApprovalPostRequest,
  IExpenseGetAllRequest,
  IExpenseGetByIdRequest,
  IExpensePostRequest,
  IExpensePutRequest,
} from '@expense/classes/queries';
import { IExpense, IExpenseDetail } from '@expense/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';

export interface IExpenseState {
  expenseGetAll: IQueryCollectionState<IExpenseGetAllRequest, IExpense>;
  expenseGetById: IQuerySingleState<IExpenseGetByIdRequest, IExpenseDetail>;
  expensePost: IQuerySingleState<IExpensePostRequest, IExpense>;
  expensePut: IQuerySingleState<IExpensePutRequest, IExpense>;
  expenseApprovalGetAll: IQueryCollectionState<IExpenseApprovalGetAllRequest, IExpense>;
  expenseApprovalGetById: IQuerySingleState<IExpenseApprovalGetByIdRequest, IExpenseDetail>;
  expenseApprovalPost: IQuerySingleState<IExpenseApprovalPostRequest, IExpense>;
}