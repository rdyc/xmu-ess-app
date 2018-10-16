import { IQuerySingleState } from '@generic/interfaces';
import { ISettlementPostRequest } from '@purchase/classes/queries/purchaseSettlement';
import { ISettlement } from '@purchase/classes/response/purchaseSettlement';
import { SettlementAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISettlementPostRequest, ISettlement> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ISettlementPostRequest, ISettlement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as settlementPostReducer };