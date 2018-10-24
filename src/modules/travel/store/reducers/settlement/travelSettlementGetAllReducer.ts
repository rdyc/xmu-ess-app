import { IQueryCollectionState } from '@generic/interfaces';
import { ITravelSettlementGetAllRequest } from '@travel/classes/queries/settlement';
import { ITravelSettlement } from '@travel/classes/response';
import { TravelSettlementAction as Action } from '@travel/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ITravelSettlementGetAllRequest, ITravelSettlement> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ITravelSettlementGetAllRequest, ITravelSettlement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as travelSettlementGetAllReducer };