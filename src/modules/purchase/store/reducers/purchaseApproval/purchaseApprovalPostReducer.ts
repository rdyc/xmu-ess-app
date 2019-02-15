import { IQuerySingleState } from '@generic/interfaces';
import { IPurchaseApprovalPostRequest } from '@purchase/classes/queries/purchaseApproval';
import { PurchaseApprovalAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IPurchaseApprovalPostRequest, boolean> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IPurchaseApprovalPostRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_APPROVAL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_APPROVAL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_APPROVAL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_APPROVAL_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as purchaseApprovalPostReducer };