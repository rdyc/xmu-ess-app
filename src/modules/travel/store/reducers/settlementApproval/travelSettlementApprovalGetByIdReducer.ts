import { IQuerySingleState } from '@generic/interfaces';
import { ITravelSettlementApprovalGetByIdRequest } from '@travel/classes/queries/settlementApproval';
import { ITravelSettlementDetail } from '@travel/classes/response';
import { TravelSettlementAction as Action } from '@travel/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITravelSettlementApprovalGetByIdRequest, ITravelSettlementDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ITravelSettlementApprovalGetByIdRequest, ITravelSettlementDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as travelSettlementApprovalGetByIdReducer };