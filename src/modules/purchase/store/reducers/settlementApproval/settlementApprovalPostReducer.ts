import { IQuerySingleState } from '@generic/interfaces';
import { ISettlementApprovalPostRequest } from '@purchase/classes/queries/settlementApproval';
import { SettlementApprovalAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISettlementApprovalPostRequest, boolean> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ISettlementApprovalPostRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_S_APPROVAL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_S_APPROVAL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_S_APPROVAL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_S_APPROVAL_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as settlementApprovalPostReducer };