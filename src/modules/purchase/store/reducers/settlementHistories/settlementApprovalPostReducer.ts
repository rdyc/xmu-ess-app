import { IQuerySingleState } from '@generic/interfaces';
import { ISettlementApprovalPostRequest } from '@purchase/classes/queries/settlementHistories';
import { SettlementApprovalAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISettlementApprovalPostRequest, boolean> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ISettlementApprovalPostRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_S_APPROVAL_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_S_APPROVAL_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_S_APPROVAL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_S_APPROVAL_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as settlementApprovalPostReducer };