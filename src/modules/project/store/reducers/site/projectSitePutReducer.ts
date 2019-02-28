import { IQuerySingleState } from '@generic/interfaces';
import { IProjectSitePutRequest } from '@project/classes/queries/site';
import { ProjectSiteAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectSitePutRequest, boolean> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IProjectSitePutRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectSitePutReducer };