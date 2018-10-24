import { IQuerySingleState } from '@generic/interfaces';
import { IPurchasePutRequest } from '@purchase/classes/queries/purchaseRequest';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IPurchasePutRequest, IPurchase> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IPurchasePutRequest, IPurchase>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as purchasePutReducer };