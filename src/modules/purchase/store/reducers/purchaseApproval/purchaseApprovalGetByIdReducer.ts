import { IQuerySingleState } from '@generic/interfaces';
import { IPurchaseApprovalGetByIdRequest } from '@purchase/classes/queries/purchaseApproval';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { PurchaseApprovalAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IPurchaseApprovalGetByIdRequest, IPurchaseDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IPurchaseApprovalGetByIdRequest, IPurchaseDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_APPROVAL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_APPROVAL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_APPROVAL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_APPROVAL_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as purchaseApprovalGetByIdReducer };