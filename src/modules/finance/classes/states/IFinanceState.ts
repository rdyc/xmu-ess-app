import {
  IFinanceApprovalBulkPostRequest,
  IFinanceApprovalGetAllRequest,
  IFinanceApprovalGetByIdRequest,
  IFinanceApprovalPostRequest,
} from '@finance/classes/queries/approval';
import { IFinance, IFinanceDetail } from '@finance/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';

export interface IFinanceState {
  financeApprovalGetAll: IQueryCollectionState<IFinanceApprovalGetAllRequest, IFinance>;
  financeApprovalGetById: IQuerySingleState<IFinanceApprovalGetByIdRequest, IFinanceDetail>;
  financeApprovalPost: IQuerySingleState<IFinanceApprovalPostRequest, IFinance>;
  financeApprovalBulkPost: IQuerySingleState<IFinanceApprovalBulkPostRequest, IFinance>;
}