import { IQuerySingleState } from '@generic/interfaces';
import { ITravelGetAllowedRequest } from '@travel/classes/queries';
import { ITravelAllowedCreate } from '@travel/classes/response';
import { TravelAction as Action } from '@travel/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITravelGetAllowedRequest, ITravelAllowedCreate> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ITravelGetAllowedRequest, ITravelAllowedCreate>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALLOWED_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALLOWED_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALLOWED_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALLOWED_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as travelGetAllowedReducer };