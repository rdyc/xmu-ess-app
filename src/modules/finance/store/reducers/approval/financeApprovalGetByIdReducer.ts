import { IFinanceApprovalGetByIdRequest } from '@finance/classes/queries/approval';
import { IFinanceDetail } from '@finance/classes/response';
import { FinanceApprovalAction as Action } from '@finance/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IFinanceApprovalGetByIdRequest, IFinanceDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IFinanceApprovalGetByIdRequest, IFinanceDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.APPROVAL_GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.APPROVAL_GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.APPROVAL_GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.APPROVAL_GET_BY_ID_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as financeApprovalGetByIdReducer };