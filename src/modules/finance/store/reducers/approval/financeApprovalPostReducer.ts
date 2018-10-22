import { IFinanceApprovalPostRequest } from '@finance/classes/queries/approval';
import { IFinance } from '@finance/classes/response';
import { FinanceApprovalAction as Action } from '@finance/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IFinanceApprovalPostRequest, IFinance> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IFinanceApprovalPostRequest, IFinance>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.APPROVAL_POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.APPROVAL_POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.APPROVAL_POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.APPROVAL_POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as financeApprovalPostReducer };