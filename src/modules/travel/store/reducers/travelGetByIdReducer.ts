import { IQuerySingleState } from '@generic/interfaces';
import { ITravelGetByIdRequest } from '@travel/classes/queries';
import { ITravelRequestDetail } from '@travel/classes/response';
import { TravelAction as Action } from '@travel/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITravelGetByIdRequest, ITravelRequestDetail> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ITravelGetByIdRequest, ITravelRequestDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as travelGetByIdReducer };