import { IQuerySingleState } from '@generic/interfaces';
import { ISettlementApprovalGetByIdRequest } from '@purchase/classes/queries/settlementHistories';
import { ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { SettlementApprovalAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISettlementApprovalGetByIdRequest, ISettlementDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ISettlementApprovalGetByIdRequest, ISettlementDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_S_APPROVAL_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_S_APPROVAL_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_S_APPROVAL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_S_APPROVAL_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as settlementApprovalGetByIdReducer };