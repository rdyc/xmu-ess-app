import { IQuerySingleState } from '@generic/interfaces';
import { ISettlementPostRequest } from '@purchase/classes/queries/purchaseSettlement';
import { ISettlement } from '@purchase/classes/response/purchaseSettlement';
import { SettlementAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISettlementPostRequest, ISettlement> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ISettlementPostRequest, ISettlement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_SETTLEMENT_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SETTLEMENT_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_SETTLEMENT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_SETTLEMENT_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as settlementPostReducer };