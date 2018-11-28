import { IQueryCollectionState } from '@generic/interfaces';
import { ISettlementApprovalGetAllRequest } from '@purchase/classes/queries/settlementApproval';
import { ISettlement } from '@purchase/classes/response/purchaseSettlement';
import { SettlementApprovalAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISettlementApprovalGetAllRequest, ISettlement> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ISettlementApprovalGetAllRequest, ISettlement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_S_APPROVAL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_S_APPROVAL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_S_APPROVAL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_S_APPROVAL_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as settlementApprovalGetAllReducer };