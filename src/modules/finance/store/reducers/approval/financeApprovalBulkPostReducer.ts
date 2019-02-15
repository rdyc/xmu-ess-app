import { IFinanceApprovalBulkPostRequest } from '@finance/classes/queries/approval';
import { IFinance } from '@finance/classes/response';
import { FinanceApprovalAction as Action } from '@finance/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IFinanceApprovalBulkPostRequest, IFinance> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IFinanceApprovalBulkPostRequest, IFinance>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.APPROVAL_BULK_POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.APPROVAL_BULK_POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.APPROVAL_BULK_POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.APPROVAL_BULK_POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as financeApprovalBulkPostReducer };