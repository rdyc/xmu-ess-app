import { IQuerySingleState } from '@generic/interfaces';
import { ITravelPutRequest } from '@travel/classes/queries';
import { ITravelRequest } from '@travel/classes/response';
import { TravelAction as Action } from '@travel/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITravelPutRequest, ITravelRequest> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ITravelPutRequest, ITravelRequest>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as travelPutReducer };