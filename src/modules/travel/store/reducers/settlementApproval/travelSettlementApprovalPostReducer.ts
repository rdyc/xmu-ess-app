import { IQuerySingleState } from '@generic/interfaces';
import { ITravelSettlementApprovalPostRequest } from '@travel/classes/queries/settlementApproval';
import { ITravelSettlement } from '@travel/classes/response';
import { TravelSettlementApprovalAction as Action } from '@travel/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITravelSettlementApprovalPostRequest, ITravelSettlement> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ITravelSettlementApprovalPostRequest, ITravelSettlement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as travelSettlementApprovalPostReducer };