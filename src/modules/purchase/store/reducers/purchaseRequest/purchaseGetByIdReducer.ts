import { IQuerySingleState } from '@generic/interfaces';
import { IPurchaseGetByIdRequest } from '@purchase/classes/queries/purchaseRequest';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { PurchaseAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IPurchaseGetByIdRequest, IPurchaseDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IPurchaseGetByIdRequest, IPurchaseDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as purchaseGetByIdReducer };