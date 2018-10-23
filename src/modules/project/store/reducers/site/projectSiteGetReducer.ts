import { IQueryCollectionState } from '@generic/interfaces';
import { IProjectSiteGetRequest } from '@project/classes/queries/site';
import { IProjectSite } from '@project/classes/response';
import { ProjectSiteAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IProjectSiteGetRequest, IProjectSite> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IProjectSiteGetRequest, IProjectSite>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as projectSiteGetReducer };