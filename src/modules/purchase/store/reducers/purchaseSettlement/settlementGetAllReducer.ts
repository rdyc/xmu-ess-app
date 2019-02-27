import { IQueryCollectionState } from '@generic/interfaces';
import { ISettlementGetAllRequest } from '@purchase/classes/queries/purchaseSettlement';
import { ISettlement } from '@purchase/classes/response/purchaseSettlement';
import { SettlementAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISettlementGetAllRequest, ISettlement> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<ISettlementGetAllRequest, ISettlement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_SETTLEMENT_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SETTLEMENT_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_SETTLEMENT_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_SETTLEMENT_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as settlementGetAllReducer };