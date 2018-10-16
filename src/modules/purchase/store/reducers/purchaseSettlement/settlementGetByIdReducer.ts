import { IQuerySingleState } from '@generic/interfaces';
import { ISettlementGetByIdRequest } from '@purchase/classes/queries/purchaseSettlement';
import { ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { SettlementAction as Action } from '@purchase/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISettlementGetByIdRequest, ISettlementDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ISettlementGetByIdRequest, ISettlementDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as settlementGetByIdReducer };