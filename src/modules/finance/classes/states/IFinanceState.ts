import {
  IFinanceBulkPostRequest,
  IFinanceGetAllRequest,
  IFinanceGetByIdRequest,
  IFinancePostRequest,
} from '@finance/classes/queries/approval';
import { IFinance, IFinanceDetail } from '@finance/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';

export interface IFinanceState {
  financeGetAll: IQueryCollectionState<IFinanceGetAllRequest, IFinance>;
  financeGetById: IQuerySingleState<IFinanceGetByIdRequest, IFinanceDetail>;
  financePost: IQuerySingleState<IFinancePostRequest, IFinance>;
  financeBulkPost: IQuerySingleState<IFinanceBulkPostRequest, IFinance>;
}