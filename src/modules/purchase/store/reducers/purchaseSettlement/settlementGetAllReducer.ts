import { IQueryCollectionState } from '@generic/interfaces';
import { ISettlementGetAllRequest } from '@purchase/classes/queries/purchaseSettlement';
import { ISettlement } from '@purchase/classes/response/purchaseSettlement';
import { PurchaseAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISettlementGetAllRequest, ISettlement> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ISettlementGetAllRequest, ISettlement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as settlementGetAllReducer };