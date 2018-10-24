import {
  IExpenseApprovalGetAllRequest,
  IExpenseApprovalGetByIdRequest,
  IExpenseApprovalPostRequest,
} from '@expense/classes/queries/approval';
import {
  IExpenseRequestGetAllRequest,
  IExpenseRequestGetByIdRequest,
  IExpenseRequestPostRequest,
  IExpenseRequestPutRequest,
} from '@expense/classes/queries/request';
import { IExpense, IExpenseDetail } from '@expense/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';

export interface IExpenseState {
  expenseRequestGetAll: IQueryCollectionState<IExpenseRequestGetAllRequest, IExpense>;
  expenseRequestGetById: IQuerySingleState<IExpenseRequestGetByIdRequest, IExpenseDetail>;
  expenseRequestPost: IQuerySingleState<IExpenseRequestPostRequest, IExpense>;
  expenseRequestPut: IQuerySingleState<IExpenseRequestPutRequest, IExpense>;
  expenseApprovalGetAll: IQueryCollectionState<IExpenseApprovalGetAllRequest, IExpense>;
  expenseApprovalGetById: IQuerySingleState<IExpenseApprovalGetByIdRequest, IExpenseDetail>;
  expenseApprovalPost: IQuerySingleState<IExpenseApprovalPostRequest, IExpense>;
}