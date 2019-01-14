import { IQuerySingleState } from '@generic/interfaces';
import { ILandingPageGetAllRequest } from '@layout/classes/queries';
import { ILandingPage } from '@layout/classes/response';
import { Reducer } from 'redux';
import { LandingPageAction as Action } from '../actions/landingPageAction';

const initialState: IQuerySingleState<ILandingPageGetAllRequest, ILandingPage> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ILandingPageGetAllRequest, ILandingPage>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as landingPageGetAllReducer };
